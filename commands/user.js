module.exports = {
    name: "user",
    description: "Sends tag and ID of a user.",
    aliases: ["user-info"],
    execute(message) {
        if (!message.mentions.users.size) {
            return message.channel.send(
                `User: ${message.author.tag}\nID: ${message.author.id}`
            );
        }
        const taggedUser = message.mentions.users.first();
        message.channel.send(`User: ${taggedUser.tag}\nID: ${taggedUser.id}`);
    },
};
