const fs = require('fs');
const path = require('path');

module.exports = {
    name: '.msgs',
    description: 'Shows the chat count of each participant in the group.',
    execute: async (client, message) => {
        const chat = await message.getChat();

        if (chat.isGroup) {
            const chatId = chat.id._serialized;
            const chatCountFile = path.join(__dirname, '../RunningData/chatCount.json');

            if (!fs.existsSync(chatCountFile)) {
                await message.reply('No chat data available.');
                return;
            }

            const chatCount = JSON.parse(fs.readFileSync(chatCountFile, 'utf-8'));

            if (!chatCount[chatId]) {
                await message.reply('No chat data available for this group.');
                return;
            }

            let reply = '*Group Chat Counts*\n\n';
            let totalMessages = 0;

            for (let [number, count] of Object.entries(chatCount[chatId])) {
                totalMessages += count;
                reply += `*${number}*: ${count} messages\n`;
            }

            reply += `\n*Total Messages*: ${totalMessages}`;
            await message.reply(reply);
        } else {
            await message.reply('This command can only be used in a group chat.');
        }
    },
};
