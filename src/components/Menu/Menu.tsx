import React, { FC } from "react";
import * as styles from "../../scss/components/Menu/Menu.module.scss";

export const Menu: FC = () => {
  return (
    <main className={styles.container}>
      <p className={styles.content}>This is menu content</p>
    </main>
  );
};
