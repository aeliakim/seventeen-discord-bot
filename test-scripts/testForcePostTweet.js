require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// --- IMPORTANT: CONFIGURE THIS SAMPLE TWEET DATA ---
// This sample data should mimic the structure returned by your fetchLatestTweet
const sampleTweet = {
  id: "1758500662285498305", // Replace with an actual tweet ID you want to test
  text: "New tweet from SEVENTEEN! Check out this video: https://www.youtube.com/watch?v=dQw4w9WgXcQ\n#SEVENTEEN #SVT",
  author: {
    id: "123456789",
    name: "SEVENTEEN",
    username: "pledis_17",
    profile_image_url:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png", // Replace with actual profile image URL if desired
  },
  created_at: new Date().toISOString(), // Use current time or a specific tweet creation time
  media_url: "", // <<< IMPORTANT: KEEP THIS EMPTY FOR EXTERNAL (YouTube/TikTok/Instagram) LINKS
  media_type: "", // <<< IMPORTANT: KEEP THIS EMPTY FOR EXTERNAL (YouTube/TikTok/Instagram) LINKS
  tweet_url: "https://twitter.com/pledis_17/status/1758500662285498305", // Replace with the actual tweet URL
  external_urls: ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"], // Manually add external URLs from text for auto-embedding
};
// ---------------------------------------------------

async function testForcePostTweet() {
  try {
    // Log in the Discord bot
    await client.login(process.env.DISCORD_TOKEN);
    console.log(`Test bot logged in as ${client.user.tag}`);

    // Fetch the Discord channel
    const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
    if (!channel) {
      console.error(
        "Discord channel not found. Please check DISCORD_CHANNEL_ID in .env"
      );
      return;
    }

    console.log("Attempting to post sample tweet to Discord...");

    // Format the Discord embed
    const embed = new EmbedBuilder()
      .setColor(0x1da1f2)
      .setAuthor({
        name: `${sampleTweet.author.name} (@${sampleTweet.author.username})`,
        iconURL: sampleTweet.author.profile_image_url || undefined,
        url: sampleTweet.tweet_url,
      })
      .setDescription(sampleTweet.text) // Use the original tweet.text
      .setTimestamp(new Date(sampleTweet.created_at))
      .setFooter({
        text: "Twitter",
        iconURL: "https://abs.twimg.com/icons/apple-touch-icon-192x192.png",
      })
      .setURL(sampleTweet.tweet_url);

    // Only set image if it's a direct Twitter photo attachment
    if (sampleTweet.media_url && sampleTweet.media_type === "photo") {
      embed.setImage(sampleTweet.media_url);
    }

    // Prepare external URLs for Discord's auto-embedding
    let externalContent = "";
    if (sampleTweet.external_urls && sampleTweet.external_urls.length > 0) {
      externalContent = sampleTweet.external_urls.join("\n");
    }

    // Send the main embed first
    await channel.send({ embeds: [embed] });

    // Send external URLs as a separate message if they exist
    if (externalContent) {
      await channel.send(externalContent);
    }

    console.log("Sample tweet successfully posted to Discord!");
  } catch (error) {
    console.error("An error occurred during forced tweet posting:", error);
  } finally {
    // Ensure the bot logs out and the script exits
    console.log("Destroying Discord client and exiting test script...");
    client.destroy();
  }
}

// Run the test function
testForcePostTweet();
