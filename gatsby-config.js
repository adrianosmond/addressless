module.exports = {
  siteMetadata: {
    title: `Upside Down & Addressless`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Lato\:300,300i,700`,
          `Playfair+Display\:400,700` // you can also specify font weights and styles
        ]
      }
    }
  ],
};