module.exports = function getImageSrcs() {
	const imageContainerClass = '.image_3oOd.avatar_3vJT';
	const imageContainer = Array.from(document.querySelectorAll(imageContainerClass));
	const imgs = imageContainer.map(img => {
		const stringInQuotesRegex = /".*"/gi;
		const imageUrl = img.style.backgroundImage.match(stringInQuotesRegex)[0];
		const extractedImageUrlFromQuotes = imageUrl.substr(1, imageUrl.length - 2);
		return extractedImageUrlFromQuotes;
	});
	return imgs;
};