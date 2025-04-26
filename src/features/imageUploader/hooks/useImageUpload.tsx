import { useState } from 'react';

export function useImageUpload() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImageFiles(Array.from(event.target.files));
  };

  const removeImage = (indexToRemove: number) => {
    if (imageFiles.length === 0) return;
    const updatedFiles = Array.from(imageFiles).filter((_, index) => index !== indexToRemove);
    setImageFiles(updatedFiles.length > 0 ? updatedFiles : []);
  };

  const openImageDialog = (file: File) => {
    setSelectedImage(file);
    setDialogOpen(true);
  };

  return {
    imageFiles,
    selectedImage,
    dialogOpen,
    setDialogOpen,
    handleImageUpload,
    removeImage,
    openImageDialog,
  };
}
