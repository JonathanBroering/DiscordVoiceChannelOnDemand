const Discord = require("discord.js");
const fs = require("fs");
const jsonfile = require("jsonfile");
const client = new Discord.Client();

// Import config file with bot token,
// the voice channel id which creates a new channel if joined
// and the category in which all the private Channels will be created in
const {
    cmdPrefix,
    botToken,
    createChannelId,
    channelCategoryId,
    serverId,
} = require("./config.json");

client.commands = new Discord.Collection();

const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

var userchannellist = [];

// Login
client.login(botToken);

// Output if the bot has connected to Discord
client.once("ready", () => {
    console.log(`${client.user.username} is up & running!`);
    setActivityWatching();
});

client.on("guildMemberAdd", async (member) => {
    setActivityWatching();
    // send notification to log channel?
    // member.send('something');
});

client.on("guildMemberRemove", async (member) => {
    setActivityWatching();
    // send notification to log channel?
});

// Listen for commands
client.on("message", async (message) => {
    if (!message.content.startsWith(cmdPrefix)) return;

    let args = message.content.slice(cmdPrefix.length).split(/ +/);
    let commandName = args.shift().toLowerCase();

    let command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );

    if (!command) {
        return message.channel.send(
            `Weiß nicht, was ${message.author} von mir will! 🤔`
        );
    }

    if (
        command.adminRequired &&
        !message.member.roles.cache.some((role) => role.name === "Admin")
    ) {
        return message.channel.send(`Ich höre nicht auf ${message.author}! 🤪`);
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("da ist wohl etwas schiefgelaufen! 😬");
    }
});

// Event if a user joined or switched his voice Channel
client.on("voiceStateUpdate", (oldMember, newMember) => {
    // Check if the Channel the user joined or switched to has the same id as newchannel
    if (newMember.channel && newMember.channel.id === createChannelId) {
        var current_user = newMember.member.user;
        console.log(
            current_user.username +
                " requested a new Channel, setting up the Channel now!"
        );

        // Create a new voice channel for the request
        var server = newMember.guild;
        // Set up the voice channel with the permissions for it
        // Only the creator can connect to his channel and move users into it
        var channel = {
            type: "voice",
            parent: channelCategoryId,
            permissionOverwrites: [
                {
                    id: server.id,
                    deny: ["CONNECT"],
                    allow: ["VIEW_CHANNEL", "SPEAK"],
                },
                {
                    id: current_user.id,
                    allow: ["VIEW_CHANNEL", "CONNECT", "MOVE_MEMBERS"],
                },
            ],
        };
        server.channels
            .create(current_user.username, channel)
            .then((channel) => {
                newMember.setChannel(channel).catch(console.error);
                userchannellist.push(channel);
            });
    }

    // Delete userchannel if the channel was created with this bot & is empty now
    if (
        oldMember.channel &&
        userchannellist.includes(oldMember.channel) &&
        oldMember.channel.members.size === 0
    ) {
        oldMember.channel.delete();
    }
});

// Updates the status of the bot to show the size of the server
function setActivityWatching() {
    client.user.setActivity(
        `over ${
            client.guilds.cache.find((guild) => guild.id === serverId)
                .memberCount
        } members`,
        { type: "WATCHING" }
    );
}
