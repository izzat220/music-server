const { spotifyApi } = require("../lib/initSpotify");
const AlbumsModel = require("../models/AlbumsModel");

const likeAlbum = async (req, res) => {
	let albumId = req.body.albumId;

	let albumsList = await AlbumsModel.findOne({ username: req.username });
	if (!albumsList) {
		let newAlbumList = new AlbumsModel({
			username: req.username,
			albums: [albumId],
		});
		await newAlbumList.save();
	} else {
		let albums = albumsList.albums;
		albums.push(albumId);
		await albumsList.update({ albums });
	}
	return res.status(200).json(albumsList);
};

const unlikeAlbum = async (req, res) => {
	let albumId = req.body.albumId;
	let albumsList = await AlbumsModel.findOne({ username: req.username });

	let albums = albumsList.albums;
	let index = albums.indexOf(albumId);
	albums.splice(index, 1);
	await albumsList.update({ albums });

	return res.status(200).json(albumsList);
};

const getUserAlbums = async (req, res) => {
	let username = req.query.username;
	let albumsList = await AlbumsModel.findOne({ username });

	if (!albumsList) {
		let newAlbumsList = new AlbumsModel({ username, albums: [] });
		await newAlbumsList.save();
		return res.status(200).json(newAlbumsList);
	} else {
		return res.status(200).json(albumsList);
	}
};

const getUserAlbumsWithDetails = async (req, res) => {
	let username = req.username;
	let albumsList = await AlbumsModel.findOne({ username });
	let albums = [];

	if (!albumsList) {
		let newAlbumsList = new AlbumsModel({ username, albums: [] });
		await newAlbumsList.save();
		return res.status(200).json(albums);
	} else {
		for (let i = 0; i < albumsList.albums.length; i++) {
			const albumId = albumsList.albums[i];
			let album = await spotifyApi.getAlbum(albumId);
			albums.push(album.body);
		}
		return res.status(200).json(albums);
	}
};

module.exports = {
	likeAlbum,
	unlikeAlbum,
	getUserAlbums,
	getUserAlbumsWithDetails,
};
