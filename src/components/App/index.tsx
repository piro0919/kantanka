import styles from "./style.module.scss";

type Tanka = {
  id: string;
  text: string;
};

export type AppProps = {
  tankaList: Tanka[];
};

export default function App({ tankaList }: AppProps): JSX.Element {
  return (
    <div>
      <ul className={styles.list}>
        {tankaList.map(({ id, text }) => (
          <li className={styles.item} key={id}>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
