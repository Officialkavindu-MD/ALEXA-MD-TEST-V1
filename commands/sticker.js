const { MessageMedia } = require('whatsapp-web.js');
const sharp = require('sharp');

module.exports = {
    name: '.sticker',
    description: 'Converts an image to a WhatsApp sticker.',
    execute: async (client, message) => {
        // Check if the message has an image
        if (message.hasMedia) {
            const media = await message.downloadMedia();
            
            // Convert the image to a sticker using sharp
            sharp(Buffer.from(media.data, 'base64'))
                .resize(512, 512, { fit: 'inside' })
                .webp({ lossless: true })
                .toBuffer()
                .then((data) => {
                    const sticker = new MessageMedia('image/webp', data.toString('base64'));
                    
                    // Send the sticker back
                    client.sendMessage(message.from, sticker, {
                        sendMediaAsSticker: true,
                        stickerAuthor: 'KAVI_OFFICIAL 😌❤️',
                        stickerName: 'ALEXA-MD TEST V1 👨‍💻❤️✅'
                    });
                })
                .catch(err => {
                    console.error(err);
                    client.sendMessage(message.from, 'Failed to create sticker.');
                });
        } else {
            message.reply('Please send an image with the command to convert it into a sticker.');
        }
    }
};
