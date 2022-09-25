import React, { useEffect, useState } from "react";
import { SpotifyHandler } from "./api/SpotifyHandler";
import {creation} from "./CreationHandler";
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
            .then(res => res.json())
            .then(
            (result) => {
                setGenders(result);
            },)
            
        
        creation();
        
      },[]);

   

    console.log(genders);
    


  return (
    
    // the LoginPage is set to have the same background as the original login page
    <div className="Register LoginPage">

    
        <div className="RegistrationForm">
            <div className="RegistrationHeader">
                <h1>Registration</h1>
            </div>
            <div className="InfoContainer">
                <div className="NickName">

                

                </div>
                <div className="photo"></div>
            </div>
            <div className="UserGenre">

                <select className="Selector">
                    {/* per ogni elemento nella lista, si fa un'opzione da selezionare */}
                    {genders.map(gender => (
                        <option key={gender.id} value={gender.name}>
                            {gender.name}</option>
                    ))}

                   
                </select>

            </div>
            <div className="Bio">
                
            </div>
            <div className="Instagram"></div>
        </div>
    </div>
  );
}





export default Register;
