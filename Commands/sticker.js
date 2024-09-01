
const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: '.sticker',
    description: 'Converts an image to a WhatsApp sticker.',
    execute: async (client, message) => {
        // Check if the message has an image
        if (message.hasMedia) {
            const media = await message.downloadMedia();

            // Convert the media to a sticker with title and description
            const sticker = new MessageMedia(
                media.mimetype,
                media.data,
                'ALEXA-MD TEST V1 👨‍💻❤️✅',  // Sticker title
                { isSticker: true, caption: 'KAVI_OFFICIAL 😌❤️' } // Sticker description
            );

            // Send the sticker back with a mention to the command sender
            await message.reply(sticker, message.from, { mentions: [message.author] });
        } else {
            message.reply('Please send an image with the command to convert it into a sticker.');
        }
    }
};
