const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

// Use Bearer Token for app-only authentication
const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

// get username
const SEVENTEEN_USERNAME = "pledis_17";

async function fetchLatestTweet() {
  try {
    // Get user ID
    const user = await twitterClient.v2.userByUsername(SEVENTEEN_USERNAME);
    // Get latest tweets (exclude replies/retweets)
    const tweets = await twitterClient.v2.userTimeline(user.data.id, {
      max_results: 5,
      "tweet.fields": "created_at,attachments,entities",
      expansions: "attachments.media_keys,author_id",
      "media.fields": "url,preview_image_url,type",
      exclude: "replies,retweets",
    });
    if (!tweets.data || !tweets.data.data || tweets.data.data.length === 0)
      return null;
    const tweet = tweets.data.data[0];
    // Get media if present
    let mediaUrl = null;
    let mediaType = null;
    if (
      tweet.attachments &&
      tweet.attachments.media_keys &&
      tweets.data.includes &&
      tweets.data.includes.media
    ) {
      const media = tweets.data.includes.media.find((m) =>
        tweet.attachments.media_keys.includes(m.media_key)
      );
      if (media) {
        mediaUrl = media.url || media.preview_image_url;
        mediaType = media.type;
      }
    }

    const externalUrls =
      tweet.entities && tweet.entities.urls
        ? tweet.entities.urls.map((url) => url.expanded_url)
        : [];

    return {
      id: tweet.id,
      text: tweet.text,
      author: user.data,
      created_at: tweet.created_at,
      media_url: mediaUrl,
      media_type: mediaType,
      tweet_url: `https://twitter.com/${SEVENTEEN_USERNAME}/status/${tweet.id}`,
      external_urls: externalUrls,
    };
  } catch (err) {
    console.error("Error fetching tweet:", err);
    return null;
  }
}

module.exports = { fetchLatestTweet };
