const fs = require('fs');

async function runSetup() {
    try {
        const inquirer = await import('inquirer');

        const questions = [
            { type: 'input', name: 'token', message: '| 1/4 | Enter your bot token (secret):' },
            { type: 'input', name: 'clientId', message: '| 2/4 | Enter your bot client ID (application ID):' },
            { type: 'input', name: 'guildId', message: '| 3/4 | Enter your Discord server (guild) ID:' },
            { type: 'input', name: 'channelId', message: '| 4/4 | Enter the channel ID where the bot should send messages:' },
        ];

        const answers = await inquirer.default.prompt(questions);

        fs.writeFileSync('config.json', JSON.stringify(answers, null, 4));
        console.log('Configuration saved to config.json');
    } catch (error) {
        console.error('Error during setup:', error);
    }
}

module.exports = { runSetup };
