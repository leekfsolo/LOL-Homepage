require('dotenv').config();
const axios = require('axios');
const cloudinary = require('cloudinary');

const totalChampions = 159;
const { API_KEY, API_SECRET, CLOUD_NAME } = process.env;

cloudinary.config({
	cloud_name: CLOUD_NAME, // add your cloud_name
	api_key: API_KEY, // add your api_key
	api_secret: API_SECRET, // add your api_secret
	secure: true
});

const databaseUrl = "http://127.0.0.1:8000/champions/";

module.exports.getImagesFromDB = async (folder) => {
	const response = await cloudinary.v2.search.expression(
		`folder:${folder}`
	).max_results(160).execute();
	const data = response.resources.sort((object1, object2) => {
		const object1_id = object1.public_id.match(/\b\w+/gm)[1];
		const object2_id = object2.public_id.match(/\b\w+/gm)[1];

		return object1_id.localeCompare(object2_id);
	}).map((data) => data.url);

	return data;
};

module.exports.postDataToDB = async (props) => {
	const { championsImage, championsName, championsRegion, championsImagePosition, championsReleaseDate } = props;

	for (let i = 0; i < totalChampions; i++) {
		await axios.post(databaseUrl, {
			name: championsName[i],
			region: championsRegion[i],
			image: championsImage[i],
			imagePosition: championsImagePosition[i],
			release_date: championsReleaseDate[i]
		});
	}
};