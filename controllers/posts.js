const PostModel = require("../models/PostModel");
const moment = require("moment");
const UserModel = require("../models/UserModel");

//addPost
const addPost = async (req, res) => {
	let formData = req.body;

	let postDetails = {
		username: req.username,
		text: formData.text,
		postedOn: moment().toISOString(),
	};

	let newPost = PostModel(postDetails);
	await newPost.save();
	return res.status(200).json(newPost);
};

//getPost

//getPosts
const getPosts = async (req, res) => {
	let posts = await PostModel.find();
	for (let i = 0; i < posts.length; i++) {
		const post = posts[i];
		let user = await UserModel.findOne({ username: post.username });
		posts[i] = { ...post._doc, displayName: user.displayName };
	}
	return res.status(200).json(posts);
};

//likePost

//addComment

module.exports = { addPost, getPosts };
