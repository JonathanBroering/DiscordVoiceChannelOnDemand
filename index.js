const Discord = require('discord.js');
const client = new Discord.Client();

// C O N F I G
var token = 'your-token-goes-here';
var newchannel_channel = 'create';

// Login
client.login(token);

// Output if the bot has connected to Discord
client.once('ready', () => {
	console.log('Bot is up & running!');
});

// Event if a Userer joined or switched his voice Channel
client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel
  
  // Check if the Channel the user joined/or switched to has the same name as the var newchannel_channel var
  if(newMember.channel !== null && oldMember.channel === null && newMember.channel.name === newchannel_channel || newMember.channel !== null && oldMember.channel !== null && newMember.channel.name === newchannel_channel){
  	console.log('User requested a new Channel!');
  }

})

