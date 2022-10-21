import React from "react";
import "../styles/Card.css";

function Card(props) {
  // console.log(props.obj);
  return (
    <div className="Card">
      <h1 className="User-Name">{props.obj.user.username}</h1>
    </div>
  );
}

export default Card;
