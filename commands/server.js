module.exports = {
    name: "server",
    description:
        "Sends the amount of members and online members on this server.",
    aliases: ["server-info", "member", "users"],
    execute(message) {
        message.guild.members.fetch().then((fetchedMembers) => {
            const totalOnline = fetchedMembers.filter(
                (member) => member.presence.status !== "offline"
            );
            message.channel.send(
                `Es sind ${message.guild.memberCount} User auf dem Server, davon ${totalOnline.size} online!`
            );
        });
    },
};
