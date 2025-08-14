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
  }
};
