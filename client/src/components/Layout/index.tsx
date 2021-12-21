import {ReactNode} from "react";
import {Navbar} from "../Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
      <>
        <Navbar/>
        {children}
      </>
  );
}