import React, { useEffect, useState } from "react";
import "../styles/Register.css";
import CheckBox from "../components/CheckBox";
import NavBar from "../components/navbar";

function Register() {
  const [genders, setGenders] = useState([]);
  const [gender, setGender] = useState([]);

  const [intrestedGender, setIntrestedGender] = useState([]);
  const [intrestedGenderCounter, setintrestedGenderCounter] = useState(0);

  useEffect(() => {
    fetch("/api/v1/genders")
      .then((res) => res.json())
      .then((result) => {
        setGenders(result);
      });

    // creation();

    // setSpotifyHandler(new SpotifyHandler(token)) ;
  }, []);
  return (
    <div className="">
      <NavBar />

      <div className="RegisterContainer">
        <div className="RegisterTextContainerWrapper">
          <div className="RegisterTextContainer">
            <h1 className="RegisterMainText">Dai zio dacci le tue informazioni</h1>
          </div>
        </div>
        <div className="RegisterFormContainer">
          <form
            action=""
            className="RegisterSingIn-Form"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target.elements);
            }}
          >
            <div className="RegisterInput-Row">
              <div className="RegisterName-Input">
                <label htmlFor="name-input" className="Registername-input-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name-input"
                  placeholder="Insert your name..."
                  className="Registername-input"
                />
              </div>
              <div className="RegisterUser-Gender-Input">
                <label
                  htmlFor="user-gender-input"
                  className="Registeruser-gender-input-label"
                >
                  Your gender
                </label>
                <select
                  className="RegisterUserGenderSelector"
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
                    className="RegisteroptionTile"
                  >
                    Select your gender
                  </option>
                  {/* for each element in the list, a selectable option is made */}
                  {genders.length > 0 ? (
                    genders.map((selfgender) => (
                      <option
                        key={selfgender.id}
                        value={selfgender.name}
                        className="RegisteroptionTile"
                      >
                        {selfgender.name}
                      </option>
                    ))
                  ) : (
                    <option>Il server è down, spiace</option>
                    //   window.location = "/error" nva
                  )}
                </select>
              </div>
            </div>
            <div className="RegisterInput-Row">
              <div className="RegisterUser-InterestedIn-Gender">
                <label
                  htmlFor="user-gender-input"
                  className="Registeruser-gender-input-label"
                >
                  Interested into
                </label>
                {genders.length > 0
                  ? genders.map((gender) => (
                      <div className="RegisterCheckContainer" key={gender.id}>
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
                          <label
                            className="RegisterFormCheckbox"
                            htmlFor={gender.id.toString()}
                          >
                            {gender.name}
                          </label>
                        </div>
                      </div>
                    ))
                  : console.log("Can't load genders yet")}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
