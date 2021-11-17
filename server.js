//Import Libraries
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const { initMongo } = require("./lib/initMongo");
const { startJob } = require("./lib/autoToken");
const { spotifyApi } = require("./lib/initSpotify");
const cookieParser = require("cookie-parser");

//Import Routes
const users = require("./routes/users");

//Initializations
require("dotenv").config();
const app = express();
initMongo();
startJob();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("secret"));
app.use(
	cors({
		credentials: true,
		origin: ["http://localhost:3000", "http://localhost:3001"],
	})
);

//Routes
app.use("/users", users);

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
