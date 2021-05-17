const Discord = require('discord.js');
const client = new Discord.Client();

// C O N F I G
// your Bot token
var token = 'token';
// if this channel is being joined, a private channel is created for the user
var newchannel_id = 'channel';
// the category in which all the private channels will be created in
var privatechannel_id = 'category';
// C O N F I G

var userchannellist = [] 


// Login
client.login(token);

// waiting for the discord connection
client.once('ready', () => {
	console.log('Connected to Discord and waiting for work!');
});

// Event if a User joined, or switched the voice channel
client.on('voiceStateUpdate', (oldMember, newMember) => {
  
  // Check if the Channel, the user joined or switched to, has the same id as newchannel_channel | this is kinda messy, but it works...
  if(newMember.channel !== null && oldMember.channel === null && newMember.channel.id === newchannel_id || newMember.channel !== null && oldMember.channel !== null && newMember.channel.id === newchannel_id){
    var current_user = newMember.member.user;
    console.log(current_user.username + ' requested a new Channel, creating the channel now.');
    
    // Start the creation of the new channel
    var server = newMember.guild;
    // This sets up the voice channel with the required permissions for the channel owner
    var channel = {type: 'voice', parent: privatechannel_id, permissionOverwrites: [{id: server.id, deny: ['VIEW_CHANNEL']},{id: current_user.id, allow: ['MOVE_MEMBERS']}]};
    server.channels.create(current_user.username, channel).then(channel => { newMember.setChannel(channel); userchannellist.push(channel)});
    }
  
  // delte a user channel if the channel was created with this bot & is empty
  if(oldMember.channel !== null && userchannellist.includes(oldMember.channel) && oldMember.channel.members.size === 0){
      oldMember.channel.delete();
  }
})

