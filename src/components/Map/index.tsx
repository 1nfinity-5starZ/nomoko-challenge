import React, { useCallback } from "react";
import { Map as PigeonMap, ZoomControl } from "pigeon-maps";
import {
  useLocationsContext,
  FilterKey,
  LocationKey,
  ActionType,
} from "../../providers/LocationsProvider";
import CustomMarker from "../CustomMarker";
import colors from "src/utils/colors";

const Map: React.FC = () => {
  const { state, dispatch } = useLocationsContext();

  const getFilteredLocations = useCallback(() => {
    const { filters, locations } = state;

    // get only truthy values
    const activeFiltersKeys = Object.keys(filters).filter(
      (key) => !!filters[key as FilterKey]
    );

    // Iterate trough locations in state
    return locations.filter((location) => {
      // For every active filter
      return activeFiltersKeys.every((filterkey) => {
        // Checks if its an absolute or relative value
        if (filterkey.indexOf("max") >= 0) {
          return (
            location[filterkey.replace("max", "") as LocationKey] <=
            filters[filterkey as FilterKey]!
          );
        } else if (filterkey.indexOf("min") >= 0) {
          return (
            location[filterkey.replace("min", "") as LocationKey] >=
            filters[filterkey as FilterKey]!
          );
        } else {
          return (
            location[filterkey as LocationKey] ===
            filters[filterkey as FilterKey]
          );
        }
      });
    });
  }, [state.locations, state.filters]);

  return (
    <PigeonMap defaultZoom={12} defaultCenter={[47.3732226, 8.5441272]}>
      <ZoomControl
        style={{ bottom: 20, top: "auto", left: "auto", right: 20 }}
      />
      {getFilteredLocations().map((location, i) => {
        const activeIndex = state.activeLocations.indexOf(location.id);
        return (
          <CustomMarker
            key={i}
            index={i}
            anchor={[location.lat, location.lng]}
            onClick={() =>
              dispatch({
                type:
                  activeIndex < 0
                    ? ActionType.SET_ACTIVE_LOCATION
                    : ActionType.REMOVE_ACTIVE_LOCATION,
                payload: location.id,
              })
            }
            active={activeIndex >= 0}
            color={colors[activeIndex % colors.length]}
          >
            {location.pricem2}
          </CustomMarker>
        );
      })}
    </PigeonMap>
  );
};

export default Map;
