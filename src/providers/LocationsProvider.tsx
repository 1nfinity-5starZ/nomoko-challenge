import React, { createContext, useContext, useReducer } from "react";
import produce from "immer";

type IType =
  | "Residential"
  | "Offices"
  | "Commercial"
  | "Mixed Use"
  | "Industrial";

type IParking = "x" | "";

export interface ILocation {
  id: string;
  type: string;
  lat: number;
  lng: number;
  parking: string;
  pricem2: number;
}
export type LocationKey = keyof ILocation;

interface IFilter {
  type?: IType;
  parking?: IParking;
  minpricem2?: number;
  maxpricem2?: number;
}
export type FilterKey = keyof IFilter;

interface IState {
  filters: IFilter;
  locations: ILocation[];
  activeLocations: string[];
}

export enum ActionType {
  SET_FILTERS = "SET_FILTERS",
  SET_LOCATIONS = "SET_LOCATIONS",
  SET_ACTIVE_LOCATION = "SET_ACTIVE_LOCATION",
  REMOVE_ACTIVE_LOCATION = "REMOVE_ACTIVE_LOCATION",
  CLEAR_ACTIVE_LOCATION = "CLEAR_ACTIVE_LOCATION",
}

type Action =
  | {
      type: ActionType.SET_FILTERS;
      payload: IFilter;
    }
  | {
      type: ActionType.SET_LOCATIONS;
      payload: ILocation[];
    }
  | {
      type: ActionType.SET_ACTIVE_LOCATION;
      payload: string;
    }
  | {
      type: ActionType.REMOVE_ACTIVE_LOCATION;
      payload: string;
    }
  | {
      type: ActionType.CLEAR_ACTIVE_LOCATION;
    };

const reducer = (state: IState, action: Action) => {
  return produce(state, (draft: IState) => {
    switch (action.type) {
      case ActionType.SET_FILTERS:
        draft.filters = action.payload;
        break;
      case ActionType.SET_LOCATIONS:
        draft.locations = action.payload;
        break;
      case ActionType.SET_ACTIVE_LOCATION:
        draft.activeLocations.push(action.payload);
        break;
      case ActionType.REMOVE_ACTIVE_LOCATION:
        draft.activeLocations = draft.activeLocations.filter(
          (location) => location !== action.payload
        );
        break;
      case ActionType.CLEAR_ACTIVE_LOCATION:
        draft.activeLocations = [];
        break;
      default:
        return state;
    }
  });
};
export const initialState: IState = {
  filters: {},
  locations: [],
  activeLocations: [],
};

const initialContext: {
  state: IState;
  dispatch: React.Dispatch<Action>;
} = {
  state: initialState,
  dispatch: () => {},
};

export const LocationsContext = createContext(initialContext);

const LocationsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <LocationsContext.Provider value={{ state, dispatch }}>
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocationsContext = () => useContext(LocationsContext);
export default LocationsProvider;
