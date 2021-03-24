import React, { ButtonHTMLAttributes } from "react";

import * as styles from "./styles.module.scss";

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button className={styles.container} {...props}>
      {children}
    </button>
  );
};

export default Button;
