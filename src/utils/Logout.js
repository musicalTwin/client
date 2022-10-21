import Cookies from "js-cookie";

export function Logout() {
    console.log("See you, space cowboy")
    Cookies.remove("spotifyAuthToken");
    Cookies.remove("creationDate");
    window.location = "/login";

}