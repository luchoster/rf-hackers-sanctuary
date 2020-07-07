require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: `RF Hackers Sanctuary`,
    description: `RF Hackers Sanctuary`,
    author: `@luchoster`
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-transition-link`,
    {
      resolve: 'gatsby-theme-luchoster-base'
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'rzqff1kc',
        dataset: 'production',
        watchMode: false
        // token: process.env.GATSBY_SANITY_TOKEN
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'RF Hackers Sanctuary',
        short_name: 'RF Hackers',
        icon: 'src/assets/img/logo-small.png', // This path is relative to the root of the site.
        start_url: '/',
        background_color: '#00adee',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#00adee'
      }
    },
    `gatsby-plugin-offline`
  ]
}
