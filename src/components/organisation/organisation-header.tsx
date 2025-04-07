
import { EditIcon, TrashIcon } from "../icons";
import styles from "./Organisation.module.scss";


interface OrganisationHeaderProps {
    displayName: string;
    onEdit: () => void;
    onRemove: () => void;
  }
  
  export const OrganisationHeader: React.FC<OrganisationHeaderProps> = ({ displayName, onEdit, onRemove }) => (
    <div className={styles.organisation_header}>
      <h1 className={styles.organisation_title}>{displayName}</h1>
      <div className={styles.organisation_icons_group}>
        <EditIcon
          className={styles.organisation_icon_edit}
          width={20}
          height={20}
          onClick={onEdit}
        />
        <TrashIcon
          className={styles.organisation_icon_delete}
          width={20}
          height={20}
          onClick={onRemove}
        />
      </div>
    </div>
  );
