// eslint-disable-next-line filenames/match-exported
import type { Metadata } from "next";
import { Shippori_Antique_B1 as ShipporiAntiqueB1 } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "react-modern-drawer/dist/index.css";
import "ress";
import "./globals.scss";
import Layout from "@/components/Layout";

const shipporiAntiqueB1 = ShipporiAntiqueB1({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  description: "かんたんかで、短歌の世界を楽しもう！",
  title: "かんたんか - 短歌の投稿サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="ja">
      <body className={shipporiAntiqueB1.className}>
        <NextTopLoader />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
