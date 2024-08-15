// index.js
const fs = require('fs');
const { Client, GatewayIntentBits, REST, Routes, EmbedBuilder } = require('discord.js');
const { runSetup } = require('./src/setup');
const { saveNextExecutionTime } = require('./src/utils/utils');
const { handleError } = require('./src/utils/errorHandler');

// Function to check if the config is complete
function isConfigComplete(config) {
    return config.token && config.clientId && config.guildId && config.channelId && config.schedule;
}

// Function to send server stats
async function sendServerStats(channel, client) {
    const guild = channel.guild;
    const memberCount = guild.memberCount;
    const owner = await guild.fetchOwner();
    const createdAt = guild.createdAt.toDateString();

    // Constructing an embedded message
    const serverStatsEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`Server Stats for ${guild.name}`)
        .setThumbnail(guild.iconURL())
        .addFields(
            { name: 'Member Count', value: `${memberCount}`, inline: true },
            { name: 'Server Owner', value: `${owner.user.tag}`, inline: true },
            { name: 'Created On', value: `${createdAt}`, inline: true }
        )
        .setFooter({ text: 'Server Stats', iconURL: client.user.avatarURL() });

    await channel.send({ embeds: [serverStatsEmbed] });
}

// Function to schedule commands
async function scheduleCommands(channel, client) {
    try {
        await sendServerStats(channel, client);
        let nextExecutionTime = new Date();
        nextExecutionTime.setMonth(nextExecutionTime.getMonth() + 1);
        nextExecutionTime.setDate(1);
        nextExecutionTime.setHours(0, 0, 0, 0);
        saveNextExecutionTime(nextExecutionTime);
        console.log(`Scheduled command will be sent on: ${nextExecutionTime}`);
    } catch (error) {
        handleError(error, 'Failed to send scheduled command', client.user.id);
    }
}

// Function to register commands
async function registerCommands(finalConfig) {
    const rest = new REST({ version: '10' }).setToken(finalConfig.token);
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationGuildCommands(finalConfig.clientId, finalConfig.guildId),
            {
                body: [
                    { name: 'ping', description: 'Replies with Pong and shows latency!' },
                    { name: 'serverstats', description: 'Shows server statistics.' }
                ]
            }
        );
        console.log('Successfully refreshed application (/) commands.');
    } catch (error) {
        handleError(error, 'Error registering commands', finalConfig.clientId);
    }
}

async function startBot() {
    if (!fs.existsSync('config/config.json')) {
        console.log('Configuration file not found. Running setup...');
        await runSetup();
    }

    const config = JSON.parse(fs.readFileSync('config/config.json', 'utf8'));

    if (!isConfigComplete(config)) {
        console.log('Configuration file is incomplete. Running setup...');
        await runSetup();
    }

    // Reload the config after setup
    const finalConfig = JSON.parse(fs.readFileSync('config/config.json', 'utf8'));

    // Minimal bot setup to check if the bot is in the server
    const client = new Client({
        intents: [GatewayIntentBits.Guilds]
    });

    client.once('ready', async () => {
        console.log('Bot is online!');
        try {
            // Full bot setup
            client.options.intents = [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
            ];

            const channel = await client.channels.fetch(finalConfig.channelId);
            scheduleCommands(channel, client);
            registerCommands(finalConfig);
        } catch (error) {
            handleError(error, 'An error occurred while fetching the guild', finalConfig.clientId);
        }
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        if (interaction.commandName === 'ping') {
            const sent = await interaction.reply({ content: 'Pong!', fetchReply: true });
            const latency = sent.createdTimestamp - interaction.createdTimestamp;
            await interaction.editReply(`🏓 Latency is ${latency}ms.`);
        } else if (interaction.commandName === 'serverstats') {
            try {
                await sendServerStats(interaction.channel, client);
                await interaction.reply({ content: 'Here are the server stats!', ephemeral: true });
            } catch (error) {
                handleError(error, 'Failed to send server stats', finalConfig.clientId);
                await interaction.reply({ content: 'Failed to retrieve server stats. Please try again later.', ephemeral: true });
            }
        }
    });

    client.login(finalConfig.token);
}

startBot();