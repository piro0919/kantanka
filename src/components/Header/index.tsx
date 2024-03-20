"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import Spacer from "react-spacer";
import styles from "./style.module.scss";

export type HeaderProps = {
  onOpen: MouseEventHandler<HTMLButtonElement>;
};

export default function Header({ onOpen }: HeaderProps): JSX.Element {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.topWrapper}>
        <button className={styles.menuButton} onClick={onOpen}>
          <div className={styles.burger} />
        </button>
        <Link href="/">
          <h1 className={styles.h1}>かんたんか</h1>
        </Link>
      </div>
      <Spacer grow="1" />
      <button
        className={styles.button}
        onClick={() => {
          router.push("/tanka/new");
        }}
      >
        <span>投稿する</span>
      </button>
    </header>
  );
}
