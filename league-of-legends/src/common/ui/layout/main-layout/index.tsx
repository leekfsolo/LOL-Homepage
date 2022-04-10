import React, { FC, ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = (props: Props) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default MainLayout;
