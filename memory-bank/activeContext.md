# Active Context

## Current Focus

- Ensuring continuous and reliable operation of the Twitter-to-Discord bot using PM2.
- Preparing for future Weverse integration.

## Recent Changes

- Completed Twitter/X integration, including:
  - Twitter API v2 setup with Bearer Token.
  - Fetching latest tweets and handling media/external links.
  - Persistent tracking of last tweet ID using SQLite.
  - Formatted Discord embeds with auto-embedding for external URLs.
- Initiated PM2 setup for background process management.

## Active Decisions

1. Using Twitter API v2 with Bearer Token for tweet fetching.
2. Using SQLite for persistent storage of last tweet ID.
3. Utilizing PM2 for robust process management and uptime.
4. Prioritizing Twitter integration completion before Weverse development.
5. Sending external URLs (YouTube, TikTok, Instagram) as separate Discord messages for optimal auto-embedding.

## Current Considerations

- Monitoring Twitter API rate limits during continuous operation.
- Implementing more robust error handling and logging (next steps).
- Planning the detailed approach for Weverse scraping, considering login and anti-bot measures.

## Next Steps

1.  **Monitor Bot Operation:** Observe bot performance under PM2.
2.  **Enhance Reliability:** (Future) Add more comprehensive health checks and error logging.
3.  **Weverse Integration Planning:** Begin detailed planning for the Weverse scraper.

## Open Questions

- Best practices for monitoring PM2 processes and bot health.
- Specific strategies for handling potential Twitter API rate limit issues in production.
- Detailed approach for Weverse login (cookie persistence vs. full re-login).
- Optimal check interval for Weverse updates to avoid overloading servers.
