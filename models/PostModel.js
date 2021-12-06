const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	username: {
		type: String,
		// required: true,
	},
	text: {
		type: String,
		// required: true,
	},
	attachmentType: {
		type: String,
		// required: true,
	},
	attachment: {
		type: Object,
		// required: true,
	},
	rating: {
		type: Number,
		default: 1,
	},
	postedOn: {
		type: String,
		// required: true,
	},
	likes: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model("posts", postSchema);
