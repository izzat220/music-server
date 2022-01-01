const router = require("express").Router();
const {
	getUserAlbums,
	likeAlbum,
	unlikeAlbum,
	getUserAlbumsWithDetails,
} = require("../controllers/albums");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/getUserAlbums", authMiddleware, getUserAlbums);
router.post("/likeAlbum", authMiddleware, likeAlbum);
router.post("/unlikeAlbum", authMiddleware, unlikeAlbum);
router.get(
	"/getUserAlbumsWithDetails",
	authMiddleware,
	getUserAlbumsWithDetails
);

module.exports = router;
