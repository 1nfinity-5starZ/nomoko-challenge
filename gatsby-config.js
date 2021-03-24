const path = require("path");

module.exports = {
  siteMetadata: {
    title: "Nomoko Challenge",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `NOMOKO Challenge`,
        short_name: `NOMOKO Challenge`,
        start_url: `/`,
        background_color: `#FFF`,
        theme_color: `rgb(208, 27, 103)`,
        display: `standalone`,
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-csv`,
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        src: path.join(__dirname, "src"),
        pages: path.join(__dirname, "src/pages"),
      },
    },
  ],
};
