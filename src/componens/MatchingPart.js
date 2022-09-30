import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import "../styles/Home.css";
import Card from "react-bootstrap/Card";
import { SpotifyHandler } from "../api/SpotifyHandler";
import Cookie from "js-cookie";

const MatchingPart = (props) => {
  var db = props.db;
  db = [].concat(db).reverse();

  console.log(db);
  var coso = new SpotifyHandler(Cookie.get("spotifyAuthToken"));

  async function setMatch(cardId, match, userId) {
    await coso.setMatch(cardId, match);
  }

  async function swipe(direction, obj) {
    if (direction === "left") {
      await setMatch(obj.id, false);
    } else if (direction === "right") {
      await setMatch(obj.id, true);

      var itsAMatch = await coso.checkIfMatched(obj.user.id);
      console.log(itsAMatch);
      if (itsAMatch === true) {
        alert("non ci possoc redere zio ha itrovato l;'amore della tua vita");
      } else {
        console.log("Non è un match");
      }
    } else {
      console.log("Il bro ha ?? what", direction);
    }
  }

  return (
    <div className="cardContainer">
      {db.map((obj, index) => {
        return (
          <TinderCard
            key={obj.user.id}
            onSwipe={(direction) => swipe(direction, obj)}
            className="cardOverlay"
          >
            <Card className="card">
              <Card.Body>
                <Card.Img
                  src="./stock.jpg"
                  variant="top"
                  className="cardImage"
                />
                <Card.Title>{obj.user.username}</Card.Title>
              </Card.Body>
            </Card>
          </TinderCard>
        );
      })}
    </div>
  );
};

export default MatchingPart;
