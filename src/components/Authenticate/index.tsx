"use client";
import { useStytch, useStytchUser } from "@stytch/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect } from "react";

const OAUTH_TOKEN = "oauth";
const MAGIC_LINKS_TOKEN = "magic_links";

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
    if (stytch && !user && isInitialized) {
      const token = searchParams.get("token");
      const stytchTokenType = searchParams.get("stytch_token_type");

      if (token && stytchTokenType === OAUTH_TOKEN) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        stytch.oauth.authenticate(token, {
          session_duration_minutes: 60,
        });

        return;
      }

      if (token && stytchTokenType === MAGIC_LINKS_TOKEN) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        stytch.magicLinks.authenticate(token, {
          session_duration_minutes: 60,
        });
      }
    }
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

  return <Fragment />;
}
