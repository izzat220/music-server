const { default: axios } = require("axios");
const qs = require("qs");
const CronJob = require("cron").CronJob;
const { spotifyApi } = require("./initSpotify");

const getToken = async () => {
	const response = await axios.post(
		"https://accounts.spotify.com/api/token",
		qs.stringify({ grant_type: "client_credentials" }),
		{
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
			},
			auth: {
				username: process.env.CLIENT_ID,
				password: process.env.CLIENT_SECRET,
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
