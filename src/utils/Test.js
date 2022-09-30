// This is for backend testing
import React, { useEffect, useState } from "react";
import { SpotifyAuth } from "react-spotify-auth";
import Cookies from "js-cookie";
import { SpotifyHandler } from "../api/SpotifyHandler";

import "react-spotify-auth/dist/index.css";

function Home() {
  const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
  const [genders, setGenders] = useState([]);
  const [intrestedGender, setIntrestedGender] = useState([]);

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

    fetch("/api/v1/genders")
      .then((res) => res.json())
      .then((result) => setGenders(result));

    // useful when editing profile
    fetch("/api/v1/interested-in/21u4ax3hxvenml3p7kdvrjlba")
      .then((res) => res.json())
      .then((result) => {
        var list = [];
        result.map((obj) => {
          return list.push(obj.gender.id);
        });
        setIntrestedGender(list);
      });
  }, []);

  function aggiungiGeneriInteressati(list) {
    var coso = new SpotifyHandler(token);
    return coso.addIntrestedToGender(list);
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
    coso.setMatch(2, true, "31ypjzitriimy4b2fhfhu5enh4w4");
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
          <button onClick={setMatch}>match</button>
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (intrestedGender > 0) {
            aggiungiGeneriInteressati(intrestedGender);
          } else {
            alert("o zio ma cosa sei asessuale? che schifo ");
          }
        }}
      >
        {genders.length > 0
          ? genders.map((gender) => (
              <div className="CheckContainer" key={gender.id}>
                <div>
                  {/* fix checkbox required with script https://stackoverflow.com/questions/22238368/how-can-i-require-at-least-one-checkbox-be-checked-before-a-form-can-be-submitte*/}
                  <input
                    className="FormCheckbox"
                    type="checkbox"
                    id={gender.id}
                    value={gender.name}
                    checked={intrestedGender.includes(gender.id)}
                    onChange={(e) => {
                      var tempList = [...intrestedGender];
                      if (tempList.includes(gender.id)) {
                        tempList.splice(tempList.indexOf(gender.id), 1);
                      } else {
                        tempList.push(gender.id);
                      }
                      setIntrestedGender(tempList);
                    }}
                  />
                  <label className="FormCheckbox" htmlFor={gender.id}>
                    {gender.name}
                  </label>
                </div>
              </div>
            ))
          : // <input type="checkbox"/>
            console.log("morte")}
        <input type="submit" value="mario" />
      </form>
    </div>
  );
}
export default Home;
