# Right Message Stream

A Next.js (App Router) project that provides a **Perplexity-style chat interface** for generating multi-channel marketing campaign blueprints.

## Features

- Perplexity-inspired chat UI with streaming responses.
- Connect to data sources (Shopify, Google Ads, Facebook Page).
- Enable channels (Email, SMS, WhatsApp, Push).
- Generates structured JSON campaign plans (right time, right channel, right message, right audience).
- Dark/light theme toggle, sidebar navigation, and copy-to-clipboard JSON export.

## Getting Started

1. Clone the repo and install dependencies:

   ```bash
   pnpm install
   pnpm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
lib/components/RightMessageStream/  # Main chat interface and panels
public/                             # Static assets (favicon, etc.)
app/page.tsx                        # Entry point (uses RightMessageStream)
```

## Possible Improvements

- Integrate with **Vercel AI SDK** for true LLM-powered responses instead of local mock JSON.

## License

MIT
