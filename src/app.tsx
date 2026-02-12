import React, { useState } from "react";
import { Header } from "./components/Header/Header";
import { RegisterCardForm } from "./components/RegisterCardForm/RegisterCardForm";
import { Menu } from "./components/Menu/Menu";
import type { View } from "./types";
import * as styles from "./app.module.scss";

export const App = () => {
  const [view, setView] = useState<View>("form");

  const showMenu = () => setView("menu");
  const showForm = () => setView("form");

  return (
    <div className={styles.app}>
      <Header
        variant={view}
        title={view === "form" ? "Register card form" : "Menu"}
        onIconClick={view === "form" ? showMenu : showForm}
      />
      {view === "form" ? (
        <RegisterCardForm />
      ) : (
        <Menu />
      )}
    </div>
  );
};
