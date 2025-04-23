"use client";

import { useState } from "react";
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
} from "@/components/ui/dialog";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function ModelViewer({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 1]} intensity={0.5} />
      <primitive object={scene} />
      <OrbitControls />
    </>
  );
}

export default function Home() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [model, setModel] = useState<Model | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">AR Crafter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image Upload Form */}
        <div className={model ? "" : "md:col-span-2 flex justify-center items-center"}>
          <Card className={model ? "" : "w-full"}>
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
        </div>

        {/* Model Preview */}
        {model && (
          <Card>
            <CardHeader>
              <CardTitle>Model Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ width: '100%', height: '300px' }}>
                <Canvas
                  camera={{ position: [0, 0, 5], fov: 75 }}
                  style={{ background: 'transparent' }}
                >
                  <ModelViewer url={model.modelUrl} />
                </Canvas>
              </div>
              <div className="relative">
                <Button
                  onClick={handleDownloadModel}
                  className="absolute bottom-2 right-2 bg-success text-success-foreground hover:bg-success/90"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
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

