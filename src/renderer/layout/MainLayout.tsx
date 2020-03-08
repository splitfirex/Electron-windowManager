import * as React from "react";
import { Header } from "./Header";

export const MainLayout: React.FunctionComponent = (props): JSX.Element => {
  return (
    <>
      <Header></Header>
      <>{props.children}</>
    </>
  );
};
