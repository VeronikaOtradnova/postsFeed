import styles from './Loader.module.css';

export function Loader() {
  return (
    <div className={styles.mainLoaderWrapper}>
      <div className={styles.loader} />
    </div>
  )
}