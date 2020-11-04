const Discord = require('discord.js');
const client = new Discord.Client();

var token = 'your-token-goes-here';

client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);