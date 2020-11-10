module.exports = {
    name: "say",
    description:
        "Echoes a message to a specific channel. First argument is message ID. Second argument is channel ID.",
    aliases: ["send", "message", "sendmessage", "echo"],
    adminRequired: true,
    execute(message, args) {
        message.guild.channels.cache
            .get(args[1])
            .send(message.channel.messages.cache.get(args[0]))
            .catch((err) => console.log(err));
    },
};
