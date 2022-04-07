const fs = require('fs');
const downloader = require('node-image-downloader');

require('dotenv').config();
const { DOWNLOAD_FOLDER: downloadsFolder } = process.env;

module.exports = function downloadImages(imageSrcs) {
	if (!fs.existsSync(downloadsFolder)) {
		fs.mkdirSync(downloadsFolder);
	}
	const imagesOptionsForDownloading = [];
	imageSrcs.forEach(src => imagesOptionsForDownloading.push({ uri: src }));

	downloader({
		imgs: imagesOptionsForDownloading,
		dest: downloadsFolder
	}).then((info) => {
		console.log('all done', info);
	})
		.catch((error, response, body) => {
			console.log('something goes bad!');
			console.log(error);
		});
};