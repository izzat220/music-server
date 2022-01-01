const moment = require("moment");
const CommentModel = require("../models/CommentModel");

const addComment = async (req, res) => {
	let text = req.body.text;
	let postId = req.body.postId;

	let newComment = {
		username: req.username,
		commentedOn: moment().toISOString(),
		text,
	};

	let postComments = await CommentModel.findOne({ postId });
};

const getComments = async (req, res) => {
	let postId = req.postId;
};
