"use client";

import { useState, useRef, useEffect } from "react";
import { generateModel, Model } from "@/services/model-generation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, Download, Loader2, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Home() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [model, setModel] = useState<Model | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const modelContainerRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files).slice(0, 3); // Limit to 3 files
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setImageUrls(newImageUrls);
  };

  const handleGenerateModel = async () => {
    setIsLoading(true);
    try {
      const generatedModel = await generateModel(imageUrls);
      setModel(generatedModel);
    } catch (error) {
      console.error("Error generating model:", error);
      // Handle error appropriately (e.g., display an error message)
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadModel = () => {
    if (model?.modelUrl) {
      const link = document.createElement("a");
      link.href = model.modelUrl;
      link.download = "model.glb"; // Set the desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const openImageDialog = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const removeImage = (indexToRemove: number) => {
    setImageUrls((prevImageUrls) =>
      prevImageUrls.filter((_, index) => index !== indexToRemove)
    );
  };

  useEffect(() => {
    if (model && modelContainerRef.current) {
      const container = modelContainerRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      container.innerHTML = ''; // Clear existing content
      container.appendChild(renderer.domElement);

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(0, 1, 1);
      scene.add(directionalLight);

      const loader = new GLTFLoader();
      loader.load(model.modelUrl, (gltf) => {
        scene.add(gltf.scene);

        // Calculate bounding box of the model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());

        // Reposition the model to the center
        gltf.scene.position.x += (gltf.scene.position.x - center.x);
        gltf.scene.position.y += (gltf.scene.position.y - center.y);
        gltf.scene.position.z += (gltf.scene.position.z - center.z);

        // Set the camera position based on the model size
        camera.position.set(0, size / 2, size);

        // Add OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, size / 2, 0);
        controls.update();

        const animate = () => {
          requestAnimationFrame(animate);
          controls.update(); // Update the controls in the animation loop
          renderer.render(scene, camera);
        };

        animate();
      }, undefined, (error) => {
        console.error('An error happened while loading the model', error);
      });

      const handleResize = () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.render(scene, camera);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        // Clean up resources when the component unmounts
        renderer.dispose();
      };
    }
  }, [model]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">AR Crafter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image Upload Form */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isLoading}
                id="imageUpload"
                className="hidden"
              />
              <label
                htmlFor="imageUpload"
                className="flex items-center justify-center w-full h-12 bg-secondary text-secondary-foreground rounded-md cursor-pointer hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                <span>
                  {imageUrls.length > 0
                    ? `Uploaded ${imageUrls.length} images`
                    : "Upload 2-3 Images"}
                </span>
              </label>
              <div className="flex mt-2 space-x-2">
                {imageUrls.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 rounded-md overflow-hidden cursor-pointer"
                  >
                    <img
                      src={imageUrl}
                      alt={`Uploaded Image ${index + 1}`}
                      className="absolute inset-0 object-cover w-full h-full"
                      onClick={() => openImageDialog(imageUrl)}
                    />
                    <Button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 hover:bg-destructive/20 rounded-sm text-destructive hover:text-destructive-foreground/90"
                      size="icon"
                      variant="ghost"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleGenerateModel}
                disabled={imageUrls.length < 2 || isLoading}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Model Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Model Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={modelContainerRef} style={{ width: '100%', height: '300px' }} />
            {model ? (
              <div className="relative">
                <Button
                  onClick={handleDownloadModel}
                  className="absolute bottom-2 right-2 bg-success text-success-foreground hover:bg-success/90"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            ) : (
              <p>No model generated yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Image Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
            <DialogDescription>Full size preview of uploaded image.</DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full Size Preview"
              className="w-full rounded-md"
            />
          )}
          <DialogFooter>
            <Button type="button" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Copyright Text */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        © {new Date().getFullYear()} AR Crafter. All rights reserved.
      </p>
    </div>
  );
}

