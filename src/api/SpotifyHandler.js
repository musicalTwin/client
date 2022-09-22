import Spotify from "spotify-web-api-js";

export class SpotifyHandler {
    constructor(token) {
        this.spotify = new Spotify();
        this.spotify.setAccessToken(token);
    }

    async getGenres() {
        var genres = [];
        var topItems = await this.spotify.getMyTopTracks();

        topItems.items.map(async(item) => {
            item.artists.map(async(artist) => {
                var artistObj = await this.spotify.getArtist(artist.id);
                artistObj.genres.map((genre) => {
                    genres.push(genre);
                    return genre;
                });
            });
        });
        return genres;
    }

    async sendRequest(body) {
        await fetch("api/v1/user-genres", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        });
    }

    async addToDatabase() {
        var genresList = await this.getGenres();

        // id dell'utente
        var id = (await this.spotify.getMe()).id;
        var body = {
            id: [id],
            genres: genresList,
        };
        await this.sendRequest(JSON.stringify(body));
        console.log("Fatta la richiesta");
    }
}