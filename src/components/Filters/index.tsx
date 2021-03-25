import React, { useState, useCallback } from "react";
import {
  ActionType,
  IType,
  useLocationsContext,
} from "../../providers/LocationsProvider";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { FaFilter, FaChevronUp } from "react-icons/fa";

import * as styles from "./styles.module.scss";

type Inputs = {
  type: IType;
  minpricem2: string;
  maxpricem2: string;
  parking: boolean;
};

const Filters: React.FC = () => {
  const { state, dispatch } = useLocationsContext();

  const { register, handleSubmit } = useForm<Inputs>();

  const [showFilters, setShowFilters] = useState(false);

  const onSubmit = (data: Inputs) => {
    dispatch({
      type: ActionType.SET_FILTERS,
      payload: {
        ...data,
        minpricem2: parseFloat(data.minpricem2),
        maxpricem2: parseFloat(data.maxpricem2),
        parking: !!data.parking ? "x" : "",
      },
    });
  };

  // Programatically retrieves unique options for the type filter
  const getTypeOptions = useCallback(() => {
    const uniqueTypes = new Set(
      state.locations.map((location) => location.type)
    );
    return [...uniqueTypes].map((type, i) => (
      <option value={type} key={i}>
        {type}
      </option>
    ));
  }, [state.locations]);

  return (
    <form
      className={`
        ${styles.container} 
        ${state.activeLocations.length > 0 ? styles.shrinkContainer : ""} 
        ${showFilters ? styles.formOpen : ""}
      `}
      onSubmit={handleSubmit(onSubmit)}
      data-testid="form"
    >
      <div
        className={styles.row}
        style={showFilters ? {} : { display: "none" }}
      >
        <div className={styles.formElement}>
          <label htmlFor="type">
            <FormattedMessage
              id="buildingType"
              defaultMessage="Building Type"
            />
          </label>
          <select name="type" id="id" placeholder="Select" ref={register}>
            <option value="">Alles</option>
            {getTypeOptions()}
          </select>
        </div>

        <div className={styles.formElement}>
          <label htmlFor="parking">
            <FormattedMessage id="parking" defaultMessage="Parking" />
          </label>
          <input
            type="checkbox"
            name="parking"
            id="parking"
            data-testid="parking"
            ref={register}
          />
        </div>

        <div className={styles.formElement}>
          <label htmlFor="minpricem2">
            <FormattedMessage
              id="minPrice"
              defaultMessage="Minimum Price / m²"
            />
          </label>
          <input
            placeholder="0"
            type="number"
            name="minpricem2"
            id="minpricem2"
            ref={register}
          />
        </div>

        <div className={styles.formElement}>
          <label htmlFor="maxpricem2">
            <FormattedMessage
              id="maxPrice"
              defaultMessage="Maximaler Price / m²"
            />
          </label>
          <input
            placeholder="10000"
            type="number"
            name="maxpricem2"
            id="maxpricem2"
            ref={register}
          />
        </div>
      </div>

      <div
        className={`${styles.formElement} ${styles.row} ${
          !showFilters ? styles.buttonsClosed : styles.buttonsOpen
        }`}
      >
        {!!showFilters && (
          <>
            <Button type="reset" style={{ flex: 1 }}>
              <FormattedMessage id="clear" defaultMessage="Clear" />
            </Button>
            <Button type="submit">
              <FormattedMessage id="filter" defaultMessage="Filter" />
            </Button>
          </>
        )}

        <div className={styles.toggleFilters}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setShowFilters(!showFilters);
            }}
          >
            {showFilters ? <FaChevronUp /> : <FaFilter />}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Filters;
