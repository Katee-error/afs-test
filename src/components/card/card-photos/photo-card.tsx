import styles from "./PhotoCard.module.scss";
import Image from "next/image";
import { CardWrapper } from "../card-wrapper/card";
import { TrashIcon } from "./../../icons/trash-icon";
import { AddPhotoDialog } from "@/components/modal/dialog/add-photo-dialog";
import { usePhotosCard, Photo } from "@/hooks/usePhotosCard";
import { CardAddPhotoButton } from "@/components/buttons/card-add-photo-button";

export interface PhotosCardProps {
  photos: Photo[];
}

export const PhotosCard: React.FC<PhotosCardProps> = ({
  photos: defaultPhotos,
}) => {
  const {
    photos,
    isModalOpen,
    handleAddClick,
    handleModalClose,
    handlePhotoAdd,
    handleRemovePhoto,
  } = usePhotosCard(defaultPhotos);

  return (
    <>
      <CardWrapper
        title="Photos"
        headerRight={<CardAddPhotoButton onClick={handleAddClick} />}
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
              <button
                className={styles.removeButton}
                onClick={() => handleRemovePhoto(photo.id)}
              >
                <TrashIcon className={styles.iconSvg} width={16} />
              </button>
            </div>
          ))}
        </div>
      </CardWrapper>
      {isModalOpen && (
        <AddPhotoDialog
          isOpen={true}
          onClose={handleModalClose}
          onPhotoAdd={handlePhotoAdd}
        />
      )}
    </>
  );
};
