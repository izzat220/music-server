const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const initMongo = () => {
	mongoose.connect(
		"mongodb://localhost:27017/music-app",
		{ useNewUrlParser: true },
		(err) => {
			if (!err) {
				console.log("MongoDB Connection Succeeded.");
			} else {
				console.log("Error in DB connection: " + err);
			}
		}
	);
};

module.exports = { initMongo };
