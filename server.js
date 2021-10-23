//Import Libraries
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

//Import Routes

//Initializations
const app = express();

const SpotifyWebApi = require("spotify-web-api-node");
var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(
	"BQDzAI6l86SMI_uBzgkTgLwR7wCRoWHfIDdiDkK6Pt0EvMCfA258cgnVFVa9wDO6i0ZMF1FMGyeMXtRNzHmOvwim2lYKLQOdz6dnoAMl12jBbsFyloJqf2xFUaG62yki9VdrFfJAg5VzrhDn5A8tKJbcX9apoyq_-pY"
);

//Middleware
app.use(cors({ origin: "http://localhost:3000" }));

//Routes
app.get("/test", async (req, res) => {
	spotifyApi.searchAlbums("crack the skye").then(
		function (data) {
			res.json(data.body.albums.items[0]);
		},
		function (err) {
			console.error(err);
		}
	);
});

//Listening
app.listen(8080, () => console.log("Listening on Port 8080"));
