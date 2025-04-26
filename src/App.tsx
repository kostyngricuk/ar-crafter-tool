"use client";

import { useImageUpload } from "@features/ImageUploader/hooks/useImageUpload";
import { useModel } from "@features/ModelViewer/hooks/useModel";
import { ModelPreviewCard } from "@features/ModelViewer/components/ModelPreviewCard";
import { ImageUploadForm } from "@features/ImageUploader/components/ImageUploadForm";
import { ImagePreviewDialog } from "@features/ImageUploader/components/ImagePreviewDialog";

export default function App() {
  const {
    imageFiles,
    selectedImage,
    dialogOpen,
    setDialogOpen,
    handleImageUpload,
    removeImage,
    openImageDialog,
  } = useImageUpload();

  const {
    model,
    isLoading,
    handleGenerateModel,
    handleDownloadModel,
  } = useModel();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">AR Crafter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={model ? "" : "md:col-span-2 flex justify-center items-center"}>
          <ImageUploadForm
            imageFiles={imageFiles}
            isLoading={isLoading}
            onUpload={handleImageUpload}
            onRemove={removeImage}
            onImageClick={openImageDialog}
            onGenerate={() => handleGenerateModel(imageFiles)}
            className={model ? "" : "w-full"}
          />
        </div>

        {model && (
          <ModelPreviewCard 
            modelUrl={model.modelUrl}
            onDownload={handleDownloadModel}
          />
        )}
      </div>

      <ImagePreviewDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        imageUrl={selectedImage ? URL.createObjectURL(selectedImage) : null}
      />

      {/* Copyright Text */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        © {new Date().getFullYear()} AR Crafter. All rights reserved.
      </p>
    </div>
  );
}
