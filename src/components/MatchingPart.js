import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import "../styles/Home.css";
import Card from "react-bootstrap/Card";
import { SpotifyHandler } from "../api/SpotifyHandler";
import Cookie from "js-cookie";
import Button from "react-bootstrap/Button";
import BackDrop from "@mui/material/Backdrop";

const MatchingPart = (props) => {
  const [empty, setEmpty] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [matchedUser, setMatchedUser] = useState({
    user: {
      username: "Loading",
    },
  });

  var db = props.db;
  db = [].concat(db).reverse();

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
      if (itsAMatch === true) {
        setMatchedUser(obj);
        setMatchFound(true);
      }
    } else {
      await setMatch(obj.id, false);
    }
  }

  return (
    <>
      <BackDrop
        open={matchFound}
        sx={{
          width: "100wh",
          height: "100vh",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 12,
          backgroundColor: "rgba(40, 41, 39, 0.92)",
        }}
      >
        <div>
          <h1 style={{ textAlign: "center", fontSize: "70px" }}>
            It's a match!
          </h1>
          <p style={{ textAlign: "center" }}>
            <b
              style={{ color: "#01b34e", fontWeight: "bold", fontSize: "40px" }}
            >
              You
            </b>{" "}
            and{" "}
            <b
              style={{ color: "#01b34e", fontWeight: "bold", fontSize: "40px" }}
            >
              {matchedUser.user.username}
            </b>{" "}
            like each other
          </p>
          <div
            style={{
              width: "fit-content",
              margin: "auto",
            }}
          >
            <Button
              variant="primary"
              color="#01b34e"
              onClick={() =>
                window.open(
                  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              style={{
                marginRight: "2px",
                backgroundColor: "#01b34e",
                borderColor: "#01b34e",
                textAlign: "center",
              }}
            >
              Their social
            </Button>
            <Button
              variant="primary"
              onClick={() => setMatchFound(false)}
              style={{
                marginLeft: "2px",
                backgroundColor: "#01b34e",
                borderColor: "#01b34e",
                textAlign: "center",
              }}
            >
              Keep swiping
            </Button>
          </div>
        </div>
      </BackDrop>
      {db && db.length && !empty ? (
        <div className="cardContainer">
          {db.map((obj, index) => {
            return (
              <TinderCard
                key={obj.user.id}
                onSwipe={(direction) => {
                  swipe(direction, obj);
                  if (index + 1 === 0) {
                    setEmpty(true);
                  }
                }}
                className="cardOverlay"
              >
                <Card className="card">
                  <Card.Body>
                    <Card.Img
                      src="./stock.jpg"
                      variant="top"
                      className="cardImage"
                    />
                    <Card.Title
                      style={{ fontWeight: "bold", marginTop: "4px" }}
                    >
                      {obj.user.username}
                    </Card.Title>
                    <Card.Subtitle>{obj.user.gender.name}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </TinderCard>
            );
          })}
        </div>
      ) : (
        <div className="alreadySeenError">
          <h1>You have already seen all users avaible.</h1>
          <Button variant="primary" size="lg">
            Do something
          </Button>
        </div>
      )}
    </>
  );
};

export default MatchingPart;
