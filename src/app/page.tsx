"use client";

import { useState } from "react";
import { generateModel, Model } from "@/services/model-generation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, Download, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [model, setModel] = useState<Model | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AR Crafter</h1>
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
              {imageUrls.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Uploaded Image ${index + 1}`}
                  className="mt-2 max-w-full h-auto rounded-md"
                />
              ))}
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
            {model ? (
              <div className="relative">
                <model-viewer
                  src={model.modelUrl}
                  alt="3D Model"
                  shadow-intensity="1"
                  camera-controls
                  touch-action="pan-y"
                  style={{ width: "100%", height: "300px" }}
                ></model-viewer>
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
    </div>
  );
}
