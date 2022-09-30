import Spotify from "spotify-web-api-js";
import Cookie from "js-cookie";

export class SpotifyHandler {
  constructor(token) {
    this.spotify = new Spotify();
    this.spotify.setAccessToken(token);
  }

  async getId() {
    var userId = Cookie.get("userId");
    if (userId === undefined) {
      var userObj = await this.spotify.getMe();
      userId = userObj.id;
      Cookie.set("userId", userId);
    }
    return userId;
  }

  async proPic(userId) {
    var userProfilePicture = await this.spotify.getUser(userId);
    return userProfilePicture.images[0].url;
  }

  async getGenres() {
    var genres = [];
    var topItems = await this.spotify.getMyTopTracks();

    topItems.items.map(async (item) => {
      item.artists.map(async (artist) => {
        var artistObj = await this.spotify.getArtist(artist.id);
        artistObj.genres.map((genre) => {
          genres.push(genre);
          return genre;
        });
      });
    });
    return genres;
  }

  async getUsers() {
    var users = await fetch("/api/v1/users");
    return users.json();
  }
  async getGenders() {
    var genders = await fetch("/api/v1/genders");
    return genders;
  }

  async sendPostRequest(link, body) {
    await fetch(link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
  }

  async addIntrestedToGender(genderIdList, userId) {
    userId = userId || (await this.getId()); //se non lo passi lo ricava da solo
    var body = genderIdList.map((genderId) => {
      return {
        user: {
          id: userId,
        },
        gender: {
          id: genderId,
        },
      };
    });

    console.log(body);
    await this.sendPostRequest("/api/v1/interested-in", JSON.stringify(body));
  }

  async addUserGenres(userId) {
    var genresList = await this.getGenres();
    userId = userId || (await this.getId()); //se non lo passi lo ricava da solo
    var body = {
      id: [userId],
      genres: genresList,
    };
    await this.sendPostRequest("/api/v1/user-genres", JSON.stringify(body));
    console.log("Fatta la richiesta");
  }

  async registerUser(username, genderId, userId) {
    userId = userId || (await this.getId()); //se non lo passi lo ricava da solo
    var body = {
      id: userId,
      username: username,
      gender: genderId,
    };
    await this.sendPostRequest("/api/v1/users", JSON.stringify(body));
  }

  async setMatch(cardId, matched, userId) {
    userId = userId || (await this.getId()); //se non lo passi lo ricava da solo
    var body = {
      matched: matched,
      card: cardId,
      user: userId,
    };

    await this.sendPostRequest("/api/v1/match", JSON.stringify(body));
  }

  async getRecommendations(userId) {
    userId = userId || (await this.getId()); //se non lo passi lo ricava da solo
    var response = await fetch(`/api/v1/recommendation/${userId}`);
    return response;
  }

  async checkIfMatched(userToCheckId, userId) {
    userId = userId || (await this.getId()); //se non lo passi lo ricava da solo
    var response = await fetch(
      `/api/v1/match/check-match?userId1=${userToCheckId}&userId2=${userId}`
    );
    var text = await response.text();
    console.log(text );
    var bool = text === "true";
    return bool;
  }
}
