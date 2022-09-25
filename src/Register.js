import React, { useEffect, useState } from "react";
import { SpotifyHandler } from "./api/SpotifyHandler";
import {creation} from "./CreationHandler";

import Button from "@mui/material/Button";
import "react-spotify-auth/dist/index.css";

function Register() {
  
    useEffect(() => {
        creation();
      },[]);

  return (
    
    <div></div>
  );
}

export default Register;
