import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <img
          src="https://s3-alpha-sig.figma.com/img/3056/c7bb/e7efb0d3d71dcb5062f1e077527d7f5d?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=D0N7yfdFSkIzESelc3yzRmTR7V9rd02iN~bHyPyDGXvYkY4eIiNQTyM2xbwFPTGNW1haEerPPxrUkeUIovX1NFg8hVcUCSO1o95BYaHJgbzGqDNHoiFAMij6njtZrZqCOgPwMQn-f9a05BCgRsFEUBoCPQ92hIFs79UMQBhWCbXT9HUa5NPGGnQyLzdsVz0ZH3BgTbFk4-WtrvdzgqP2XM0OuWRReehW1zt6H5ktxjg4lT1eHrPUrk2K-MlvhPOKKNQ0oEb7hpA9ZMYeGm1tOrO1Rz6Uje-fhbaNmiPQPgDhOzgQAeWrQg9od~Zj6D-a3K0qqlI8XpmE9YqmqBQtVw__"
          alt="bookImage"
          className="image2"
        />

        <div className="card2">
          <form className="form-container" onSubmit={this.submitForm}>
            <img
              src="data:image/png;base64,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"
              className="form-website-logo"
              alt="website logo"
            />
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>

            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
