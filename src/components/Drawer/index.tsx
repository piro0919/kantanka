import { useStytch, useStytchUser } from "@stytch/nextjs";
import { useRouter } from "next/navigation";
import ReactModernDrawer from "react-modern-drawer";
import styles from "./style.module.scss";

export type DrawerProps = {
  onClose: () => void;
  open: boolean;
};

export default function Drawer({ onClose, open }: DrawerProps): JSX.Element {
  const stytch = useStytch();
  const router = useRouter();
  const { isInitialized, user } = useStytchUser();

  return (
    <ReactModernDrawer direction="right" onClose={onClose} open={open}>
      {isInitialized ? (
        <div className={styles.wrapper}>
          {user ? (
            <button
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => {
                await stytch.session.revoke();

                onClose();

                router.push("/");
              }}
            >
              ログアウト
            </button>
          ) : (
            <button
              onClick={() => {
                router.push("/signin");
              }}
            >
              ログイン
            </button>
          )}
        </div>
      ) : null}
    </ReactModernDrawer>
  );
}
