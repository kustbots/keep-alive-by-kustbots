export default {
  // List URLs here directly
  urlsToPing: [
    "https://example1.com",
    "https://example2.com",
    // Add more URLs as needed
  ],

  async scheduled(event, env, ctx) {
    if (this.urlsToPing.length === 0) {
      console.log('No URLs configured to ping');
      return;
    }

    const pingPromises = this.urlsToPing.map(async (url) => {
      try {
        const response = await fetch(url);
        console.log(`Pinged ${url}: ${response.status}`);
      } catch (error) {
        console.error(`Failed to ping ${url}:`, error.message);
      }
    });

    await Promise.all(pingPromises);
  },

  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response(
        this.urlsToPing.length > 0
          ? `Currently configured URLs to ping:\n\n${this.urlsToPing.join("\n")}`
          : "No URLs configured to ping",
        { status: 200, headers: { "Content-Type": "text/plain" } }
      );
    }

    return new Response("Not Found", { status: 404 });
  }
};

