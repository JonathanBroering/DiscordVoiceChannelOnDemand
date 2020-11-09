const Discord = require('discord.js');
const client = new Discord.Client();

// C O N F I G
// Your Bot token
var token = 'token';
// the voice channel id which creates a new, private Channel, if joined
var newchannel_id = 'channel';
// the category in which all the private Channels will be created in
var privatechannel_id = 'category';
// C O N F I G

var userchannellist = [] 


// Login
client.login(token);

// Output if the bot has connected to Discord
client.once('ready', () => {
	console.log('Bot is up & running!');
});

// Event if a Userer joined or switched his voice Channel
client.on('voiceStateUpdate', (oldMember, newMember) => {
  
  // Check if the Channel the user joined or switched to has the same id as newchannel_channel | dunno if this is the right way to do it, seems messy
  if(newMember.channel !== null && oldMember.channel === null && newMember.channel.id === newchannel_id || newMember.channel !== null && oldMember.channel !== null && newMember.channel.id === newchannel_id){
    var current_user = newMember.member.user
    console.log(current_user.username + ' requested a new Channel, setting up the Channel now!');
    
    // This will create a new voice channel for the request
    var server = newMember.guild;
    // This sets up the voice channel with the permissions for it
    var channel = {type: 'voice', parent: privatechannel_id, permissionOverwrites: [{id: server.id, deny: ['VIEW_CHANNEL']},{id: current_user.id, allow: ['MOVE_MEMBERS']}]};
    server.channels.create(current_user.username, channel).then(channel => { newMember.setChannel(channel); userchannellist.push(channel)});
    }
  
  // deltes userchannel if the channel was created with this bot & is empty now
  if(oldMember.channel !== null && userchannellist.includes(oldMember.channel) && oldMember.channel.members.size === 0){
      oldMember.channel.delete();
  }
})

