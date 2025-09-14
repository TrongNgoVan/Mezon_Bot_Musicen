const dotenv = require("dotenv");
const { MezonClient } = require("mezon-sdk");
dotenv.config(); 

const handleIntro = require("./commands/intro");
const handlePlayURL = require("./commands/playurl");
const handleSearch = require("./commands/search");
const handleListMusic = require("./commands/listmusic");
const handlePlayId = require("./commands/playid");

async function main() {
  const client = new MezonClient(process.env.APPLICATION_TOKEN); // Nếu bot trong Product thì dùng cái này
  const tokenObj = await client.login();
  
  client.onChannelMessage(async (event) => {
    const text = event?.content?.t?.toLowerCase();
    if (!text) return;

    if(text.startsWith("*intro")) {
      return handleIntro(client, event);
    }

    if (text.startsWith("*searchmusic")) {
      return handleSearch(client, event);
    }

    if (text.startsWith("*playurl")) {
      return handlePlayURL(client, event);
    }

    if (text.startsWith("*listmusic")) {

      return handleListMusic(client, event);
    }

    if (text.startsWith("*playid")) {
 
      return handlePlayId(client, event);
    }

  });

}

main()
  .then(() => console.log("Bot is running"))
  .catch(console.error);