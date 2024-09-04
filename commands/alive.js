const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: '.alive',
    description: 'Sends a voice message followed by "I am alive now" and an image.',
    execute: async (client, message) => {
        const chat = await message.getChat();

        // Load the voice message to send
        const voiceMessagePath = path.join(__dirname, 'MEDIA DATA', 'voice_message.mp3');
        const voiceMessage = MessageMedia.fromFilePath(voiceMessagePath);

        // Load the image to send
        const imagePath = path.join(__dirname, 'MEDIA DATA', 'main_logo.png');
        const image = MessageMedia.fromFilePath(imagePath);

        // Send the voice message first
        await client.sendMessage(chat.id._serialized, voiceMessage, { sendMediaAsVoice: true });

        // Send the image with the message
        await client.sendMessage(chat.id._serialized, '*HI, I AM ALEXA-MD WHATSAPP USER BOT ✅*', { media: image });
    }
};
