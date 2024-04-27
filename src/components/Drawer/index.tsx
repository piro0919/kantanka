import { useStytchUser } from "@stytch/nextjs";
import { useRouter } from "next/navigation";
import ReactModernDrawer from "react-modern-drawer";
import styles from "./style.module.scss";

export type DrawerProps = {
  onClose: () => void;
  open: boolean;
};

export default function Drawer({ onClose, open }: DrawerProps): JSX.Element {
  const router = useRouter();
  const { isInitialized, user } = useStytchUser();

  return (
    <ReactModernDrawer direction="right" onClose={onClose} open={open}>
      {isInitialized ? (
        <div className={styles.wrapper}>
          {user ? (
            <button
              className={styles.button}
              onClick={() => {
                router.push("/signout");
              }}
            >
              <span>ログアウト</span>
            </button>
          ) : (
            <button
              className={styles.button}
              onClick={() => {
                router.push("/signin");
              }}
            >
              <span>ログイン</span>
            </button>
          )}
        </div>
      ) : null}
    </ReactModernDrawer>
  );
}
