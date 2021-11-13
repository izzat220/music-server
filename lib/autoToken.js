const { default: axios } = require("axios");
const qs = require("qs");
const CronJob = require("cron").CronJob;
const { spotifyApi } = require("./initSpotify");

const getToken = async () => {
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
	return response.data.access_token;
};

const job = new CronJob(
	"*/59 * * * *",
	async () => {
		let newToken = await getToken();
		spotifyApi.setAccessToken(newToken);
		console.log(`Spotify Access Token Generated.`);
	},
	null,
	true,
	"Asia/Dubai"
);

const startJob = async () => {
	let newToken = await getToken();
	spotifyApi.setAccessToken(newToken);
	console.log(`Spotify Access Token Generated.`);

	job.start();
};

module.exports = { startJob };
