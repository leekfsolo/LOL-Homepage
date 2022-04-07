const axios = require('axios');
require('dotenv').config();

const totalChampions = 159;
const { API_KEY, API_SECRET, CLOUD_NAME } = process.env;

const cloudinaryUrl = `https://${API_KEY}:${API_SECRET}@api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image?max_results=160;`;
const databaseUrl = "http://127.0.0.1:8000/champions/";

module.exports.getImagesFromDB = async () => {
	const responseData = await axios.get(cloudinaryUrl);
	const championsImage = responseData.data.resources.sort((object1, object2) => {
		const object1_id = object1.public_id.match(/\b\w+/gm)[1];
		const object2_id = object2.public_id.match(/\b\w+/gm)[1];

		return object1_id.localeCompare(object2_id);
	}).map((data) => data.url);

	return championsImage;
};

module.exports.postDataToDB = async ({ championsImage, championsName, championsRegion }) => {
	for (let i = 0; i < totalChampions; i++) {
		await axios.post(databaseUrl, {
			name: championsName[i],
			region: championsRegion[i],
			image: championsImage[i]
		});
	}
};