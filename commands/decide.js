module.exports = {
    name: "decide",
    description: "Randomly chooses one of the arguments.",
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(
                `Gibt nix zu entscheiden! ${message.author}`
            );
        } else {
            var randomArg = Math.floor(Math.random() * args.length);
            return message.channel.send(
                `Ich habe mich für "${args[randomArg]}" entschieden! ${message.author}`
            );
        }
    },
};
