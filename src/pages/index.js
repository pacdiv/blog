import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Notes to build an audience as a developer" />
        <p style={{ textAlign: 'center' }}>
          <Link
            style={{ boxShadow: `none`, color: "#ead410", textDecoration: "underline" }}
            to="/blog"
          >
            Read the blog →
          </Link>
        </p>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
