module.exports = {
    name: "ping",
    description: "Ping!",
    execute(message) {
        const startTime = message.createdTimestamp;
        message.channel.send("pong?").then((msg) => {
            const endTime = msg.createdTimestamp;
            msg.edit(`pong! (${endTime - startTime} ms)`);
        });
    },
};
