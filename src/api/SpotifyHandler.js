import Spotify from "spotify-web-api-js";

export class SpotifyHandler {
  constructor(token) {
    this.spotify = new Spotify();
    this.spotify.setAccessToken(token);
  }

  async getId() {
    var userObj = await this.spotify.getMe();
    return userObj.id;
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

  async sendPostRequest(link, body) {
    await fetch(link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
  }

  async addIntrestedToGender(genderId, userId) {
    userId = userId || (await this.getId()); //se non lo passi lo ricava da solo
    var body = {
      user: {
        id: userId,
      },
      gender: {
        id: genderId,
      },
    };
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
}
