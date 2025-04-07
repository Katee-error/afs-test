import React from "react";
import styles from "./../Modal.module.scss";
import { Modal } from "../modal";
import { usePhotoUpload } from "@/hooks/useUploadPhoto";

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
  const { selectedFile, previewUrl, handleFileChange, reset } = usePhotoUpload();

  const handleUpload = () => {
    if (selectedFile) {
      onPhotoAdd(selectedFile);
      reset();
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
        style={{
          maxWidth: "600px",
          maxHeight: "500px",
          width: "auto",
          height: "auto",
          objectFit: "contain",
        }}
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
          <button onClick={onClose} className={styles.noBtn}>
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className={styles.yesBtn}
          >
            Upload
          </button>
        </div>
      </div>
    </Modal>
  );
};
