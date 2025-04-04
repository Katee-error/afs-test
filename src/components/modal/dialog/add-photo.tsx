import React, { useState } from "react";
import styles from "./../Modal.module.scss";
import { Modal } from "../modal";

interface AddPhotoDialogProps {
  onClose: () => void;
  onPhotoAdd: (photo: File) => void;
  isOpen: boolean;
}

export const AddPhotoDialog: React.FC<AddPhotoDialogProps> = ({
  onClose,
  isOpen,
  onPhotoAdd,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onPhotoAdd(selectedFile);
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.editDialog}>
        <h2>Upload your photo</h2>
        {previewUrl ? (
          <div className={styles.previewContainer}>
            <img
              src={previewUrl}
              alt="Preview"
              className={styles.previewImage}
            />
          </div>
        ) : (
          <div className={styles.customFileInput}>
            <label htmlFor="fileInput" className={styles.uploadButton}>
              Choose a file
            </label>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        )}
        <div className={styles.buttons}>
          <button onClick={onClose} className={styles.noBtn}>Cancel</button>
          <button onClick={handleUpload} disabled={!selectedFile} className={styles.yesBtn}>
            Upload
          </button>
        </div>
      </div>
    </Modal>
  );
};
