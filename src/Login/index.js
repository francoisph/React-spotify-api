import React, { Component } from "react";
import jsonp from "jsonp";
import axios from "axios";
import {
  webApiURL,
  client_id,
  client_secret,
  profileURL
} from "../spotifyURL";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "React Spotify",
      authToken: "",
      authorized: false,
      profile: []
    };
  }

  componentDidMount = () => {
    let url = window.location.href;
    if (url.indexOf("token=") > -1) {
      let authToken = url
        .split("token=")[1]
        .split("&")[0]
        .trim();
      let authorized = true;
      this.setState({ authToken, authorized });
      let user;
      axios
        .get(profileURL + authToken)
        .then(response => {
            this.setState({ profile: response.data });
            user = response.data;
        })
        .then(() => {
            this.props.history.push('/artistSearch', { current_user: { user }, auth: { authToken } });
            // window.location.assign(webApiURL);
          })
        .catch(error => {
            console.log(error);
            window.location.assign(webApiURL);
        });
    }
  };

  handleAuthFlow = event => {
    event.preventDefault();
    window.location.assign(webApiURL);
  };

  render() {
    return (
      <div className="container mt-5">
      <div className="row mt-5 justify-content-center">
        <div className="col-lg-2">
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={this.handleAuthFlow}
            >
              {"Login with Spotify"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
