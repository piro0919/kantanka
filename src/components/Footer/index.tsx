import styles from "./style.module.scss";

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>&copy; 2024 かんたんか</span>
    </footer>
  );
}
