/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

class Bio extends React.PureComponent {
  state = {
    twitterUrl: ''
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      this.setState({
        twitterUrl:
          `https://twitter.com/intent/tweet?url=${window.location.href}&via=pacdiv_io`,
      })
    }
  }

  render () {
    const data = useStaticQuery(graphql`
      query BioQuery {
        avatar: file(absolutePath: { regex: "/profile.jpg/" }) {
          childImageSharp {
            fixed(width: 50, height: 50) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        site {
          siteMetadata {
            author
          }
        }
      }
    `)

    const { author } = data.site.siteMetadata
    return (
      <div
        style={{
          display: `flex`,
          marginBottom: rhythm(2.5),
        }}
      >
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt={author}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            minWidth: 50,
            borderRadius: `100%`,
          }}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
        <p>
          Notes from my journey to build an audience as a developer
          <br />– By <strong>{author}</strong>
          {` | `}
          <a
            className="colored-link"
            href={this.state.twitterUrl}
            target="blank_"
          >
            Let’s talk about this on Twitter
          </a>
        </p>
      </div>
    )
  }
}

export default Bio
