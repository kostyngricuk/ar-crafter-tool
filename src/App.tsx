"use client";

import { useImageUpload } from "@features/imageUploader/hooks/useImageUpload";
import { useModel } from "@features/modelViewer/hooks/useModel";
import { ModelPreviewCard } from "@features/modelViewer/components/ModelPreviewCard";
import { ImageUploadForm } from "@features/imageUploader/components/ImageUploadForm";
import { ImagePreviewDialog } from "@features/imageUploader/components/ImagePreviewDialog";

export default function App() {
  const {
    imageUrls,
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
            imageUrls={imageUrls}
            isLoading={isLoading}
            onUpload={handleImageUpload}
            onRemove={removeImage}
            onImageClick={openImageDialog}
            onGenerate={() => handleGenerateModel(imageUrls)}
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
        imageUrl={selectedImage}
      />

      {/* Copyright Text */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        © {new Date().getFullYear()} AR Crafter. All rights reserved.
      </p>
    </div>
  );
}
