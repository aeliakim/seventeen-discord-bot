const puppeteer = require("puppeteer");
require("dotenv").config();

async function loginWeverse() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Go to Weverse login page
  await page.goto("https://account.weverse.io/en/signup", {
    waitUntil: "networkidle2",
  });

  // Fill in email form
  // wait for email field to appear
  await page.waitForSelector('input[type="text"]', { visible: true });
  await page.type('input[type="text"]', process.env.WEVERSE_EMAIL, {
    delay: 50,
  });

  // click continue button
  //   await page.click('button[type="submit"]');
  const [continueBtn] = await page.waitForSelector(
    "//button[.//span[text()='Continue with this email']]"
  );
  if (continueBtn) {
    await continueBtn.click();
  } else {
    throw new Error("Continue button not found!");
  }

  // wait for password field to appear
  await page.waitForSelector('input[type="password"]', { visible: true });

  // fill password section
  await page.type('input[type="password"]', process.env.WEVERSE_PASSWORD, {
    delay: 50,
  });

  // click login button
  //   await page.click('button[type="submit"]');
  const [loginBtn] = await page.waitForSelector(
    "//button[.//span[text()='Log In']]"
  );
  if (loginBtn) {
    await loginBtn.click();
  } else {
    throw new Error("Log In button not found!");
  }

  // Wait fro navigation or a selector that indicates login success
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  return { browser, page };
}

module.exports = { loginWeverse };
