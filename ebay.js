const puppeteer = require("puppeteer");

exports.scrapProductByUrl = async (url) => {
  try {
    console.log(url)
    const browser = await puppeteer.launch({ headless: false }); // for test disable the headlels mode
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0); 
    await page.setViewport({width:1920, height:1080});
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    await page.goto(`${url}`, {waitUntill: 'networkidle2',  timeout: 0});
    let title = await page.evaluate(()=>{
      const title = document.querySelector('#vi-lkhdr-itmTitl')
      return title.textContent
    })

    title = title.split('Details about')
    title = title[title.length - 1];
   
    let images = await page.evaluate(() => {
        const arr = []
        let elements = document.getElementsByClassName('ux-image-carousel-item');
        for (let element of elements) {
            const img = element.getElementsByTagName('img');
            arr.push(img[0].src)
        }
        return arr;
    });
    images = [...new Set(images)];
    await browser.close();
    // npm 
    return {success: true, data: {title, images}};
} catch (error) {
    console.log(error)
    return {error: true, message: "Loading data from E-Bay Failed"};
}
}