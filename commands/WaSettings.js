const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: 'WaSettings',
    description: 'Manage group settings like mute, unmute, and set group profile picture.',

    commands: {
        '.mute': async (client, message) => {
            const chat = await message.getChat();
            if (chat.isGroup) {
                if (chat.participants.some(participant => participant.id._serialized === message.author && participant.isAdmin)) {
                    await chat.setMessagesAdminsOnly(true);
                    await message.reply('*Group Chat is Muted ✅*');
                } else {
                    await message.reply('You must be an admin to use this command.');
                }
            } else {
                await message.reply('This command can only be used in a group chat.');
            }
        },

        '.unmute': async (client, message) => {
            const chat = await message.getChat();
            if (chat.isGroup) {
                if (chat.participants.some(participant => participant.id._serialized === message.author && participant.isAdmin)) {
                    await chat.setMessagesAdminsOnly(false);
                    await message.reply('*Group Chat is Unmuted ✅*');
                } else {
                    await message.reply('You must be an admin to use this command.');
                }
            } else {
                await message.reply('This command can only be used in a group chat.');
            }
        },

        '.setdp': async (client, message) => {
            const chat = await message.getChat();
            if (chat.isGroup) {
                if (message.hasMedia) {
                    const media = await message.downloadMedia();
                    const image = new MessageMedia(media.mimetype, media.data);
                    await chat.setPicture(image);
                    await message.reply('*Group Profile is Updated ✅*');
                } else {
                    await message.reply('Please send an image with the command to set it as the group profile picture.');
                }
            } else {
                await message.reply('This command can only be used in a group chat.');
            }
        }
    },

    execute: async function(client, message) { // Use function instead of arrow function to ensure correct context
        const args = message.body.split(' ')[0];
        
        // Check if the command exists in the commands list
        if (this.commands[args]) {
            await this.commands[args](client, message);
        }
    }
};
