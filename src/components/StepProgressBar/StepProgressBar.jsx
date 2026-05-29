import styles from "./StepProgressBar.module.css";

export default function StepProgressBar({ activeCount = 1, totalCount = 4 }) {
  return (
    <div className={styles.container}>
      {Array.from({ length: totalCount }).map((_, index) => (
        <div
          key={index}
          className={`${styles.segment} ${
            index < activeCount ? styles.active : styles.inactive
          }`}
        />
      ))}
    </div>
  );
}
