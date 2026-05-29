import styles from './Header.module.css';

export default function Header({ text, img }) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span>{text}</span>
        <img src={img} alt="logo" />
      </div>
    </div>
  );
}