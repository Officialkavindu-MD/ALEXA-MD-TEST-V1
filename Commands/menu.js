const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: '.menu',
    description: 'Displays the bot commands and description.',
    execute: async (client, message) => {
        const chat = await message.getChat();

        // Bot description
        const botDescription = `*Bot Description:*\nThis is your personal WhatsApp bot. It can perform various commands as listed below:\n\n`;

        // List of commands
        const commandsList = `*Commands:*\n1. *.ping* - Responds with 'pong ✅' and shows the response time.\n2. *.alive* - Responds with 'I am alive now' and an image.\n3. *.menu* - Displays this menu with all available commands.\n\n`;

        // Full menu message
        const menuMessage = `${botDescription}${commandsList}*More commands coming soon!*`;

        // Load the image to send
        const media = MessageMedia.fromFilePath('MEDIA DATA/main_logo.png');

        // Send the image with the menu message as a caption
        client.sendMessage(chat.id._serialized, media, { caption: menuMessage });
    }
};
