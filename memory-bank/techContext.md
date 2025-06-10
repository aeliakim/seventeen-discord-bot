# Technical Context

## Technologies Used

- **Node.js**: Runtime environment
- **Discord.js**: Discord bot framework
- **twitter-api-v2**: Twitter API client
- **better-sqlite3**: SQLite database driver
- **dotenv**: Environment variable management

## Development Setup

1. Node.js environment
2. Discord Developer Account
3. Twitter Developer Account
4. SQLite database

## Dependencies

```json
{
  "dependencies": {
    "discord.js": "^14.x",
    "twitter-api-v2": "^1.x",
    "better-sqlite3": "^8.x",
    "dotenv": "^16.x"
  }
}
```

## Environment Variables

Required in `.env`:

```
DISCORD_TOKEN=your_discord_bot_token
DISCORD_CHANNEL_ID=your_channel_id
TWITTER_BEARER_TOKEN=your_twitter_bearer_token
```

## Technical Constraints

1. Twitter API rate limits
2. Discord API rate limits
3. Need for persistent storage (SQLite)
4. Need for continuous uptime

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);
```

## API Requirements

1. Twitter API v2 access
2. Discord Bot Token
3. Proper permissions in Discord server

## Development Tools

- VS Code/Cursor
- Git for version control
- PM2 for process management (recommended for production)
