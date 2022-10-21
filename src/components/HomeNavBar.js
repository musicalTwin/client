import React from "react";
import "../styles/HomeNavbar.css";
import {Logout} from "../utils/Logout";


const HomeNavBar = (props) => {
  return (
    <div className="Navbar">
      <ul className="HomeNavMain">
        
         <li className="HomeNavContent">

          
          <img src={props.img} alt="" className="profilepicture" onClick={() => alert("(not) coming soon")} />
        </li>
        
         <li className="HomeNavContent">
          <a>
            {props.name}
          </a>
        </li>
         <li className="HomeNavContent right">
          <a
            onClick={Logout}
            className="HomeNavLogout"
            
          >
            Logout
          </a>
        </li>
      </ul>

    </div>
    
  );
};

export default HomeNavBar;
