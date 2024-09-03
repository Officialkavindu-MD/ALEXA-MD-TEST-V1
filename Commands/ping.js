module.exports = {
    name: 'ping',
    description: 'Ping command to check bot response time.',
    execute: async (client, message) => {
        const start = Date.now();
        await message.reply('*pong ✅*');
        const end = Date.now();
        const responseTime = end - start;
        await message.reply(`_Pong : ${responseTime} ms_`);
    },
};
