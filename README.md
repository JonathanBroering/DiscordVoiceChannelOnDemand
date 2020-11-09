# Discord Voice Channels on Demand
This Bot creates a new Voice Channel on the Demand of the user.  
The Bot does NOT use any commands, but needs some setup to work.  
For now its specific for a single server, but might get updated to support multiple servers in the future, or not.

# Setup
**Besides from getting the Bot on your Server you need to do this setup**  
You will need:
- a channel for the creation of Client Channels
- a Category for the Bot to create the Client Channels in
- a wait Room in which **everyone has the right to move clients** (you wont be able to move them everywhere & its nessesary for the bot to work).  

![](https://github.com/jnthn-b/DiscordTalkChannel/blob/main/layout.PNG)  
This is the layout I use for the bot. The *create* and *waiting* channels dont have to be in a seperate Category.

Edit the index.js on the top to the ids of your channel.

# Usage
A User joins the create room & that opens up a new Client Channel for him in which he gets moved. Its only visible to him.  
If a friend wants to join he has to get into the waiting room from which the User can move him into his channel. Thats also the reason why the waiting channel need the move permission.  
If the User & all his friends leave the Channel it gets deleted.
