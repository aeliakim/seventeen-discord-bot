# SEVENTEEN Discord Bot

## Project Overview

This is a Discord bot designed to automatically fetch and post the latest updates from SEVENTEEN's social media account directly to a specified Discord channel. It aims to keep fans updated in real-time without needing to constantly check the official account. Currently, this bot fetch the updates from SEVENTEEN's X (Twitter) official account.

## Features

- **Fetch Updates:** Automatically checks for new tweets from `@pledis_17` every 20 minutes due to Twitter API rate limit.
- **Discord Integration:** Posts new tweets to a designated Discord channel.
- **Duplicate Prevention:** Utilizes a SQLite database to prevent reposting of already shared tweets.
- **Rich Embeds:** Formats tweets into visually appealing Discord embeds, including author information, tweet text, and timestamp.
- **Media Handling:** Automatically handles Twitter-attached photos/videos and external links (like YouTube, TikTok, Instagram) by sending them as separate messages for Discord's native rich embedding.
- **Reliable Operation:** Designed to run continuously in the background.

## Technologies Used

- **Node.js**: The JavaScript runtime environment.
- **Discord.js**: A powerful Node.js module for interacting with the Discord API.
- **twitter-api-v2**: The library used to interact with the Twitter API v2.
- **better-sqlite3**: A simple and efficient SQLite database library for persistent storage.
- **dotenv**: For loading environment variables from a `.env` file, keeping sensitive information secure.
- **PM2**: (Recommended) A production process manager for Node.js applications, ensuring the bot runs continuously and automatically restarts on crashes.

## Prerequisites

Before setting up the bot, ensure you have the following:

- **Node.js**: Installed on your system (LTS version recommended).
- **Discord Account**: To create a bot application and a server/channel for updates.
- **Twitter Developer Account**: To get API credentials for fetching tweets.
- Basic understanding of using the command line/terminal.

## Setup Guide

Follow these steps to get your bot up and running:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/discord-weverse-scraper.git # Replace with your repo URL
cd discord-weverse-scraper
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Discord Bot Setup

1.  **Create a New Application:** Go to the [Discord Developer Portal](https://discord.com/developers/applications), click `New Application`, and give it a name.
2.  **Add a Bot:** Navigate to the `Bot` tab and click `Add Bot`.
3.  **Copy Token:** Under `Token`, click `Copy` to get your bot token. **Keep this token secret!**
4.  **Enable Privileged Intents:** Scroll down to `Privileged Gateway Intents` and enable the `MESSAGE CONTENT INTENT`.
5.  **Invite Bot to Your Server:**
    - Go to `OAuth2 > URL Generator`.
    - Under `Scopes`, select `bot`.
    - Under `Bot Permissions`, select at least `Send Messages` and `Read Message History`.
    - Copy the generated URL, paste it into your browser, and invite the bot to your desired server and channel.
6.  **Get Channel ID:** In Discord, enable `Developer Mode` (User Settings > Advanced). Right-click the channel where you want tweets to be posted and select `Copy ID`.

### 4. Twitter API Setup

1.  **Apply for Developer Account:** Go to the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard) and apply for a developer account.
2.  **Create a Project & App:** Create a new project and then create a new App within that project.
3.  **Generate Bearer Token:** Under your App settings, find and generate your **Bearer Token**. This token is used for read-only access to the Twitter API v2 and is required for fetching tweets. **Keep this token secret!**
    - The bot is configured to fetch tweets from the `@pledis_17` (SEVENTEEN) account.

### 5. Configure Environment Variables (`.env`)

Create a file named `.env` in the root directory of your project (same level as `package.json`) and add the following:

```env
DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN_HERE
DISCORD_CHANNEL_ID=YOUR_DISCORD_CHANNEL_ID_HERE
TWITTER_BEARER_TOKEN=YOUR_TWITTER_BEARER_TOKEN_HERE
```

Replace the placeholder values with the actual tokens and IDs you obtained.

### 6. Database Setup

The bot uses a simple SQLite database to track the last posted tweet ID. This file will be automatically created when the bot runs for the first time.

## Running the Bot

### Local Run (for testing/development)

```bash
node src/bot.js
```

To stop the bot, press `Ctrl + C` in your terminal.

### Persistent Run (Bot run continuously)
To make the bot run continuously, you can use [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/) or deploy it in any cloud server.

## Future Enhancements

- **Weverse Integration:** Planned functionality to also fetch and post updates from SEVENTEEN's Weverse community.
- **Enhanced Error Handling & Logging:** More robust error reporting and detailed logging.
- **Additional Bot Commands:** Commands for manual checks, status, or configuration.

## Contributing

If you found a bug or an issue, please report by opening a new issue on this repository.

## License

This project is open-source and available under the MIT License.
