// usePhotosCard.ts
import { useState } from "react";

export interface Photo {
  id: string;
  thumbUrl: string;
  alt: string;
}

export function usePhotosCard(defaultPhotos: Photo[]) {
  const [photos, setPhotos] = useState<Photo[]>(defaultPhotos);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePhotoAdd = (file: File) => {
    const newPhoto: Photo = {
      id: Date.now().toString(),
      thumbUrl: URL.createObjectURL(file),
      alt: file.name,
    };
    setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
    setIsModalOpen(false);
  };

  const handleRemovePhoto = (photoId: string) => {
    setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== photoId));
  };

  return {
    photos,
    isModalOpen,
    handleAddClick,
    handleModalClose,
    handlePhotoAdd,
    handleRemovePhoto,
  };
}
