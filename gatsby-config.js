module.exports = {
  siteMetadata: {
    url: "//addressless.co.uk",
    title: `Upside Down & Addressless`,
    description: `Hi there! We're Adrian and Dina. Two people who decided that the best
    way to get from London to Amsterdam was via New Zealand. On this site
    we documented more examples of our excellent sense of direction as we
    exchanged the Underground for a campervan, deadlines for path signs
    and bills for Bilbo.`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
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
  ]
};
