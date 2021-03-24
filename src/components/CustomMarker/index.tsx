import { Overlay, Point } from "pigeon-maps";
import React from "react";

import * as styles from "./styles.module.scss";

const Marker: React.FC<{
  onClick: () => void;
  anchor: Point;
  index: number;
  active: boolean;
  color?: string;
}> = ({ onClick, anchor, children, active, index, color, ...props }) => {
  return (
    <div onClick={onClick} data-testid="customMarker">
      <Overlay
        anchor={anchor}
        {...props}
        style={{ zIndex: active ? 500 : index }}
      >
        <span
          className={`${styles.container} ${active ? styles.active : ""}`}
          style={{ backgroundColor: color }}
        >
          {children}
        </span>
      </Overlay>
    </div>
  );
};

export default Marker;
