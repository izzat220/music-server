const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const moment = require("moment");

//add User
const addUser = async (req, res) => {
	let formData = req.body;

	if (!formData.username)
		return res.status(400).json({ error: "Username Required" });
	if (!formData.password)
		return res.status(400).json({ error: "Password Required" });
	if (!formData.email) return res.status(400).json({ error: "Email Required" });
	if (!formData.displayName)
		return res.status(400).json({ error: "Display Name Required" });

	let userExists = await UserModel.findOne({
		username: formData.username,
	}).catch((err) => res.status(500).json({ error: err }));

	let emailExists = await UserModel.findOne({ email: formData.email }).catch(
		(err) => res.status(500).json({ error: err })
	);

	if (userExists)
		return res.status(400).json({ error: "Username Already Exists" });
	if (emailExists) return res.status(400).json({ error: "Email Already Used" });

	let salt = await bcrypt.genSalt(10);
	let hashedPassword = await bcrypt.hash(formData.password, salt);
	formData.password = hashedPassword;

	formData.joinedOn = moment().toISOString();

	let newUser = new UserModel(formData);
	await newUser.save();
	return res.status(200).json(newUser);
};

//update User
const updateUser = async (req, res) => {
	let userInfo = req.body;

	if (!userInfo.username)
		return res.status(400).json({ error: "Username Not Provided" });

	let user = await UserModel.findOneAndUpdate(
		{ username: userInfo.username },
		userInfo
	).catch((err) => res.status(500).json({ error: err }));

	return res.status(200).json({ success: "User Updated" });
};

//delete User
const deleteUser = async (req, res) => {
	let username = req.body.username;

	if (!username) return res.status(400).json({ error: "Username Not Provided" });

	await UserModel.findOneAndDelete({ username }).catch((err) =>
		res.status(500).json({ error: err })
	);

	return res.status(200).json({ success: "User Deleted" });
};

//get user
const getUser = async (req, res) => {
	let username = req.query.name;
	if (!username) return res.status(400).json({ error: "Username Not Provided" });

	let user = await UserModel.findOne({ username }).catch((err) =>
		res.status(500).json({ error: err })
	);

	if (!user) return res.status(404).json({ error: "User Not Found" });

	return res.status(200).json(user);
};

//get users
const getUsers = async (req, res) => {};

module.exports = { addUser, getUser, getUsers, updateUser, deleteUser };
