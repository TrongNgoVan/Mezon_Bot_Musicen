const dotenv = require("dotenv");
const { MezonClient } = require("mezon-sdk");
dotenv.config(); 

const handleIntro = require("./commands/intro");
const handlePlayURL = require("./commands/playurl");
const handleSearch = require("./commands/search");
const handleListMusic = require("./commands/listmusic");
const handleInfor = require("./commands/infor");
const handleRecommend = require("./commands/recommend");
const commandPlayMedia = require("./commands/playmedia");
const handlePlayMedia = require("./handle/playmedia");

async function main() {
  const client = new MezonClient({ botId: process.env.BOT_ID, token: process.env.BOT_TOKEN});// Nếu bot trong Product thì dùng cái này
  const tokenObj = await client.login();

// MEZON_TOKEN=4a7a6965765854466741474752636872 # DEV-TEST token
// BOT_ID=1840651530236071936 # FOR DEV-TEST
// NODE_TLS_REJECT_UNAUTHORIZED='0' # FOR DEV-TEST
// HOST_DEV =dev-mezon.nccsoft.vn
// PORT_DEV =8088
// this.client = new MezonClient(token, 'dev-mezon.nccsoft.vn', '8088');
  
  client.onMessageButtonClicked(async (ev) => {
    const buttonId = ev.button_id || '';

    if (buttonId.startsWith('button-play') || buttonId.startsWith('button-cancel')) { 
      await handlePlayMedia(client, ev);
    }
  });

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

    if (text.startsWith("*playmedia")) {
 
      return commandPlayMedia(client, event);
    }

    if (text.startsWith("*infor")) {
      return handleInfor(client, event);
    }

    if (text.startsWith("*recommend")) {
      return handleRecommend(client, event);
    }

  });

}

main()
  .then(() => console.log("Bot is running"))
  .catch(console.error);