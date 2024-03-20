import { ReactNode } from "react";
import VerticalLayout from "@/components/VerticalLayout";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  return <VerticalLayout>{children}</VerticalLayout>;
}
