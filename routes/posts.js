const router = require("express").Router();
const { getPosts, addPost } = require("../controllers/posts");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/addPost", authMiddleware, addPost);
router.get("/getPosts", authMiddleware, getPosts);

module.exports = router;
