const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: '.ytmp3',
    description: 'Download YouTube video as MP3',

    execute: async (client, message) => {
        const args = message.body.split(' ');

        if (args.length < 2) {
            await message.reply('Please provide a YouTube link.');
            return;
        }

        const url = args[1];
        
        if (!ytdl.validateURL(url)) {
            await message.reply('Invalid YouTube URL. Please try again with a valid link.');
            return;
        }

        const info = await ytdl.getInfo(url);
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
        const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
        const filePath = path.join(__dirname, `${title}.mp3`);

        await message.reply(`Downloading *${title}* as MP3. Please wait...`);

        ytdl(url, { format: audioFormats[0] })
            .pipe(fs.createWriteStream(filePath))
            .on('finish', async () => {
                const media = MessageMedia.fromFilePath(filePath);
                await client.sendMessage(message.from, media, { caption: `*${title}* has been downloaded as MP3.` });
                fs.unlinkSync(filePath); // Delete the file after sending
            })
            .on('error', async () => {
                await message.reply('Error downloading the video. Please try again later.');
            });
    }
};
