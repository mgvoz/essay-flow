import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/users.js';
import rubricRoutes from './routes/rubrics.js';
import fileRouter from './routes/files.js';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import crypto from 'crypto';
import methodOverride from 'method-override';
import CONNECTION_URL from './config.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride('_method'));
app.use(cookieParser());

app.use('/user', userRoutes);
app.use('/rubrics', rubricRoutes);
app.get('/', (req, res) => {
	res.send('Hello');
});

const url = CONNECTION_URL;

const PORT = process.env.PORT || 5000;

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)),
	)
	.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const storage = new GridFsStorage({
	url: CONNECTION_URL,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = file.originalname;
				//buf.toString('hex') + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: 'uploads',
					metadata: req.cookies,
				};
				resolve(fileInfo);
			});
		});
	},
});

const upload = multer({ storage });
app.use('/files', fileRouter(upload));
