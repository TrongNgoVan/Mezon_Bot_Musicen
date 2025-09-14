
module.exports = async function handlePlayURL(client, event) {
  try {
    const channel = await client.channels.fetch(event.channel_id);
    const text = event?.content?.t || "";
    const match = text.match(/\*playurl\s+(\S+)/i);
    const songUrl = match ? match[1] : null;
    if (!songUrl) {
      const msg = await channel.messages.fetch(event.message_id);
      await msg.reply({ t: "Vui lòng nhập đúng cú pháp: *playurl <url>" });
      return;
    }


    const playResult = await channel.playMedia(
      songUrl,
      event.sender_id,
      "BotPlayMedia",
      `Music from URL`
    );
    console.log("Kết quả phát nhạc:", playResult);
    const msg = await channel.messages.fetch(event.message_id);
    await msg.reply({ t: `Đã gửi yêu cầu phát nhạc. Kết quả: ${typeof playResult === "object" ? JSON.stringify(playResult) : playResult}` });
  } catch (err) {
    console.error(err);
  }
};