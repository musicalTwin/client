import React, { useEffect, useState } from "react";
import { SpotifyAuth } from "react-spotify-auth";
import Cookies from "js-cookie";
import { SpotifyHandler } from "./api/SpotifyHandler";

import Button from '@mui/material/Button';
import "react-spotify-auth/dist/index.css";

function Home() {
  const [data, setData] = useState();
  const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));

  useEffect(() => {
    const hash = window.location.hash;
    let token = Cookies.get("spotifyAuthToken");

    if (!token && hash) {
      token = hash //estrapola il token dall'url
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";

      Cookies.set("spotifyAuthToken", token);
    } else if (token) {
      var spotifyObj = new SpotifyHandler(token);
      spotifyObj.addToDatabase();
    }

    fetch("/api/v1/users")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);


  //  jsx output
  return (
    <div className="Homepage">

      <h1 className="Title center">MusicalTwin</h1>
      <h2 className="Slogan center">Find someone with the same musical taste as yours.</h2>

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

      {/* {data ? (
        data.map((obj) => {
          return (
            <div key={obj.id}>
              <h1>Nome: {obj.username}</h1>
              <h1>Id: {obj.id}</h1>
              <h1>Sesso: {obj.gender.id}</h1>
            </div>
          );
        })
      ) : (
        <h1>Coglione</h1>
      )} */}
    </div>
  );
}
export default Home;
