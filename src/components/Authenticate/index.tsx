"use client";
import { useStytch, useStytchUser } from "@stytch/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Oval } from "react-loader-spinner";
import styles from "./style.module.scss";

const OAUTH_TOKEN = "oauth";

export type AuthenticateProps = {
  createUser: (args: { userId: string }) => Promise<void>;
  findUser: (args: { userId: string }) => Promise<boolean>;
};

export default function Authenticate({
  createUser,
  findUser,
}: AuthenticateProps): JSX.Element {
  const { isInitialized, user } = useStytchUser();
  const stytch = useStytch();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const callback = async (): Promise<void> => {
      if (stytch && !user && isInitialized) {
        const token = searchParams.get("token");
        const stytchTokenType = searchParams.get("stytch_token_type");

        if (token && stytchTokenType === OAUTH_TOKEN) {
          await stytch.oauth.authenticate(token, {
            session_duration_minutes: 527040,
          });
        }
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    callback();
  }, [isInitialized, router, searchParams, stytch, user]);

  useEffect(() => {
    const callback = async (): Promise<void> => {
      if (!isInitialized) {
        return;
      }

      if (user) {
        const { user_id: userId } = user;
        const result = await findUser({ userId });

        if (result) {
          router.replace("/");

          return;
        }

        await createUser({ userId });

        router.replace("/");
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    callback();
  }, [router, user, isInitialized, findUser, createUser]);

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
