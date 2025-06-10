// load env variables
require("dotenv").config();

// client: main class for interacting with discord API.
// gatewayintentbits: specify what events your bot should listen to
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

// import twitter functions
const { fetchLatestTweet } = require("./twitter/index.js");
const { getLastTweetId, setLastTweetId } = require("./database/db.js");

// intents: what kind of events your bot wants to receive
/*
    guilds: events about servers your bot is in
    guildmessages: events about messages sent in servers
    messagecontent: lets your bot read the content of message
*/
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let lastTweetId = getLastTweetId();

// event listener that runs once when the bot successfully logs in
client.once("ready", () => {
  // prints a message to terminal
  console.log(`Logged in as ${client.user.tag}`);

  setInterval(async () => {
    try {
      const tweet = await fetchLatestTweet();
      if (tweet && tweet.id !== lastTweetId) {
        lastTweetId = tweet.id;
        setLastTweetId(tweet.id);
        const channel = await client.channels.fetch(
          process.env.DISCORD_CHANNEL_ID
        );

        // Format embed similar to screenshot
        const embed = new EmbedBuilder()
          .setColor(0x1da1f2)
          .setAuthor({
            name: `${tweet.author.name} (@${tweet.author.username})`,
            iconURL:
              "https://pbs.twimg.com/profile_images/1922276483554541569/TZj_KOCg_normal.jpg",
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
      }
    } catch (err) {
      console.error("Error fetching or posting tweet:", err);
    }
  }, 20 * 60 * 1000); // 20 minutes
});

// // event listener for every new message sent in any server the bot is in
// client.on("messageCreate", (message) => {
//   // Ignore messages from the bot itself
//   // prevent the bot from responding to itself or other bot
//   if (message.author.bot) return;

//   // Example: simple ping command
//   if (message.content === "!ping") {
//     message.channel.send("Pong!");
//   }
// });

// logs the bot in to discord using bot token from env file
client.login(process.env.DISCORD_TOKEN);
