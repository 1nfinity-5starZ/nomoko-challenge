import React from "react";
import {
  ActionType,
  useLocationsContext,
  ILocation,
} from "src/providers/LocationsProvider";

import { Motion, spring } from "react-motion";

import * as styles from "./styles.module.scss";
import Button from "../Button";
import { FaTimes } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import colors from "src/utils/colors";

const LocationInfo: React.FC = () => {
  const { state, dispatch } = useLocationsContext();

  const { activeLocations, locations } = state;

  const compareLocations = activeLocations.map(
    (location) => locations.find((l) => l.id === location) as ILocation
  );

  let motionDirection = "X(-";
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    motionDirection = "Y(";
  }

  return (
    <Motion style={{ x: spring(compareLocations.length > 0 ? 0 : 1) }}>
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
                type: ActionType.CLEAR_ACTIVE_LOCATION,
              })
            }
          >
            <FaTimes className={styles.closeIcon} />
          </Button>
          <h1>
            <FormattedMessage
              id="propertyInfo"
              defaultMessage="Property Info"
            />
          </h1>
          <div className={styles.locationInfoContainer}>
            {compareLocations.map((location, i) => (
              <div
                key={i}
                className={styles.locationInfo}
                style={{ borderColor: colors[i % colors.length] }}
              >
                <div>
                  <span>
                    <FormattedMessage
                      id="buildingType"
                      defaultMessage="Building Type"
                    />
                    :
                  </span>
                  <span>{location.type}</span>
                </div>
                <div>
                  <span>
                    <FormattedMessage id="parking" defaultMessage="Parking" />:
                  </span>
                  <span>
                    {location.parking === "x" ? (
                      <FormattedMessage id="yes" defaultMessage="Yes" />
                    ) : (
                      <FormattedMessage id="no" defaultMessage="Nein" />
                    )}
                  </span>
                </div>
                <div>
                  <span>
                    <FormattedMessage
                      id="pricem2"
                      defaultMessage="Price / m²"
                    />
                    :
                  </span>
                  <span>{location.pricem2}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Motion>
  );
};

export default LocationInfo;
