import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import styled from "@emotion/styled"

import Form from './form'
import { rhythm } from "../utils/typography"
import "./layout.css"

const Header = styled.header`
  ${({ fullHeight }) =>
    fullHeight &&
    css`
      display: flex;
      flex-direction: column;
      height: 100vh;
      justify-content: center;
    `
  }
`

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <Form altDisposition={location.pathname === rootPath} />
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: "Times New Roman",
            marginTop: 0,
            fontWeight: "600",
            letterSpacing: "-1.5px",
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${location.pathname === rootPath ? '0' : '' } ${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Header fullHeight={location.pathname === rootPath}>{header}</Header>
        <main>{children}</main>
        <footer>
          {location.pathname !== rootPath && <Form />}
          © {new Date().getFullYear()}, by
          {` `}
          <a href="https://twitter.com/hellotypeof" target="blank_">typeof</a>
        </footer>
      </div>
    )
  }
}

export default Layout
