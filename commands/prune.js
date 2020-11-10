module.exports = {
    name: "prune",
    description:
        "Deletes a specific number of messages or all messages in channel.",
    adminRequired: true,
    aliases: ["delete"],
    execute(message, args) {
        if (!args.length) {
            message.channel.bulkDelete(2);
        } else if (args[0] === "all") {
            message.react("👍").then(() => message.react("👎"));

            const filter = (reaction, user) => {
                return (
                    ["👍", "👎"].includes(reaction.emoji.name) &&
                    user.id === message.author.id
                );
            };

            message
                .awaitReactions(filter, {
                    max: 1,
                    time: 20000,
                    errors: ["time"],
                })
                .then((collected) => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === "👍") {
                        message.channel.messages
                            .fetch({
                                limit: 100,
                            })
                            .then((messages) =>
                                message.channel.bulkDelete(messages, true)
                            );
                    } else {
                        message.delete();
                    }
                })
                .catch((collected) => {
                    message.reactions
                        .removeAll()
                        .catch((error) =>
                            console.error("Failed to clear reactions: ", error)
                        );
                    message.channel.send("... dann halt nicht! 🙄");
                });
        } else {
            message.channel.bulkDelete(parseInt(args[0]) + 1, true);
        }
    },
};
