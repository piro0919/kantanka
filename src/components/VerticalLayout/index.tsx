"use client";
import { ReactNode } from "react";
import { useBoolean } from "usehooks-ts";
import Drawer from "../Drawer";
import Footer from "../Footer";
import Header from "../Header";
import styles from "./style.module.scss";

export type VerticalLayoutProps = {
  children: ReactNode;
};

export default function VerticalLayout({
  children,
}: VerticalLayoutProps): JSX.Element {
  const { setFalse: offOpen, setTrue: onOpen, value: open } = useBoolean(false);

  return (
    <>
      <div className={styles.wrapper}>
        <Header onOpen={onOpen} />
        <main>{children}</main>
        <Footer />
      </div>
      <Drawer onClose={offOpen} open={open} />
    </>
  );
}
