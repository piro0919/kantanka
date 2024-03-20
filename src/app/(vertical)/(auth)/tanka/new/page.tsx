import { revalidatePath } from "next/cache";
import TankaNew, { TankaNewProps } from "@/components/TankaNew";
import prisma from "@/lib/prisma";

export default function Page(): JSX.Element {
  const sendTanka: TankaNewProps["sendTanka"] = async ({ authorId, text }) => {
    "use server";

    await prisma.tanka.create({
      data: {
        authorId,
        text,
      },
    });

    revalidatePath("/");
  };

  return <TankaNew sendTanka={sendTanka} />;
}
