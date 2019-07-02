import React from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import "whatwg-fetch"

const Container = styled.div`
  margin-bottom: 2em;

  ${({ altDisposition }) =>
    altDisposition &&
    css`
      margin-bottom: 0;
    `
  }
`

const StyledForm = styled.form`
  align-items: center;
  color: #222222;
  display: flex;
  flex-direction: column;
  justify-content: center;

  input {
    border: 0;
    padding: 0.5em 1em;
    text-align: center;
    width: 100%;

    &[type="email"] {
      border-radius: 4px 4px 0 0;

      ${({ containsErrors }) =>
        containsErrors &&
        css`
          border: 2px solid red;
        `}
    }

    &[type="submit"]  {
      background-color: #ffe70b;
      border-radius: 0 0 4px 4px;
    }
  }

  @media (min-width: 700px) {
    justify-content: flex-start;
    flex-direction: row;

    input {
      &[type="email"] {
        border-radius: 4px 0 0 4px;
        text-align: left;
      }

      &[type="submit"] {
        border-radius: 0 4px 4px 0;
        width: 26em;
      }
    }
  }
`

const Title = styled.h3`
  ${({ withoutMarginTop }) =>
    withoutMarginTop &&
    css`
      margin-top: 0;
    `
  }
`

class Form extends React.Component {
  static emailingEndpoint = process.env.GATSBY_TYPEOF_BLOG_MAILING_ENDPOINT

  static isEmailAddressValid(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  }

  state = {
    apiError: false,
    localError: false,
    errorMessage: '',
    success: false,
    value: "",
  }

  formRef = React.createRef()

  onFieldChange = event => {
    this.setState({
      value: event.target.value,
    })
  }

  onSubmitClick = event => {
    event.preventDefault()

    const email = this.state.value.trim()

    if (Form.isEmailAddressValid(email)) {
      this.setState({ localError: false }, () => {
        fetch(Form.emailingEndpoint.concat('/', email))
          .then(({ status }) =>
            status === 200
              ? this.setFormAsSuccess()
              : this.setFormAsFailure()
          )
          .catch(this.setFormAsFailure)
      })

      return
    }

    this.setState({ localError: true })
  }

  setFormAsFailure = () => this.setState({ apiError: true })

  setFormAsSuccess = () => this.setState({ success: true })

  render() {
    const { altDisposition } = this.props
    const { apiError, localError, success, value } = this.state

    return (
      <Container altDisposition={altDisposition}>
        <Title withoutMarginTop={altDisposition}>You blog about JS? Join the discussion!</Title>
        <p>
          Are you struggling to reach an audience, to find ideas and time
          to write? Subscribe and join the discussion group to learn how
          to get rid of those and start building your audience.
        </p>
        {success ? (
          <p>
            We just sent you an email!
            <br />
            <small>(Please check my spam box, just in case)</small>
          </p>
        ) : (
          <StyledForm
            action={Form.emailingEndpoint}
            containsErrors={localError}
            method="POST"
            novalidate
            ref={this.formRef}
          >
            <input
              id="mce-EMAIL"
              name="EMAIL"
              onChange={this.onFieldChange}
              placeholder="Type here your email address"
              required
              value={value}
              type="email"
            />
            <input
              onClick={this.onSubmitClick}
              name="subscribe"
              value="Join the discussion"
              type="submit"
            />
          </StyledForm>
        )}
        {apiError ? (
          <p>
            An error has occurred. Please contact me at <a href="mailto:loic@pacdiv.co">loic@pacdiv.co</a>.
          </p>
        ) : (
          <small>*No spam and one-click unsubscribe.</small>
        )}
      </Container>
    )
  }
}
      
export default Form
