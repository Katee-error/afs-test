
import { EditIcon } from "../icons";
import styles from "./../card/Card.module.scss";

interface Props {
  onClick: () => void;
}

export const CardEditButton: React.FC<Props> = ({ onClick }) => (
  <button className={styles.iconButton} onClick={onClick} title="Edit">
    <EditIcon className={styles.iconSvg} width={16} height={16} />
    <span>Edit</span>
  </button>
);
