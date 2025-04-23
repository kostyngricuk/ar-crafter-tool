import { useState } from 'react';

export function useImageUpload() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files).slice(0, 3);
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setImageUrls(newImageUrls);
  };

  const removeImage = (indexToRemove: number) => {
    setImageUrls((prevImageUrls) =>
      prevImageUrls.filter((_, index) => index !== indexToRemove)
    );
  };

  const openImageDialog = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setDialogOpen(true);
  };

  return {
    imageUrls,
    selectedImage,
    dialogOpen,
    setDialogOpen,
    handleImageUpload,
    removeImage,
    openImageDialog,
  };
}
