"use client";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStytchUser } from "@stytch/nextjs";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import styles from "./style.module.scss";

const schema = z.object({
  authorId: z.string(),
  text: z.string().min(1),
});

type FieldTypes = z.infer<typeof schema>;

export type TankaNewProps = {
  sendTanka: (data: FieldTypes) => Promise<void>;
};

export default function TankaNew({ sendTanka }: TankaNewProps): JSX.Element {
  const { user } = useStytchUser();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<FieldTypes>({
    defaultValues: {
      text: "",
    },
    resolver: zodResolver(schema),
    shouldUnregister: false,
  });
  const router = useRouter();
  const action = handleSubmit(async (data) => {
    await sendTanka(data);

    router.push("/");
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    const { user_id: userId } = user;

    setValue("authorId", userId);
  }, [setValue, user]);

  return (
    <div className={styles.wrapper}>
      <form
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        action={action}
      >
        <div className={styles.formInner}>
          <div className={styles.textareaWrapper}>
            <div className={styles.textareaPlaceholderBlock}>
              <p style={{ opacity: watch("text") ? 0 : 1 }}>
                くれなゐの
                <br />
                二尺伸びたる
                <br />
                薔薇の芽の
                <br />
                針やはらかに
                <br />
                春雨のふる
              </p>
            </div>
            <textarea {...register("text")} className={styles.textarea} />
          </div>
          <ErrorMessage
            errors={errors}
            name="text"
            render={({ message }): ReactNode => (
              <p className={styles.errorMessage}>{message}</p>
            )}
          />
          <button className={styles.button} type="submit">
            投稿する
          </button>
        </div>
      </form>
    </div>
  );
}
