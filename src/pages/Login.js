import React, { useEffect, useState } from "react";
import { SpotifyAuth } from "react-spotify-auth";
import Cookies from "js-cookie";
import { SpotifyHandler } from "../api/SpotifyHandler";
import { CreationHandler } from "../utils/CreationHandler";

import Button from "@mui/material/Button";
import "react-spotify-auth/dist/index.css";

function Login() {
  const [data, setData] = useState();
  const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));

  useEffect(() => {
    const hash = window.location.hash;
    let token = Cookies.get("spotifyAuthToken");
    let creation = Cookies.get("creationDate");

    if (hash) {
      creation = Date.now();
      token = hash //estrapola il token dall'url
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location = "/login";

      Cookies.set("spotifyAuthToken", token);
      Cookies.set("creationDate", creation);
    }
  }, []);

  if (token) {
    window.location = "/home";
  }

  return (
    <div className="LoginPage">
      <h1 className="Title center">MusicalTwin</h1>
      <h2 className="Slogan center">
        Find someone with the same musical taste as yours.
      </h2>

      {/* <Button variant="outlined">Test material</Button> */}

      {token ? (
        // se c'è il token si vedrà il div, altrimenti spotifyAuthToken
        <div></div>
      ) : (
        //  Spotify login button

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
