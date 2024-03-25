import styles from './ErrorMessage.module.css';

interface IProps {
  text: string;
}

export function ErrorMessage({text}: IProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.error}>{text}</div>
    </div>
  )
}