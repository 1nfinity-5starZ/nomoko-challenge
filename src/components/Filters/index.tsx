import React, { useState, useCallback, useEffect } from "react";
import {
  ActionType,
  FilterKey,
  useLocationsContext,
} from "../../providers/LocationsProvider";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { FaFilter, FaChevronUp } from "react-icons/fa";

import * as styles from "./styles.module.scss";

type Inputs = {
  type: string;
};

const Filters: React.FC = () => {
  const { state, dispatch } = useLocationsContext();

  const { register, handleSubmit } = useForm<Inputs>();

  const [showFilters, setShowFilters] = useState(
    typeof window !== "undefined" ? window.innerWidth > 767 : false
  );

  const onSubmit = (data: any) => {
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
      className={`${styles.container} ${
        state.activeLocation ? styles.shrinkContainer : ""
      } ${showFilters ? styles.open : ""}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={styles.row}
        style={showFilters ? {} : { display: "none" }}
      >
        <div className={styles.formElement}>
          <label htmlFor="type">Art des Gebäudes</label>
          <select
            name="type"
            id="id"
            placeholder="Select"
            data-testid="type"
            ref={register}
          >
            <option value="">Alles</option>
            {getTypeOptions()}
          </select>
        </div>

        <div className={styles.formElement}>
          <label htmlFor="parking">Parkplätze</label>
          <input type="checkbox" name="parking" id="parking" ref={register} />
        </div>

        <div className={styles.formElement}>
          <label htmlFor="minpricem2">Minimaler Preis</label>
          <input
            placeholder="0"
            type="number"
            name="minpricem2"
            id="minpricem2"
            ref={register}
          />
        </div>

        <div className={styles.formElement}>
          <label htmlFor="maxpricem2">Maximaler Preis</label>
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
          !showFilters ? styles.closed : ""
        }`}
      >
        {showFilters && (
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
