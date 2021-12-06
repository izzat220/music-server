const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
	let token = req.cookies?.jwt;
	if (!token) return res.status(403).json({ error: "Unauthorized" });

	jwt.verify(token, "secret", (err, decoded) => {
		if (err) return res.status(403).json({ error: err });

		req.username = decoded.username;
		req.displayName = decoded.displayName;

		next();
	});
};

module.exports = { authMiddleware };
