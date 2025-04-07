
import styles from "./../card/Card.module.scss";
import { AddPhotoIcon } from "../icons";
interface Props {
  onClick: () => void;
}

export const CardAddPhotoButton: React.FC<Props> = ({ onClick }) => (
  <button className={styles.iconButton} onClick={onClick}>
    <AddPhotoIcon className={styles.iconSvg} width={16} height={16} />
    <span>Add</span>
  </button>
);
