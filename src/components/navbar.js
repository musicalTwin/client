import React from "react";
import "../styles/Navbar.css";

const NavBar = () => {
  return (
    <div className="Navbar">
      <ul className="NavMain">
         <li className="NavContent">
          <a href="https://github.com/aleeeee1" target="_blank" rel="noreferrer">
            Ale1
          </a>
        </li>
         <li className="NavContent">
          <a
            href="https://github.com/derialdavi"
            target="_blank"
            rel="noreferrer"
          >
            DerialDavi
          </a>
        </li>
         <li className="NavContent">
          <a href="https://github.com/zubbyy" target="_blank" rel="noreferrer">
            Zubby
          </a>
        </li>
         <li className="NavContent right">
          <a
            href="https://github.com/musicalTwin"
            target="_blank"
            rel="noreferrer"
          >
            Repo
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
