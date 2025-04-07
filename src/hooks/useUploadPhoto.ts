'use client'
import { useState, ChangeEvent } from "react";

export const usePhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return {
    selectedFile,
    previewUrl,
    handleFileChange,
    reset,
  };
};
