import puppeteer from "puppeteer";

describe("End-to-end test", () => {
  jest.setTimeout(30000);

  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, // slow down by 250ms
    });
    page = await browser.newPage();
  });

  it("should render display", async () => {
    jest.setTimeout(30000);
    
    await page.goto("http://localhost:3000/prosjekt3");
    await page.waitForSelector("#next-page");
    await page.click("#next-page")
  });

  afterAll(() => browser.close());
});


    // await page.waitForSelector(".App-welcome-text");
    // const text = await page.$eval(".App-welcome-text", (e) => e.textContent);
    // expect(text).toContain("Edit src/App.js and save to reload.");
