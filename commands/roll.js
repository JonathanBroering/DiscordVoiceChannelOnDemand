module.exports = {
    name: "roll",
    description: "Rolls a dice.",
    aliases: ["dice", "random", "number"],
    execute(message) {
        const rollDice = () => Math.floor(Math.random() * 6) + 1;
        message.channel.send(
            `🎲 ${message.author} hat eine ${rollDice()} gewürfelt! 🎲`
        );
    },
};
