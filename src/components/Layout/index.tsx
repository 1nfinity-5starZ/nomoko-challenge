import React from "react";
import LocationsProvider from "../../providers/LocationsProvider";
import LangProvider from "../../providers/LangProvider";
import "./styles.scss";

const Layout: React.FC = ({ children }) => {
  return (
    <LangProvider>
      <LocationsProvider>{children}</LocationsProvider>
    </LangProvider>
  );
};

export default Layout;
