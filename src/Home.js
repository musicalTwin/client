import React, { useEffect, useState } from "react";
import { SpotifyAuth } from "react-spotify-auth";
import Cookies from "js-cookie";
import {creation} from "./CreationHandler";

import Button from "@mui/material/Button";

function Home() {

  useEffect(() => {
    // let creation = Cookies.get("creationDate");
    // let token = Cookies.get("spotifyAuthToken");

    // creation = parseInt(creation);
    

    // if(creation != null){

    //   if(Date.now() - creation > 3600000) {
    //     alert("token più vecchio di un'ora");
    //     Cookies.remove("creationDate"     ,{path:'/'});
    //     Cookies.remove("spotifyAuthToken", {path:'/'});
    //     window.location = "/login";
    //   }
      
    // }
    creation();
    
  },[]);

  return(
    <div className="Homepage">
      <div className="messages">
        
      </div>
      <div className="swipeCard">

      </div>
    </div>
  );

}
export default Home;
