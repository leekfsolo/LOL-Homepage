const puppeteer = require("puppeteer");
const downloadImages = require("./utils/downloadImages");
const getImageSrcs = require("./utils/getImageSrcs");
const { getImagesFromDB, postDataToDB } = require("./utils/database");
const { names } = require("./utils/constants");

require("dotenv").config();

const getRandomNumber = (from = 0, to = 10) => {
  return Math.floor(Math.random() * (to - from) + from);
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main({ type = "champions" }) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`${process.env.BASE_URL}`, {
    waitUntil: "load",
    timeout: 0,
  });

  if (type === "image") {
    const imageSrcs = await page.evaluate(getImageSrcs);
    await browser.close();
    downloadImages(imageSrcs);
  }

  if (type === "champions") {
    const itemClass = ".copy_xxN7";
    const imageClass = ".image_3oOd.avatar_3vJT";

    const championsName = await page.$$eval(`${itemClass} h1`, (names) =>
      names.map((name) => name.innerHTML)
    );
    const championsRegion = await page.$$eval(`${itemClass} span`, (regions) =>
      regions.map((region) => region.innerHTML)
    );
    const championsImagePosition = await page.$$eval(imageClass, (images) =>
      images.map((image) => image.style.backgroundPosition)
    );
    const championsImage = await getImagesFromDB("Champions");

    const champions_page = await browser.newPage();
    await champions_page.goto(process.env.CHAMPIONS_PAGE_URL, {
      waitUntil: "load",
      timeout: 0,
    });
    const dataClass = ".article-table tbody tr td:nth-child(3)";
    const championsReleaseDate = await champions_page.$$eval(
      dataClass,
      (dates) =>
        dates.map((date) => {
          if (date.firstChild.hasChildNodes()) {
            return date.firstChild.innerHTML.trim();
          } else return date.innerHTML.trim();
        })
    );

    await postDataToDB({
      championsName,
      championsImage,
      championsRegion,
      championsImagePosition,
      championsReleaseDate,
    });
  }

  try {
    if (type === "home") {
      // form target
      const inputNameClass = ".whsOnd.zHQkBf";
      const sectionClass = ".Qr7Oae";
      const horizontalRadioButtonClass = ".Zki2Ve";
      const verticalRadioButtonClass = ".nWQGrd.zwllIb";
      const sendButtonSelector = ".uArJ5e.UQuaGc.Y5sE8d.VkkpIf.QvWxOd";
      const otherDetailSelector = "textarea.KHxj8b.tL9Q4c";

      for (const name of names) {
        // await page.type(inputNameClass, name);

        // handle each form section
        const sections = await page.$$(sectionClass);
        for (const i in sections) {
          const vertRadios = await sections[i].$$(verticalRadioButtonClass);
          const horRadios = await sections[i].$$(horizontalRadioButtonClass);

          if (i === 3) {
            await vertRadios[0].click();
          } else if ([1, 2].includes(i)) {
            await vertRadios[getRandomNumber(0, vertRadios.length - 1)].click();
          } else {
            if (vertRadios.length > 0) {
              await vertRadios[0].click();
            }
            if (horRadios.length > 0)
              await horRadios[getRandomNumber(3, 5)].click();
          }
        }

        // const orderDetail = await page.$(otherDetailSelector);
        // if (orderDetail) {
        //   await orderDetail.type("Không có");
        // }
        await page.click(sendButtonSelector);
        await sleep(1000);
        await page.reload();
      }
    }
  } catch (e) {
    await page.reload();
  }

  // await browser.close();
}

main({ type: "home" });
