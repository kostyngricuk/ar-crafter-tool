import { useState } from 'react';
import { Model, generateModel } from '@services/model-generation';

export function useModel() {
  const [model, setModel] = useState<Model | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateModel = async (imageUrls: string[]) => {
    setIsLoading(true);
    try {
      const generatedModel = await generateModel(imageUrls);
      setModel(generatedModel);
    } catch (error) {
      console.error("Error generating model:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadModel = () => {
    if (model?.modelUrl) {
      const link = document.createElement("a");
      link.href = model.modelUrl;
      link.download = "model.glb";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return {
    model,
    isLoading,
    handleGenerateModel,
    handleDownloadModel,
  };
}
