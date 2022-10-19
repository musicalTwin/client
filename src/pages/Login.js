import React, { useEffect, useState } from "react";
import { SpotifyAuth } from "react-spotify-auth";
import Cookies from "js-cookie";
import { SpotifyHandler } from "../api/SpotifyHandler";
import { CreationHandler } from "../utils/CreationHandler";

import "react-spotify-auth/dist/index.css";
// import "../styles/Login.css";

function Login() {
  const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
  const [userid, setUserId] = useState([]);
  // let userid = "7prmvt3cwczea28e1ymxy5u97";

  // retrives token and adds data to cookies
  useEffect(() => {
    const hash = window.location.hash;
    let token = Cookies.get("spotifyAuthToken");
    let creation = Cookies.get("creationDate");

    if (hash) {
      creation = Date.now();
      token = hash //retrieves the token from the url
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location = "/login";

      Cookies.set("spotifyAuthToken", token);
      Cookies.set("creationDate", creation);
    }
  }, []);

  // checks if the user already registered in the database,
  // if not it gets redireted to the registration page
  useEffect(() => {
    if (token) {
      const coso = new SpotifyHandler(token);
      coso.getId().then((userObj) => setUserId(userObj));
    }
    if (token && typeof userid == "string") {
      console.log("User:", typeof userid, userid);
      try {
        fetch(`api/v1/users/${userid}`)
          .then((res) => res.json())
          .then((data) => {
            try {
              if (data.id == null) {
                console.log("User does not exist");
                window.location = "/register";
              } else {
                console.log("user already exists");
                window.location = "/home";
              }
            } catch (error) {
              console.log("user does not easdxist");
              window.location = "/register";
            }
          });
      } catch (error) {
        console.log("error");
      }
      // window.location = "/home";
    }
  });

  return (
    <div className="LoginPage">
      <h1 className="Title center">Musical Twin</h1>
      <h2 className="Slogan center">
        Find someone with the same musical taste as yours.
      </h2>

      {token ? (
        // if there's a token it shows the div, otherwise it shows the button
        <div></div>
      ) : (
        //  SpotifyAuth login button

        <div className="AuthButtonContainer">
          <SpotifyAuth
            btnClassName="AuthButton"
            onAccessToken={(token) => {
              setToken(token);
            }}
            redirectUri="http://localhost:3000/login"
            clientID="4a8a038032414b9a8c7ca838266cc689"
            scopes={[
              "user-top-read",
              "user-read-private",
              "user-read-playback-state",
              "user-modify-playback-state",
              "playlist-read-private",
              "user-library-read",
            ]}
          />
        </div>
      )}
    </div>
  );
}
export default Login;
