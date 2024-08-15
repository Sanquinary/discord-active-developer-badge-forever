function handleError(error, context, clientId) {
    console.error(`${context}:`, error.message);
    if (context.includes('guild') && clientId) {
        console.log(`1. Invite your bot to your server using this link:\nhttps://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=2147483647`);
        console.log('2. Restart the bot');
    }
}

module.exports = { handleError };