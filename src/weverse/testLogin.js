const { loginWeverse } = require("./auth.js");

(async () => {
  try {
    const { browser, page } = await loginWeverse();

    // Check if login was successful by looking for a selector only visible when logged in
    // For example, check for the presence of the profile icon, or the artist page
    // Adjust the selector below to something that only appears after login
    await page.goto("https://weverse.io/seventeen/artist", {
      waitUntil: "networkidle2",
    });
    await page.waitForSelector("class:FeedArtistLayoutView_content__k9va2", {
      timeout: 5000,
    });

    console.log("Login successful!");
    await browser.close();
  } catch (err) {
    console.error("Login failed:", err);
    process.exit(1);
  }
})();
