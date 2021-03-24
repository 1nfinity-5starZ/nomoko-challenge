import React, { useEffect } from "react";
import Map from "../components/Map";
import { graphql, PageProps } from "gatsby";
import { Helmet } from "react-helmet";
import "./index.module.scss";
import {
  ActionType,
  useLocationsContext,
} from "../providers/LocationsProvider";
import Filters from "../components/Filters";
import LocationInfo from "src/components/LocationInfo";

export const query = graphql`
  query {
    allPropertiesFCsv {
      nodes {
        id
        BuildingType
        Coordinates
        Parking
        Price_m_2
      }
    }
  }
`;

interface Props {
  allPropertiesFCsv: {
    nodes: {
      id: string;
      BuildingType: string;
      Coordinates: string;
      Parking: string;
      Price_m_2: string;
    }[];
  };
}

const Index: React.FC<PageProps<Props>> = ({ data }) => {
  const rawData = data.allPropertiesFCsv.nodes;
  const { dispatch } = useLocationsContext();

  // Loads data from CSV, with Gatsby and GraphQL, parses it and puts it into locations context
  useEffect(() => {
    dispatch({
      type: ActionType.SET_LOCATIONS,
      payload: rawData.map((line) => {
        const [lat, lng] = line.Coordinates.split("(")[1]
          .replace(")", "")
          .split(" ");
        return {
          id: line.id,
          type: line.BuildingType,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          parking: line.Parking,
          pricem2: parseFloat(line.Price_m_2),
        };
      }),
    });
  }, [rawData]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        {/* <!-- Primary Meta Tags --> */}
        <title>Meta Tags — Preview, Edit and Generate</title>
        <meta name="title" content="NOMOKO Challenge" />
        <meta name="description" content="NOMOKO Property Locator" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://zealous-ptolemy-a69c8c.netlify.app/"
        />
        <meta property="og:title" content="NOMOKO Challenge" />
        <meta
          property="og:description"
          content="NOMOKO Map Challenge with Gatsby, React, SCSS and more!"
        />
        <meta
          property="og:image"
          content="https://zealous-ptolemy-a69c8c.netlify.app/favicon-32x32.png"
        />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://zealous-ptolemy-a69c8c.netlify.app/"
        />
        <meta property="twitter:title" content="NOMOKO Challenge" />
        <meta
          property="twitter:description"
          content="NOMOKO Map Challenge with Gatsby, React, SCSS and more!"
        />
        <meta
          property="twitter:image"
          content="https://zealous-ptolemy-a69c8c.netlify.app/favicon-32x32.png"
        />
        <title>NOMOKO Challenge</title>
      </Helmet>
      <main>
        <Map />
        <LocationInfo />
        <Filters />
      </main>
    </>
  );
};

export default Index;
