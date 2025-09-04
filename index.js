const dotenv = require("dotenv");
const { MezonClient } = require("mezon-sdk");
dotenv.config(); 
// Import các lệnh xử lý bot nhạc
const handlePlay = require("./commands/play");
const handleHelp = require("./commands/help");
const handleSearch = require("./commands/search");





async function main() {
  // const client = new MezonClient(process.env.APPLICATION_TOKEN); // Nếu bot trong Product thì dùng cái này
  const client = new MezonClient(process.env.MEZON_TOKEN, process.env.HOST_DEV, process.env.PORT_DEV);
  const tokenObj = await client.login();
  const token = typeof tokenObj === "string" ? JSON.parse(tokenObj).token : tokenObj.token;
  console.log("Bot logged in with token này:", token);



 
  client.onChannelMessage(async (event) => {
    const text = event?.content?.t?.toLowerCase();
    if (!text) return;

    if (text.startsWith("*help")) {
      return handleHelp(client, event);
       
    }

   
    if (text.startsWith("*playmusic")) {
     

      return handlePlay(client, event);

    }

    if (text.startsWith("*searchmusic")) {
      return handleSearch(client, event);
    }

  });
}

main()
  .then(() => console.log("🚀 Bot is running"))
  .catch(console.error);