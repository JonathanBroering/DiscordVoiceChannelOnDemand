const Discord = require("discord.js");
const fs = require("fs");
const jsonfile = require("jsonfile");
const client = new Discord.Client();

// Import config file with bot token,
// the voice channel id which creates a new, private Channel, if joined,
// and the category in which all the private Channels will be created in
const {
    prefix,
    token,
    newchannel_id,
    privatechannel_id,
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
client.login(token);

// Output if the bot has connected to Discord
client.once("ready", () => {
    console.log("Bot is up & running!");
});

// Listen for commands
client.on("message", async (message) => {
    if (!message.content.startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).split(/ +/);
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

// Event if a Userer joined or switched his voice Channel
client.on("voiceStateUpdate", (oldMember, newMember) => {
    // Check if the Channel the user joined or switched to has the same id as newchannel_channel | dunno if this is the right way to do it, seems messy
    if (
        (newMember.channel !== null &&
            oldMember.channel === null &&
            newMember.channel.id === newchannel_id) ||
        (newMember.channel !== null &&
            oldMember.channel !== null &&
            newMember.channel.id === newchannel_id)
    ) {
        var current_user = newMember.member.user;
        console.log(
            current_user.username +
                " requested a new Channel, setting up the Channel now!"
        );

        // This will create a new voice channel for the request
        var server = newMember.guild;
        // This sets up the voice channel with the permissions for it
        var channel = {
            type: "voice",
            parent: privatechannel_id,
            permissionOverwrites: [
                { id: server.id, deny: ["VIEW_CHANNEL"] },
                { id: current_user.id, allow: ["MOVE_MEMBERS"] },
            ],
        };
        server.channels
            .create(current_user.username, channel)
            .then((channel) => {
                newMember.setChannel(channel);
                userchannellist.push(channel);
            });
    }

    // deltes userchannel if the channel was created with this bot & is empty now
    if (
        oldMember.channel !== null &&
        userchannellist.includes(oldMember.channel) &&
        oldMember.channel.members.size === 0
    ) {
        oldMember.channel.delete();
    }
});
