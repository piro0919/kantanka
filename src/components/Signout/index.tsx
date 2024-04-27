"use client";
import { useStytch } from "@stytch/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Oval } from "react-loader-spinner";
import styles from "./style.module.scss";

export default function Signout(): JSX.Element {
  const stytch = useStytch();
  const router = useRouter();

  useEffect(() => {
    const callback = async (): Promise<void> => {
      try {
        await stytch.session.revoke();
      } finally {
        router.push("/");
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    callback();
  }, [router, stytch.session]);

  return (
    <div className={styles.wrapper}>
      <Oval
        ariaLabel="oval-loading"
        color="#444"
        height="64"
        visible={true}
        width="64"
      />
    </div>
  );
}
