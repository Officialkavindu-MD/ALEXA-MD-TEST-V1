const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

// Initialize the client
const client = new Client({
    authStrategy: new LocalAuth(),
});

// Generate QR code for authentication
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Notify when the bot is ready
client.on('ready', () => {
    console.log('BOT IS SUCCESSFULLY CONNECTED ✅');
});

// Load and set up commands from the 'commands' folder
client.commands = new Map();
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Message handler
client.on('message', async message => {
    const args = message.body.trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);
    try {
        await command.execute(client, message);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

// Initialize the client
client.initialize();

