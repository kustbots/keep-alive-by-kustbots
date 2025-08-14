export default {
  async scheduled(event, env, ctx) {
    // Get all environment variables starting with a number
    const urls = Object.keys(env)
      .filter(key => /^\d+$/.test(key))  // Only numeric keys
      .map(key => env[key]);             // Get URL values

    if (urls.length === 0) {
      console.log('No URLs configured to ping');
      return;
    }

    // Ping each URL
    const pingPromises = urls.map(async (url) => {
      try {
        const response = await fetch(url);
        console.log(`Pinged ${url}: ${response.status}`);
      } catch (error) {
        console.error(`Failed to ping ${url}:`, error.message);
      }
    });

    await Promise.all(pingPromises);
  }
};
