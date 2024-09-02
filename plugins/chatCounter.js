const fs = require('fs');
const path = require('path');

// Create or load the chat data from the RunningData folder
const dataDir = path.join(__dirname, '../RunningData');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const chatCountFile = path.join(dataDir, 'chatCount.json');
let chatCount = {};

if (fs.existsSync(chatCountFile)) {
    chatCount = JSON.parse(fs.readFileSync(chatCountFile, 'utf-8'));
}

// Function to update chat count for each number
function updateChatCount(message) {
    const chatId = message.from;
    const author = message.author || message.from; // For private chats, author will be undefined

    if (!chatCount[chatId]) {
        chatCount[chatId] = {};
    }

    if (!chatCount[chatId][author]) {
        chatCount[chatId][author] = 0;
    }

    chatCount[chatId][author] += 1;

    // Save updated chat count to file
    fs.writeFileSync(chatCountFile, JSON.stringify(chatCount, null, 2));
}

module.exports = {
    updateChatCount,
};
