module.exports = {
  siteMetadata: {
    title: `growthnotes`,
    author: `PACDIV`,
    description: `My personal notes to help you to build an audience as a developer.`,
    siteUrl: `https://growthnotes.dev/`,
    social: {
      twitter: `pacdiv_io`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_GROWTHNOTES_SITE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `growthnotes`,
        short_name: `growthnotes`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#222222`,
        display: `minimal-ui`,
        icon: `content/assets/growthnotes-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-emotion`,
  ],
}
