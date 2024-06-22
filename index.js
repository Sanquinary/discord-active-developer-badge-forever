const fs = require('fs');
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const cron = require('node-cron');
const { runSetup } = require('./setup');
const { saveNextExecutionTime, loadNextExecutionTime } = require('./utils');

async function startBot() {
    // Check if config.json exists and is complete
    function isConfigComplete(config) {
        return config.token && config.clientId && config.guildId && config.channelId;
    }

    if (!fs.existsSync('config.json')) {
        console.log('Configuration file not found. Running setup...');
        await runSetup();
    }

    const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

    if (!isConfigComplete(config)) {
        console.log('Configuration file is incomplete. Running setup...');
        await runSetup();
    }

    // Reload the config after setup
    const finalConfig = JSON.parse(fs.readFileSync('config.json', 'utf8'));

    // Your bot setup
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    const rest = new REST({ version: '10' }).setToken(finalConfig.token);

    client.once('ready', () => {
        console.log('Bot is online!');

        // Load or set next execution time
        let nextExecutionTime = loadNextExecutionTime();
        if (!nextExecutionTime) {
            nextExecutionTime = new Date();
            nextExecutionTime.setMonth(nextExecutionTime.getMonth() + 1);
            nextExecutionTime.setDate(1);
            nextExecutionTime.setHours(0, 0, 0, 0);
            saveNextExecutionTime(nextExecutionTime);
        }
        console.log(`Next /ping command scheduled for: ${nextExecutionTime}`);

        // Schedule the command
        cron.schedule('0 0 1 * *', async () => { // Every month on the 1st at 00:00
            console.log('Executing scheduled /ping command...');
            const channel = await client.channels.fetch(finalConfig.channelId);
            await channel.send('/ping');
            nextExecutionTime = new Date();
            nextExecutionTime.setMonth(nextExecutionTime.getMonth() + 1);
            nextExecutionTime.setDate(1);
            nextExecutionTime.setHours(0, 0, 0, 0);
            saveNextExecutionTime(nextExecutionTime);
        });
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        const { commandName } = interaction;

        if (commandName === 'ping') {
            await interaction.reply('Pong!');
        }
    });

    client.login(finalConfig.token);

    // Register commands
    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationGuildCommands(finalConfig.clientId, finalConfig.guildId),
                { body: [{ name: 'ping', description: 'Replies with Pong!' }] },
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}

startBot();
