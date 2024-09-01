module.exports = {
    name: '.ping',
    description: 'Responds with "pong ✅" and response time.',
    execute: async (client, message) => {
        // Start time when the command is received
        const startTime = Date.now();

        // Send the pong message
        const reply = await message.reply('pong ✅');

        // Calculate the response time
        const responseTime = Date.now() - startTime;

        // Edit the reply to include the response time
        await reply.edit(`pong ✅\nResponse time: ${responseTime} ms`);
    }
};
