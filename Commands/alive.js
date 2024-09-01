const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: 'alive',
    description: 'Responds with "I am alive now" and an image.',
    execute: async (client, message) => {
        const chat = await message.getChat();

        // Load an image to send
        const media = MessageMedia.fromFilePath('path_to_your_image.jpg');

        // Send the image with the message
        client.sendMessage(chat.id._serialized, 'I am alive now', { media });
    }
};
