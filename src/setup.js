// src/setup.js
const fs = require('fs');
const { validateBotToken, validateNumericInput, validateCronInput, convertToCron } = require('./utils/inputValidation');

async function runSetup() {
    try {
        const inquirer = await import('inquirer');

        const questions = [
            { 
                type: 'input', 
                name: 'token', 
                message: '| 1/5 | Enter your bot token (secret):',
                validate: validateBotToken
            },
            { 
                type: 'input', 
                name: 'clientId', 
                message: '| 2/5 | Enter your bot client ID (application ID):',
                validate: validateNumericInput
            },
            { 
                type: 'input', 
                name: 'guildId', 
                message: '| 3/5 | Enter your Discord server (guild) ID:',
                validate: validateNumericInput
            },
            { 
                type: 'input', 
                name: 'channelId', 
                message: '| 4/5 | Enter the channel ID where the bot should send messages:',
                validate: validateNumericInput
            },
            {
                type: 'input',
                name: 'schedule',
                message: '| 5/5 | Enter the interval for the scheduler (e.g., "daily", "weekly", "monthly", or a cron expression):',
                validate: (input) => convertToCron(input) ? true : validateCronInput(input)
            }
        ];

        const answers = await inquirer.default.prompt(questions);

        const schedule = convertToCron(answers.schedule);

        const config = {
            token: answers.token,
            clientId: answers.clientId,
            guildId: answers.guildId,
            channelId: answers.channelId,
            schedule: schedule
        };

        fs.writeFileSync('config/config.json', JSON.stringify(config, null, 4));
        console.log('\nSetup complete! Configuration saved to config/config.json');

        const inviteLink = `https://discord.com/oauth2/authorize?client_id=${answers.clientId}&scope=bot&permissions=2147483647`;
        console.log(`\nIf you haven't already, invite your bot to your server using this link:\n${inviteLink}\n`);

    } catch (error) {
        console.error('\n Error during setup:\n', error);
    }
}

module.exports = { runSetup };