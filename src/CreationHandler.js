import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
export function creation() {

    let creation = Cookies.get("creationDate");
    let token = Cookies.get("spotifyAuthToken");

    creation = parseInt(creation);

    // se c'è un token, controlla che non sia più vecchio di un'ora,
    // in caso rimanda a fare il login
    if (creation > 1) {

        if (Date.now() - creation > 3600000) {
            alert("token più vecchio di un'ora");
            Cookies.remove("creationDate", { path: '/' });
            Cookies.remove("spotifyAuthToken", { path: '/' });
            window.location = "/login";
        } else {
            console.log("Creation date: " + creation);
        }

    } else {
        // l'utente non è loggato
        window.location = "/login";
    }


}