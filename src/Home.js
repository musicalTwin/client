import React, { useEffect, useState } from "react";
import { SpotifyAuth } from "react-spotify-auth";
import Cookies from "js-cookie";
import { SpotifyHandler } from "./api/SpotifyHandler";

import Button from "@mui/material/Button";
import "react-spotify-auth/dist/index.css";

function Home() {
  const [data, setData] = useState();
  const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));

  useEffect(() => {
    fetch("/api/v1/users")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="Homepage">
      <h1 className="Title center">MusicalTwin</h1>
      <h2 className="Slogan center">
        Find someone with the same musical taste as yours.
      </h2>

      {/* <Button variant="outlined">Test material</Button> */}

      {token ? (
        <div></div>
      ) : (
        //  Spotify login button
        <SpotifyAuth
          onAccessToken={(token) => {
            setToken(token);
          }}
          redirectUri="http://localhost:3000/home"
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
      )}
    </div>
  );
}
export default Home;
