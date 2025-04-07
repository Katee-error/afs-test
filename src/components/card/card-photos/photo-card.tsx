import styles from "./PhotoCard.module.scss";
import Image from "next/image";
import { CardWrapper } from "../card-wrapper/card";
import addIcon from "./../../../../public/assets/icons/Add Photo.svg";
import { AddPhotoDialog } from "@/components/modal/dialog/add-photo-dialog";
import { usePhotosCard } from "@/hooks";
import { Photo } from "@/hooks/usePhotosCard";


export interface PhotosCardProps {
  photos: Photo[];
}

export const PhotosCard: React.FC<PhotosCardProps> = ({ photos: defaultPhotos }) => {
  const { photos, isModalOpen, handleAddClick, handleModalClose, handlePhotoAdd } =
    usePhotosCard(defaultPhotos);

  return (
    <>
      <CardWrapper
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
              <Image src={photo.thumbUrl} alt={photo.alt} width={144} height={108} />
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

