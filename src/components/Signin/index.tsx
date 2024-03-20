"use client";
import { StytchLogin, useStytchUser } from "@stytch/nextjs";
import { OAuthProviders, Products } from "@stytch/vanilla-js";
import { useRouter } from "next/navigation";
import React, { ComponentProps, useEffect } from "react";
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
    emailMagicLinksOptions: {
      loginExpirationMinutes: 5,
      loginRedirectURL: `${getDomainFromWindow()}/authenticate`,
      signupExpirationMinutes: 5,
      signupRedirectURL: `${getDomainFromWindow()}/authenticate`,
    },
    oauthOptions: {
      loginRedirectURL: `${getDomainFromWindow()}/authenticate`,
      providers: [{ type: OAuthProviders.Google }],
      signupRedirectURL: `${getDomainFromWindow()}/authenticate`,
    },
    products: [Products.emailMagicLinks, Products.oauth],
  };

  useEffect(() => {
    if (isInitialized && user) {
      router.replace("/profile");
    }
  }, [user, isInitialized, router]);

  return (
    <div className={styles.wrapper}>
      <StytchLogin config={config} styles={stytchLoginStyles} />
    </div>
  );
}
