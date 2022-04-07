const puppeteer = require('puppeteer');
const downloadImages = require('./utils/downloadImages');
const getImageSrcs = require('./utils/getImageSrcs');
const { getImagesFromDB, postDataToDB } = require('./utils/database');

require('dotenv').config();

async function main({ type = "data" }) {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto(process.env.PAGE_URL, {
		waitUntil: 'load',
		timeout: 0
	});

	if (type === "image") {
		const imageSrcs = await page.evaluate(getImageSrcs);
		await browser.close();
		downloadImages(imageSrcs);
	}

	if (type === "data") {
		const itemClass = ".copy_xxN7";
		const championsName = await page.$$eval(`${itemClass} h1`, (names) => names.map(name => name.innerHTML));
		const championsRegion = await page.$$eval(`${itemClass} span`, (regions) => regions.map(region => region.innerHTML));
		const championsImage = await getImagesFromDB();

		await postDataToDB({ championsName, championsImage, championsRegion });

	}
	await browser.close();
}

main({ type: "image" });