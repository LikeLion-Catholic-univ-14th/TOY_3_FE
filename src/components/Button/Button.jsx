import styles from "./Button.module.css";

export default function Button({ text, mode = "primary", onClick }) {
  return (
    <button className={styles[mode]} onClick={onClick}>
      {text}
    </button>
  );
}
