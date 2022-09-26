// This is for backend testing
import React, { useEffect, useState } from "react";
import { SpotifyAuth } from "react-spotify-auth";
import Cookies from "js-cookie";
import { SpotifyHandler } from "../api/SpotifyHandler";

import "react-spotify-auth/dist/index.css";

function Home() {
  const [data, setData] = useState();
  const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));

  useEffect(() => {
    const hash = window.location.hash;
    let token = Cookies.get("spotifyAuthToken");

    if (hash) {
      token = hash //estrapola il token dall'url
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location = "/test";

      Cookies.set("spotifyAuthToken", token);
    }

    fetch("/api/v1/users")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  function aggiungiGeneriInteressati() {
    var coso = new SpotifyHandler(token);
    coso.addIntrestedToGender(4);
  }

  function aggiungiGeneri() {
    var coso = new SpotifyHandler(token);
    coso.addUserGenres();
  }

  function registraUtente() {
    var coso = new SpotifyHandler(token);
    coso.registerUser("b", 2);
  }

  function setMatch() {
    var coso = new SpotifyHandler(token);
    coso.setMatch(52, true);
  }

  return (
    <div>
      {token ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button onClick={registraUtente}>Registra utente</button>
          <button onClick={aggiungiGeneriInteressati}>
            Aggiungi genere interessato
          </button>
          <button onClick={aggiungiGeneri}>
            Aggiungi i generi dell'utente
          </button>
          <button onClick={setMatch}>
            match
          </button>
        </div>
      ) : (
        <SpotifyAuth
          onAccessToken={(token) => {
            setToken(token);
          }}
          redirectUri="http://localhost:3000/test"
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

      {data ? (
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
      )}
    </div>
  );
}
export default Home;
