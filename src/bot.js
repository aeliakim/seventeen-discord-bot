// load env variables
require("dotenv").config();

// client: main class for interacting with discord API.
// gatewayintentbits: specify what events your bot should listen to
const { Client, GatewayIntentBits } = require("discord.js");

// import twitter functions
const {fetchLatestTweet} = require('./twitter/index.js');

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

let lastTweetId = null;

// event listener that runs once when the bot successfully logs in
client.once("ready", () => {
  // prints a message to terminal
  console.log(`Logged in as ${client.user.tag}`);

  setInterval(async () => {
    try {
      const tweet = await fetchLatestTweet();
      if(tweet && tweet.id !== lastTweetId) {
        lastTweetId = tweet.id;
        const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
        channel.send(`New tweet from SEVENTEEN: https://x.com/pledis_17/status/${tweet.id}\n${tweet.text}`)
      }
    } catch (err) {
      console.error('Error fetching tweet:', err);
    }
  })
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
