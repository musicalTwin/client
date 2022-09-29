import React, { useEffect, useState, useMemo, useRef } from "react";
import { SpotifyAuth } from "react-spotify-auth";
import Cookies from "js-cookie";
import { creation } from "../utils/CreationHandler";
import { SpotifyHandler } from "../api/SpotifyHandler";
// import "../styles/Home.css";
import MatchingPart from "../componens/MatchingPart";

import Button from "@mui/material/Button";

function Home() {
  const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
  const [db, setDb] = useState([{}]);

  useEffect(() => {
    let token = Cookies.get("spotifyAuthToken");

    if (token) {
      setToken(token);
      const coso = new SpotifyHandler(token);
      // coso.proPic("7prmvt3cwczea28e1ymxy5u97").then(userProfilePicture => console.log(userProfilePicture));
      // coso.getUsers().then((users) =>
      //   // users.map((user) => {
      //   //   // console.log(user.id) returns every user in the database no
      //   //   coso
      //   //     .proPic(user.id)
      //   //     .then((userProfilePicture) => console.log(userProfilePicture));
      //   })
      // );
      coso.getRecommendations().then((res) => {
        res.json().then((obj) => {
          setDb(obj);
        });
      });
    }

    creation();
  }, []);

  return (
    <div className="Home">
      {db.length > 1 ? <MatchingPart db={db} /> : <h1>Loading </h1>}
    </div>
  );
}
export default Home;
