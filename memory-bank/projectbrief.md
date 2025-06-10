# Discord Bot for SEVENTEEN Updates

## Project Overview

A Discord bot that fetches and posts updates from SEVENTEEN's social media accounts (currently X/Twitter, with plans for Weverse integration).

## Core Requirements

1. Fetch latest tweets from SEVENTEEN's X account (@pledis_17)
2. Post new tweets to a specified Discord channel
3. Avoid duplicate posts
4. Run continuously and reliably
5. (Future) Fetch and post Weverse updates

## Technical Goals

- Use Discord.js for bot functionality
- Use Twitter API v2 for tweet fetching
- Store last seen tweet ID in SQLite database
- Implement reliable error handling and logging
- Ensure bot stays online 24/7

## Project Scope

### Phase 1 (Current)

- Twitter/X integration
- Basic Discord bot functionality
- Database integration for tweet tracking

### Phase 2 (Future)

- Weverse integration
- Enhanced error handling
- Additional features (commands, customization)

## Success Criteria

1. Bot successfully fetches and posts new tweets
2. No duplicate posts
3. Bot remains online and functional
4. Clean error handling and logging
