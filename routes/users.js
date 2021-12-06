const router = require("express").Router();
const {
	addUser,
	getUser,
	getUsers,
	updateUser,
	login,
	checkToken,
} = require("../controllers/users");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/addUser", addUser);
router.get("/getUser", getUser);
router.get("/getUsers", getUsers);

router.post("/updateUser", authMiddleware, updateUser);

router.post("/login", login);
router.get("/checkToken", checkToken);

module.exports = router;
