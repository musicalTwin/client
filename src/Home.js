import React, { useEffect, useState } from "react";
import { SpotifyAuth } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";

function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("/api/v1/users")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <SpotifyAuth
        redirectUri="http://localhost:5000/callback"
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
