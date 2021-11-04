module.exports = {
  // pathPrefix: "/my-gatsby-site",
  siteMetadata: {
    siteUrl: 'https://www.antoinelacour.com'
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `projects`,
        path: `${__dirname}/projects`,
      }
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-cname'
  ],
};
