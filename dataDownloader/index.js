const puppeteer = require('puppeteer');
const downloadImages = require('./utils/downloadImages');
const getImageSrcs = require('./utils/getImageSrcs');
const { getImagesFromDB, postDataToDB } = require('./utils/database');

require('dotenv').config();

async function main({ type = "data" }) {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto(process.env.MAIN_PAGE_URL, {
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
		const imageClass = '.image_3oOd.avatar_3vJT';

		const championsName = await page.$$eval(`${itemClass} h1`, (names) => names.map(name => name.innerHTML));
		const championsRegion = await page.$$eval(`${itemClass} span`, (regions) => regions.map(region => region.innerHTML));
		const championsImagePosition = await page.$$eval(imageClass, (images) => images.map(image => image.style.backgroundPosition));
		const championsImage = await getImagesFromDB();

		const champions_page = await browser.newPage();
		await champions_page.goto(process.env.CHAMPIONS_PAGE_URL, {
			waitUntil: 'load',
			timeout: 0
		});
		const dataClass = ".article-table tbody tr td:nth-child(3)";
		const championsReleaseDate = await champions_page.$$eval(dataClass, (dates) => dates.map(date => {
			if (date.firstChild.hasChildNodes()) {
				return date.firstChild.innerHTML.trim();
			}
			else return date.innerHTML.trim();
		}));

		await postDataToDB({ championsName, championsImage, championsRegion, championsImagePosition, championsReleaseDate });
	}

	await browser.close();
}

main({ type: "data" });