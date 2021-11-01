//Import Libraries
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const qs = require("qs");

const axios = require("axios").default;

//Import Routes

//Initializations
const app = express();

const SpotifyWebApi = require("spotify-web-api-node");
var spotifyApi = new SpotifyWebApi({
	clientId: "26ebaacf752c4a468d8a137e4e7af8ac",
	clientSecret: "ad53d6d1d8674a039a42d377c13ce92b",
});
spotifyApi.setAccessToken(
	"BQDC25LO_mGjePbd8G8K68sL9tVWFFxmPRJlm86-LXd9CF6Yk9y-t8iWg4bx1FYOboL2X8zlkX6lmKuiI00"
);

//Middleware
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }));

//Routes

app.get("/getToken", async (req, res) => {
	let client_id = "26ebaacf752c4a468d8a137e4e7af8ac";
	let client_secret = "ad53d6d1d8674a039a42d377c13ce92b";

	const response = await axios.post(
		"https://accounts.spotify.com/api/token",
		qs.stringify({ grant_type: "client_credentials" }),
		{
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
			},
			auth: {
				username: client_id,
				password: client_secret,
			},
		}
	);

	res.json(response.data);
});

app.get("/search", async (req, res) => {
	let searchTerm = req.query.search;

	let albums = await spotifyApi.searchAlbums(searchTerm);
	albums = albums.body.albums.items;

	let artists = await spotifyApi.searchArtists(searchTerm);
	artists = artists.body.artists.items;

	return res.json({ albums, artists });
});

//Listening
app.listen(8081, () => console.log("Listening on Port 8081"));
