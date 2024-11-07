module.exports = {
  pathPrefix: "/www.antoinelacour.com",
  siteMetadata: {
    siteUrl: "https://yip-theodore.github.io/www.antoinelacour.com",
    title: "Antoine Lacour",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `projects`,
        path: `${__dirname}/projects`,
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              sizeByPixelDensity: true,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    "gatsby-transformer-sharp",
    `gatsby-plugin-sass`,
    'gatsby-plugin-cname',
    `gatsby-plugin-react-helmet`,
  ],
};
