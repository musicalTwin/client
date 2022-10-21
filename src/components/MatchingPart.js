import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import "../styles/Home.css";
import { SpotifyHandler } from "../api/SpotifyHandler";
import Cookie from "js-cookie";
import Button from "react-bootstrap/Button";
import BackDrop from "@mui/material/Backdrop";
import Card from "./Card";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { LoremPicsum } from "react-lorem-picsum";

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

  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  async function swiped(direction, obj, index) {
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
    updateCurrentIndex(index - 1);
  }

  const outOfFrame = (idx) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  var coso = new SpotifyHandler(Cookie.get("spotifyAuthToken"));

  async function setMatch(cardId, match, userId) {
    await coso.setMatch(cardId, match);
  }

  return (
    <div className="MatchingPart">
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
            var img = (
              <LoremPicsum
                width={360}
                height={300}
                random={index}
                className="User-Image"
              />
            );

            return (
              <div className="cardOverlay" key={obj.user.id}>
                <TinderCard
                  key={obj.user.id}
                  onSwipe={(direction) => {
                    swiped(direction, obj, index);
                    if (index + 1 === 0) {
                      setEmpty(true);
                    }
                  }}
                  ref={childRefs[index]}
                  onCardLeftScreen={() => outOfFrame(index)}
                  className="tinder-card"
                >
                  <Card obj={obj} img={img} />
                </TinderCard>
              </div>
            );
          })}
          <div className="buttonRowWrapper">
            <div className="buttonRow">
              <button className="home-btn" onClick={() => swipe("left")}>
                <i
                  className="fa-solid fa-xmark"
                  style={{ color: "white", fontSize: "34px" }}
                ></i>
              </button>
              <button className="home-btn" onClick={() => swipe("right")}>
                <i
                  className="fa-solid fa-check"
                  style={{ color: "white", fontSize: "34px" }}
                ></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="alreadySeenError">
          <h1>You have already seen all users avaible.</h1>
          <Button variant="primary" size="lg">
            Do something
          </Button>
        </div>
      )}
    </div>
  );
};

export default MatchingPart;
