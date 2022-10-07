import React, { useEffect, useState } from "react";
import { SpotifyHandler } from "../api/SpotifyHandler";
import { creation } from "../utils/CreationHandler";
import Cookies from "js-cookie";
import CheckBox from "../components/CheckBox";
import "../styles/Register.css";
function Register() {
  const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
  const [genders, setGenders] = useState([]);

  const [username, setUsername] = useState([]);
  const [gender, setGender] = useState([]);
  const [intrestedGender, setIntrestedGender] = useState([]);

  // that's used to determine whether or not the user selected at least an intrested gender
  const [intrestedGenderCounter, setintrestedGenderCounter] = useState(0);

  const [spotifyHandler, setSpotifyHandler] = useState();

  function aggiungiGeneriInteressati() {
    spotifyHandler.addIntrestedToGender(intrestedGender);
  }

  function aggiungiGeneri() {
    spotifyHandler.addUserGenres();
  }

  function registraUtente() {
    spotifyHandler.registerUser(username, gender);
  }
  function aggiungiTopArtisti() {
    spotifyHandler.addUserArtists();
  }

  function aggiungiTopCanzoni() {
    spotifyHandler.addUserSongs();
  }

  // add error handler: https://reactjs.org/docs/faq-ajax.html
  useEffect(() => {
    fetch("/api/v1/genders")
      .then((res) => res.json())
      .then((result) => {
        setGenders(result);
      });

    creation();

    setSpotifyHandler(new SpotifyHandler(token));
  }, [token]);

  // this sends the user informations to the server(if the user checked all the infos)
  function injector() {
    if (intrestedGenderCounter > 0) {
      try {
        registraUtente();
        aggiungiGeneriInteressati();
        aggiungiGeneri();
        aggiungiTopCanzoni();
        aggiungiTopArtisti();

        // window.location = "home";
      } catch (error) {
        alert("dai");
      }
    } else {
      alert("Complete all the parameters first!");
    }
  }

  // tests all the parameters to submit
  function testingParameters() {
    console.log("Injected parameters: ", gender, username, intrestedGender);
    console.log(
      "Injected parameters types: ",
      typeof gender,
      typeof username,
      typeof intrestedGender
    );
    console.log(intrestedGenderCounter);
  }

  return (
    <div className="Register">
      <div className="RegistrationHeader">
        <h1>MusicalTwin</h1>
      </div>

      {/* onsubmit */}
      <form
        className="RegisterForm"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="UselessDiv">
          <header className="Registration">
            <h1>Sign Up</h1>
            <p>Give us your information dai</p>
          </header>
          <br></br>

          <div className="InputField">
            {/* username */}

            <input
              className="form-input"
              type="text"
              value={username}
              placeholder="Your name"
              onChange={(e) => setUsername(e.target.value)}
              required
            ></input>
            <br></br>

            {/* <h1 className="FormText">Select your gender:</h1> */}
            {/* Gender of the user */}
            <select
              className="UserGenderSelector"
              required
              defaultValue="ListHeader"
              onChange={(e) => {
                genders.map((selfgender) => {
                  if (e.target.value === selfgender.name) {
                    return setGender(selfgender.id);
                  }
                  return null;
                });
              }}
            >
              <option
                style={{ fontFamily: "arial" }}
                value="ListHeader"
                disabled
              >
                Select your gender
              </option>
              {/* for each element in the list, a selectable option is made */}
              {genders.length > 0 ? (
                genders.map((selfgender) => (
                  <option
                    key={selfgender.id}
                    value={selfgender.name}
                    className="optionTile"
                  >
                    {selfgender.name}
                  </option>
                ))
              ) : (
                <option>Il server è down, spiace</option>
                //   window.location = "/error" nva
              )}
            </select>
            {/* interested gender */}
            <h1 className="FormText">Select what you like:</h1>
            {genders.length > 0
              ? genders.map((gender) => (
                  <div className="CheckContainer" key={gender.id}>
                    <div>
                      <CheckBox
                        type="checkbox"
                        id={gender.id.toString()}
                        value={gender.name}
                        onChange={(e) => {
                          var tempList = [...intrestedGender];
                          // if it's present, jt gets deleted
                          if (tempList.includes(gender.id)) {
                            tempList.splice(tempList.indexOf(gender.id), 1);
                            setintrestedGenderCounter(
                              intrestedGenderCounter - 1
                            );
                          } else {
                            // if it's not, it gets added
                            setintrestedGenderCounter(
                              intrestedGenderCounter + 1
                            );
                            tempList.push(gender.id);
                          }
                          setIntrestedGender(tempList);
                        }}
                      />
                      <label className="FormCheckbox" htmlFor={gender.id}>
                        {gender.name}
                      </label>
                    </div>
                  </div>
                ))
              : console.log("Can't load genders yet")}

            {/* username */}
          </div>
          {/* call */}
          <input
            type="submit"
            onClick={injector}
            className="SubmitForm"
            value="Submit"
          ></input>
        </div>
      </form>
    </div>
  );
}

export default Register;
