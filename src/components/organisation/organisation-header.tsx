import Image from "next/image";
import styles from "./Organisation.module.scss";
import editIcon from "./../../../public/assets/icons/Edit.svg";
import trashIcon from "./../../../public/assets/icons/Trash.svg";

interface OrganisationHeaderProps {
    displayName: string;
    onEdit: () => void;
    onRemove: () => void;
  }
  
  export const OrganisationHeader: React.FC<OrganisationHeaderProps> = ({ displayName, onEdit, onRemove }) => (
    <div className={styles.organisation_header}>
      <h1 className={styles.organisation_title}>{displayName}</h1>
      <div className={styles.organisation_icons_group}>
        <Image
          className={styles.organisation_icon_edit}
          src={editIcon}
          alt="Edit Icon"
          width={20}
          height={20}
          onClick={onEdit}
        />
        <Image
          className={styles.organisation_icon_delete}
          src={trashIcon}
          alt="Delete Icon"
          width={20}
          height={20}
          onClick={onRemove}
        />
      </div>
    </div>
  );
