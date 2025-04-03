"use client";
import React from "react";
import { CompanyDetailsCard } from "../card/company-details-card/company-details-card";
import ContactsCard from "../card/contact-card/contact-card";
import PhotosCard from "../card/photo-card/photo-card";
import Image from "next/image";
import styles from "./Organisation.module.scss";
import editIcon from './../../../public/assets/icons/Edit.svg'
import trashIcon from './../../../public/assets/icons/Trash.svg'
import img1 from "./../../../public/assets/photo/image 1.png";
import img2 from "./../../../public/assets/photo/image 2.png";
import img3 from "./../../../public/assets/photo/image 3.png";
interface Props {
  className?: string;
}

export const Organisation: React.FC<Props> = ({ className }) => {
  const photos = [
    { id: "1", thumbUrl: img1, alt: "Photo 1" },
    { id: "2", thumbUrl: img2, alt: "Photo 2" },
    { id: "3", thumbUrl: img3, alt: "Photo 3" },
  ];
  return (
    <div className={styles.organisation_container}>
      <div className={styles.organisation_header}>
        <h1 className={styles.organisation_title}>Eternal Rest Funeral Home</h1>
        <div className={styles.organisation_icons_group}>
        <Image className={styles.organisation_icon_edit} src={editIcon} alt="Company Icon" width={20} height={20} />
        <Image className={styles.organisation_icon_delete} src={trashIcon} alt="Company Icon" width={20} height={20} />
        </div>
      </div>
      <div className={styles.organisation}>
        <CompanyDetailsCard
          agreement="1624/2-24 / 03.12.2024"
          businessEntity="Partnership"
          companyType="Funeral Home, Logistics services"
          onEdit={() => console.log("Edit company details")}
        />
        <ContactsCard
          personName="David Rosenberg"
          phoneNumber="+1 702 555 2345"
          email="david_rosenberg88@gmail.com"
          onEdit={() => console.log("Edit contacts")}
        />
        <PhotosCard
          photos={photos}
          onAdd={() => console.log("Add new photo")}
        />
      </div>
    </div>
  );
};
