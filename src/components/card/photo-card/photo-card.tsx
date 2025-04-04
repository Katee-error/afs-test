import React, { useState } from "react";
import styles from "./PhotoCard.module.scss";
import Image from "next/image";
import Card from "../card-wrapper/card";
import addIcon from "./../../../../public/assets/icons/Add Photo.svg";
import { AddPhotoDialog } from "@/components/modal/dialog/add-photo";

interface Photo {
  id: string;
  thumbUrl: string;
  alt: string;
}

export interface PhotosCardProps {
  photos: Photo[];
  onAdd: (photo: File) => void;
}

const PhotosCard: React.FC<PhotosCardProps> = ({ photos, onAdd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePhotoAdd = (photo: File) => {
    onAdd(photo);
  };

  return (
    <>
      <Card
        title="Photos"
        actions={[
          {
            icon: (
              <Image src={addIcon} alt="Company Icon" width={16} height={16} />
            ),
            label: "Add",
            onClick: handleAddClick,
          },
        ]}
      >
        <div className={styles.photoGrid}>
          {photos.map((photo) => (
            <div key={photo.id} className={styles.photoItem}>
              <Image
                src={photo.thumbUrl}
                alt={photo.alt}
                width={144}
                height={108}
              />
            </div>
          ))}
        </div>
      </Card>
      {isModalOpen && (
        <AddPhotoDialog
          onClose={handleModalClose}
          onPhotoAdd={handlePhotoAdd}
          isOpen={true}
        />
      )}
    </>
  );
};

export default PhotosCard;
