const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	postId: {
		type: String,
		unique: true,
		required: true,
	},

	comments: {
		type: Array,
		default: [],
	},
});

module.exports = mongoose.model("comments", commentSchema);
