import React from "react";
import LocationsProvider from "src/providers/LocationsProvider";
import LangProvider from "src/providers/LangProvider";
import "./styles.scss";

const Layout: React.FC = ({ children }) => {
  return (
    <LangProvider>
      <LocationsProvider>{children}</LocationsProvider>
    </LangProvider>
  );
};

export default Layout;
