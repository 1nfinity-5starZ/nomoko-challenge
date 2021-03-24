import React, { createContext, useContext, useReducer } from "react";

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
  activeLocation?: string;
}

export enum ActionType {
  SET_FILTERS = "SET_FILTERS",
  SET_LOCATIONS = "SET_LOCATIONS",
  SET_ACTIVE_LOCATION = "SET_ACTIVE_LOCATION",
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
      payload?: string;
    };

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case ActionType.SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case ActionType.SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };
    case ActionType.SET_ACTIVE_LOCATION:
      return {
        ...state,
        activeLocation: action.payload,
      };
    default:
      return state;
  }
};

const initialState: IState = {
  filters: {},
  locations: [],
  activeLocation: undefined,
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
