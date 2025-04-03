import React from "react";
import styles from "./PhotoCard.module.scss";
import Image from "next/image";
import Card from "../card-wrapper/card";
import addIcon from "./../../../../public/assets/icons/Add Photo.svg";

interface Photo {
  id: string;
  thumbUrl: string;
  alt: string;
}

interface PhotosCardProps {
  photos: Photo[];
  onAdd: () => void;
}

const PhotosCard: React.FC<PhotosCardProps> = ({ photos, onAdd }) => {
  return (
    <Card
      title="Photos"
      actions={[
        {
          icon: (
            <Image src={addIcon} alt="Company Icon" width={16} height={16} />
          ),
          label: "Add",
          onClick: onAdd,
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
  );
};

export default PhotosCard;
