import React from "react";
import {
  ActionType,
  useLocationsContext,
} from "src/providers/LocationsProvider";

import { Motion, spring } from "react-motion";

import * as styles from "./styles.module.scss";
import Button from "../Button";
import { FaTimes } from "react-icons/fa";
import { FormattedMessage } from "react-intl";

const LocationInfo: React.FC = () => {
  const { state, dispatch } = useLocationsContext();

  const { activeLocation, locations } = state;

  const location = activeLocation
    ? locations.find((location) => location.id === activeLocation)
    : null;

  let motionDirection = "X(-";
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    motionDirection = "Y(";
  }

  return (
    <Motion style={{ x: spring(!!location ? 0 : 1) }}>
      {({ x }) => (
        <div
          className={`${styles.container}`}
          style={{
            transform: `translate${motionDirection}${100 * x}%)`,
            opacity: 1 - 0.5 * x,
          }}
        >
          <Button
            onClick={() =>
              dispatch({
                type: ActionType.SET_ACTIVE_LOCATION,
                payload: undefined,
              })
            }
          >
            <FaTimes className={styles.closeIcon} />
          </Button>
          {location && (
            <>
              <h1>
                <FormattedMessage
                  id="propertyInfo"
                  defaultMessage="Property Info"
                />
              </h1>
              <div>
                <span>Building type:</span>
                <span>{location.type}</span>
              </div>
              <div>
                <span>
                  <FormattedMessage id="parking" defaultMessage="Parking" />:
                </span>
                <span>{location.parking === "x" ? "Yes" : "No"}</span>
              </div>
              <div>
                <span>
                  <FormattedMessage id="pricem2" defaultMessage="Price / m²" />:
                </span>
                <span>{location.pricem2}</span>
              </div>
            </>
          )}
        </div>
      )}
    </Motion>
  );
};

export default LocationInfo;
