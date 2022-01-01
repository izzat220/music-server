const mongoose = require("mongoose");

const albumsSchema = new mongoose.Schema({
	username: {
		type: String,
	},
	albums: {
		type: Array,
		default: [],
	},
});

module.exports = mongoose.model("albums", albumsSchema);
