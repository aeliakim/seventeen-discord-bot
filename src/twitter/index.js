const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// get username
const SEVENTEEN_USERNAME = "pledis_17";

async function fetchLatestTweet() {
  // get user ID
  const user = await twitterClient.v2.userByUsername(SEVENTEEN_USERNAME);
  // get latest tweets (exclude replies/retweets)
  const tweets = await twitterClient.v2.userTimeline(user.data.id, {
    max_results: 5,
    exclude: "replies, retweets",
  });
  // return the most recent tweet
  return tweets.data.data[0];
}

module.exports = { fetchLatestTweet };
