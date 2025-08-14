export default {
  async scheduled(event, env, ctx) {
    const urls = Object.keys(env)
      .filter(key => /^\d+$/.test(key)) 
      .map(key => env[key]);

    if (urls.length === 0) {
      console.log('No URLs configured to ping');
      return;
    }

    const pingPromises = urls.map(async (url) => {
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
      const urls = Object.keys(env)
        .filter(key => /^\d+$/.test(key))
        .map(key => env[key]);

      return new Response(
        urls.length > 0
          ? `Currently configured URLs to ping:\n\n${urls.join("\n")}`
          : "No URLs configured to ping",
        { status: 200, headers: { "Content-Type": "text/plain" } }
      );
    }

    return new Response("Not Found", { status: 404 });
  }
};

