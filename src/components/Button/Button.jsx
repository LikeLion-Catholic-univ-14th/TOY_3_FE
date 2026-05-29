import styles from "./Button.module.css";

export default function Button({ text, mode = "primary", onClick, disabled }) {
  return (
    <button className={styles[mode]} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
