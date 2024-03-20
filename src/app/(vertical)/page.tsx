import App, { AppProps } from "@/components/App";
import prisma from "@/lib/prisma";

export const revalidate = 3600;

export default async function Page(): Promise<JSX.Element> {
  const tanka = await prisma.tanka.findMany({
    orderBy: {
      createdAt: "asc",
    },
    take: 100,
  });
  const tankaList: AppProps["tankaList"] = tanka.map(({ id, text }) => ({
    id,
    text,
  }));

  return <App tankaList={tankaList} />;
}
