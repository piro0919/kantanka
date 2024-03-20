"use client";
import { StytchProvider } from "@stytch/nextjs";
import { createStytchUIClient } from "@stytch/nextjs/dist/index.ui";
import i18next from "i18next";
import { ReactNode } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import z from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/ja/zod.json";
import styles from "./style.module.scss";
import useShowWindowSize from "@/hooks/useShowWindowSize";

void i18next.init({
  lng: "ja",
  resources: {
    ja: { zod: translation },
  },
});

z.setErrorMap(zodI18nMap);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const stytch = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || "",
);

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  useShowWindowSize();

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <StytchProvider stytch={stytch}>
      <Scrollbar noScrollY={true}>
        <div className={styles.frameRows} />
        <div className={styles.contentBlock}>{children}</div>
        <div className={styles.frameRight} />
        <div className={styles.frameLeft} />
      </Scrollbar>
    </StytchProvider>
  );
}
