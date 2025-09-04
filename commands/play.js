const SONGS = {
  "1": "https://cdn.mezon.ai/sounds/7346483973050015537.mp3",
};

module.exports = async function handlePlay(client, event) {
  try {
    const channel = await client.channels.fetch(event.channel_id);


    const text = event?.content?.t || "";
    const match = text.match(/\*playmusic\s+(\d+)/i);
    const songId = match ? match[1] : "1"; 
    const songUrl = SONGS[songId] || SONGS["1"];

    const playResult = await channel.callPlayMediaApi(
       songUrl,
       event.sender_id,
       "BotMusic",
       `Music ${songId}`
    );

    console.log("Kết quả phát nhạc:", playResult);
   
    const msg = await channel.messages.fetch(event.message_id);
    
    await msg.reply(
      { t: `Đã gửi yêu cầu phát nhạc. Kết quả: ${typeof playResult === "object" ? JSON.stringify(playResult) : playResult}` }
    );


  } catch (err) {
    console.error(err);
  }
};