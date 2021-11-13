const SpotifyWebApi = require("spotify-web-api-node");

//VALUES TO CHANGE TO A .ENV FILE
const spotifyApi = new SpotifyWebApi({
	clientId: "26ebaacf752c4a468d8a137e4e7af8ac",
	clientSecret: "ad53d6d1d8674a039a42d377c13ce92b",
});

module.exports = { spotifyApi };
