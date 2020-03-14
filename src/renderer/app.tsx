import * as React from "react";
import { HashRouter, Route } from "react-router-dom";
import { StandardWindow } from "./layout/StandardWindow";
import { MainScreenComponent } from "./modules/main/MainScreen";

export const App: React.FunctionComponent = () => {
  return (
    <StandardWindow title="File">
      <HashRouter>
        <Route path="/" exact component={MainScreenComponent} />
      </HashRouter>
    </StandardWindow>
  );
};
