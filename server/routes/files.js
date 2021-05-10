import express from 'express';
import mongoose from 'mongoose';
import CONNECTION_URL from '../config.js';
import Grid from 'gridfs-stream';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fileRouter = express.Router();
var ObjectId = require('mongodb').ObjectID;

export const fileRoutes = (upload) => {
	const url = CONNECTION_URL;
	const connect = mongoose.createConnection(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	let gfs;

	connect.once('open', () => {
		// initialize stream
		gfs = Grid(connect.db, mongoose.mongo);
		gfs.collection('uploads');
	});

	/*
        POST: Upload a single image/file to Image collection
    */

	fileRouter.post(
		'/upload/:userID',
		upload.single('inputFile'),
		(req, res) => {
			res.redirect(
				`https://essay-flow.netlify.app/upload/${req.params.userID}`,
			);
		},
	);

	/*
        GET: Fetches all the files in the uploads collection
    */
	fileRouter.get('/', (req, res, next) => {
		gfs.files.find().toArray((err, files) => {
			if (!files || files.length === 0) {
				return res.status(200).json({
					message: 'No files available',
				});
			}

			res.status(200).json({
				files,
			});
		});
	});

	/*
        GET: Fetches a particular file by id
    */
	fileRouter.get('/:id', (req, res, next) => {
		gfs.files.findOne({ _id: ObjectId(req.params.id) }, (err, file) => {
			if (!file || file.length === 0) {
				return res.status(200).json({
					message: 'No files available',
				});
			}
			console.log(file);
			res.status(200).json(file);
		});
	});

	/* 
        GET: download file
    */
	fileRouter.get('/essay/:id', (req, res) => {
		gfs.files.findOne({ _id: ObjectId(req.params.id) }, (err, file) => {
			if (!file || file.length === 0) {
				return res.status(404).json({
					message: 'No files available',
				});
			}

			if (file) {
				const readstream = gfs.createReadStream(file);
				readstream.pipe(res);
			} else {
				res.status(404).json({
					err: 'Cannot display',
				});
			}
		});
	});

	///
	/*
        DELETE: Delete a particular file by an ID
    */
	fileRouter.delete('/:id', (req, res, next) => {
		gfs.remove(
			{ _id: req.params.id, root: 'uploads' },
			(err, gridStore) => {
				if (err) {
					return res.status(404).json({ err: err });
				}

				res.redirect('https://essay-flow.netlify.app/library/*');
			},
		);
	});
	return fileRouter;
};

export default fileRoutes;
