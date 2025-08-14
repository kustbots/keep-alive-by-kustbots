# Cloudflare URL Pinger

A simple Cloudflare Worker that pings multiple URLs every minute to keep them active.

## Features
- Pings multiple URLs every minute
- Easy configuration through environment variables
- One-click deployment to Cloudflare Workers
- Automatic cron trigger setup (every minute)

## Configuration
Set your URLs using numbered environment variables:
- `1` = First URL to ping
- `2` = Second URL to ping
- `3` = Third URL to ping
- And so on...


## Deployment
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/kustbots/keep-alive-by-kustbots)

### Deployment Steps:
1. Click the "Deploy to Cloudflare Workers" button above
2. You'll be prompted to configure environment variables:
   - Replace the example URLs with your actual URLs
   - Add more numbered variables (4, 5, etc.) if needed
3. Click "Deploy" - everything else is configured automatically!

## How It Works
1. The Worker runs automatically every minute via cron trigger
2. It reads all environment variables with numeric names (1, 2, 3, etc.)
3. Sends a GET request to each URL
4. Logs success/failure status to Cloudflare Workers dashboard

## Requirements
- Cloudflare account
- GitHub repository (for one-click deployment)

## Monitoring
Check ping results in Cloudflare Workers dashboard under "Workers" > "Your Worker" > "Logs"
