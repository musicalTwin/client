import React, { useEffect, useState } from "react";
import { SpotifyHandler } from "./api/SpotifyHandler";
import { creation } from "./CreationHandler";
import Cookies from "js-cookie";

// await function GetGenders(){
//     const response = await fetch('/api/v1/genders');
//     const data = await response.json();
//     this.setState({ totalReactPackages: data.total })
// }

function Register() {
  const [genders, setGenders] = useState([]);

  // add error handler: https://reactjs.org/docs/faq-ajax.html
  useEffect(() => {
    fetch("/api/v1/genders")
      .then((res) => res.json())
      .then((result) => {
        setGenders(result);
      });

    creation();
  }, []);

  console.log(genders);

  return (

    // the LoginPage is set to have the same background as the original login page
    <div className="Register">
      
        <div className="RegistrationHeader">
            <h1>MusicalTwin</h1>
        </div>
        {/* onsubmit */}
        <form action="#" className="RegisterForm">

            <div className="UselessDiv">
                <header className="Registration">
                    <h1>Sign Up</h1>
                    <p>Give us your information dai</p>
                </header><br></br>

                <div className="InputField">

                    {/* username */}
                    
                    <input className="form-input" type="text" placeholder="Username" required></input><br></br>

                    {/* <h1 className="FormText">Select your gender:</h1> */}
                    {/* Gender of the user */}
                    <select className="UserGenderSelector">
                        <option value="" disabled selected>Select your gender</option>
                        {/* per ogni elemento nella lista, si fa un'opzione da selezionare */}
                        {genders.length > 0 ? (
                            genders.map((gender) => (
                            <option key={gender.id} value={gender.name} className="OptionColor">
                                {gender.name}
                            </option>
                            ))
                        ) : (
                            <option>Il server è down, spiace</option>
                        //   window.location = "/error" nva 
                        )}
                    </select>
                    {/* interested gender */}
                    <h1 className="FormText">Select what you like:</h1>
                    {genders.length > 0 ? (
                        genders.map((gender) => (
                            <div className="CheckContainer">
                                <div>
                                    {/* fix checkbox required with script https://stackoverflow.com/questions/22238368/how-can-i-require-at-least-one-checkbox-be-checked-before-a-form-can-be-submitte*/}
                                    <input className="FormCheckbox" type="checkbox" id={gender.id} value={gender.name}/>
                                    <label className="FormCheckbox" for={gender.id}>{gender.name}</label>
                                </div>
                            </div>
                            
                            ))
                    ) : (
                        // <input type="checkbox"/>
                        console.log("morte")
                    )}

                    {/* username */}
                    
                    {/* <input className="SocialInput" type="text" title="ex. https://www.instagram.com/francescototti/" placeholder="Socials" required></input><br></br> */}

                    


                </div>

            
            <input type="submit" className="SubmitForm" value="Submit"></input>
            </div>
        
        </form>
            
    </div>
  );
}

export default Register;
