import styles from './Btn.module.css';

export enum btnSizes {
  small = 'smallSize',
  normal = 'normalSize'
}

interface IProps {
  children: React.ReactNode;
  style?: Object;
  onClick?: () => void;
  size?: btnSizes
}

export function Btn({children, onClick, style, size = btnSizes.normal}: IProps) {
  return (
    <button className={`${styles.btn} ${styles[size]}`} onClick={onClick} style={style}>
      {children}
    </button>
  )
}