const grcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({

authStrategy: new LocalAuth(),

});

client.on('qr', qr => {

grcode.generate(qr, {small: true});

});

client.on('ready', () => {

console.log('BOTIS SUCCESSFULLY CONNECTED ✅');

});

client.on('message', message => {

if(message.body === '.ping') {

message.reply('pong ✅');

}

});

client.initialize();
