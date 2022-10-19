import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { creation } from "../utils/CreationHandler";
import { SpotifyHandler } from "../api/SpotifyHandler";
// import "../styles/Home.css";
import MatchingPart from "../components/MatchingPart";
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {
  const token = Cookies.get("spotifyAuthToken");
  const [loading, setLoading] = useState(true);
  const [db, setDb] = useState([]);

  const firstTime = Cookies.get("firstTime");

  useEffect(() => {
    if (token) {
      if (firstTime === undefined) {
        alert("Right --> Match\nLeft or whatever --> Refuse");
        Cookies.set("firstTime", false);
      }
      const coso = new SpotifyHandler(token);

      coso.getRecommendations().then((res) => {
        setDb(res);
        setLoading(false);
      });
    }

    creation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Home">
      {!loading ? <MatchingPart db={db} /> : <LoadingSpinner />}
      {/* <LoadingSpinner /> */}
    </div>
  );
}
export default Home;
