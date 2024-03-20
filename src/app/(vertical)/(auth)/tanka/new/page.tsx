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
  };

  return <TankaNew sendTanka={sendTanka} />;
}
