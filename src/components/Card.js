import React from "react";
import "../styles/Card.css";
import { SpotifyHandler } from "../api/SpotifyHandler";

function Card(props) {
  return (
    <div className="Card">
      {props.img}
      <div className="User-Info">
        <h1 className="User-Name">{props.obj.user.username}</h1>
        <h2 className="User-Gender">{props.obj.user.gender.name}</h2>
      </div>
    </div>
  );
}

export default Card;
