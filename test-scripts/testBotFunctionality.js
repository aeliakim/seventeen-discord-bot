require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const { fetchLatestTweet } = require("../src/twitter/index.js");
const { getLastTweetId, setLastTweetId } = require("../src/database/db.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

async function testBotFunctionality() {
  try {
    // Log in the Discord bot
    await client.login(process.env.DISCORD_TOKEN);
    console.log(`Test bot logged in as ${client.user.tag}`);

    // Get the last known tweet ID from the database
    let lastTweetId = getLastTweetId();
    console.log(`Last tweet ID from DB: ${lastTweetId}`);

    // Fetch the latest tweet
    const tweet = await fetchLatestTweet();

    if (!tweet) {
      console.log("No tweet fetched or an error occurred during fetch.");
      return;
    }

    console.log(`Latest fetched tweet ID: ${tweet.id}`);

    // Check if the tweet is new
    if (tweet.id !== lastTweetId) {
      console.log("New tweet found! Attempting to post to Discord...");

      // Update the last tweet ID in the database
      setLastTweetId(tweet.id);
      console.log(`Updated last tweet ID in DB to: ${tweet.id}`);

      // Fetch the Discord channel
      const channel = await client.channels.fetch(
        process.env.DISCORD_CHANNEL_ID
      );
      if (!channel) {
        console.error(
          "Discord channel not found. Please check DISCORD_CHANNEL_ID in .env"
        );
        return;
      }

      // Format the Discord embed
      const embed = new EmbedBuilder()
        .setColor(0x1da1f2)
        .setAuthor({
          name: `${tweet.author.name} (@${tweet.author.username})`,
          iconURL: tweet.author.profile_image_url || undefined,
          url: tweet.tweet_url,
        })
        .setDescription(tweet.text) // Use the original tweet.text
        .setTimestamp(new Date(tweet.created_at))
        .setFooter({
          text: "Twitter",
          iconURL: "https://abs.twimg.com/icons/apple-touch-icon-192x192.png",
        })
        .setURL(tweet.tweet_url);

      if (tweet.media_url && tweet.media_type === "photo") {
        embed.setImage(tweet.media_url);
      }

      // Prepare external URLs for Discord's auto-embedding
      let externalContent = "";
      if (tweet.external_urls && tweet.external_urls.length > 0) {
        externalContent = tweet.external_urls.join("\n");
      }

      // Send the main embed first
      await channel.send({ embeds: [embed] });

      // Send external URLs as a separate message if they exist
      if (externalContent) {
        await channel.send(externalContent);
      }
    } else {
      console.log("No new tweets found. Last tweet ID is already in DB.");
    }
  } catch (error) {
    console.error("An error occurred during testing:", error);
  } finally {
    // Ensure the bot logs out and the script exits
    console.log("Destroying Discord client and exiting test script...");
    client.destroy();
  }
}

// Run the test function
testBotFunctionality();
