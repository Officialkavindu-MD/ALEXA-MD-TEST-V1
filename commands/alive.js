const { MessageMedia, Buttons } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: '.alive',
    description: 'Displays bot status, information, and an image along with a voice message and buttons.',
    execute: async (client, message) => {
        const chat = await message.getChat();

        // Load the voice message to send
        const voiceMessagePath = path.join(__dirname, 'MEDIA DATA', 'voice_message.mp3');
        const voiceMessage = MessageMedia.fromFilePath(voiceMessagePath);

        // Load the image to send
        const imagePath = path.join(__dirname, 'MEDIA DATA', 'main_logo.png');
        const image = MessageMedia.fromFilePath(imagePath);

        // Calculate uptime
        const totalSeconds = process.uptime();
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor(totalSeconds / 3600) % 24;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const seconds = Math.floor(totalSeconds % 60);

        const uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        // Compose the bot's status message
        const aliveMessage = `*🔥 ALEXA-MD BOT STATUS 🔥*

👤 *Owner:* _KAVI_OFFICIAL_  
📞 *Contact:* +94704467936

*🛠 Bot Version:*   _v1.0.0_
*📅 Uptime:* _${uptime}_

*ℹ️ About ALEXA-MD:*
_This bot is a powerful WhatsApp multi-device bot designed to automate your tasks and provide seamless interaction on WhatsApp. Managed by KAVI_OFFICIAL, this bot is constantly being updated with new features._

*✨ Features:*
- _Automated Responses_
- _Media Processing_
- _Custom Commands_

_Thank you for using ALEXA-MD!_ ✅`;

        // Create buttons
        const buttons = new Buttons(aliveMessage, [
            { body: 'PING', id: '.ping' },
            { body: 'MENU', id: '.menu' },
            { body: 'CHANNEL', id: 'https://whatsapp.com/channel/0029Vao2hao0Qeah97zMJZ3w' } // Replace with your WhatsApp channel link
        ], 'ALEXA-MD Bot');

        // Send the voice message first
        await client.sendMessage(chat.id._serialized, voiceMessage, { sendMediaAsVoice: true });

        // Send the message with buttons and image
        await client.sendMessage(chat.id._serialized, buttons, { media: image });
    }
};
