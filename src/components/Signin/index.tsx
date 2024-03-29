"use client";
import { StytchLogin, useStytchUser } from "@stytch/nextjs";
import { OAuthProviders, Products } from "@stytch/vanilla-js";
import { useRouter } from "next/navigation";
import React, { ComponentProps, useEffect } from "react";
import { useBoolean, useInterval } from "usehooks-ts";
import styles from "./style.module.scss";
import getDomainFromWindow from "@/lib/getDomainFromWindow";

export default function Signin(): JSX.Element {
  const { isInitialized, user } = useStytchUser();
  const router = useRouter();
  const stytchLoginStyles: ComponentProps<typeof StytchLogin>["styles"] = {
    container: {
      width: "300px",
    },
    hideHeaderText: true,
  };
  const config: ComponentProps<typeof StytchLogin>["config"] = {
    oauthOptions: {
      loginRedirectURL: `${getDomainFromWindow()}/authenticate`,
      providers: [{ type: OAuthProviders.Google }],
      signupRedirectURL: `${getDomainFromWindow()}/authenticate`,
    },
    products: [Products.oauth],
  };
  const { setTrue, value } = useBoolean(false);

  useEffect(() => {
    if (isInitialized && user) {
      router.replace("/profile");

      return;
    }
  }, [user, isInitialized, router]);

  useInterval(
    () => {
      const oauthGoogle = document.getElementById("oauth-google");

      if (!oauthGoogle) {
        return;
      }

      if (oauthGoogle) {
        const span = oauthGoogle.getElementsByTagName("span");

        span[0].innerHTML = "Google でログイン";
      }

      setTrue();
    },
    value ? null : 250,
  );

  return (
    <div className={styles.wrapper} style={{ opacity: value ? 1 : 0 }}>
      <StytchLogin config={config} styles={stytchLoginStyles} />
    </div>
  );
}
