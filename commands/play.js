const SONGS = {
  "1": "https://cdn.mezon.ai/sounds/7346483973050015537.mp3",
};

module.exports = async function handlePlay(client, event, meetingCode, token) {
  try {
    const channel = await client.channels.fetch(event.channel_id);

    // Lấy id bài hát từ lệnh, ví dụ: *playmusic 1
    const text = event?.content?.t || "";
    const match = text.match(/\*playmusic\s+(\d+)/i);
    const songId = match ? match[1] : "1"; // Mặc định là "1" nếu không có id
    const songUrl = SONGS[songId] || SONGS["1"];

    const replyText = meetingCode
      ? ` Đang phát nhạc ID ${songId}: ${songUrl}\nVào meeting_code: ${meetingCode}`
      : ` Đang phát nhạc ID ${songId}: ${songUrl}\n(Không có meeting code)`;

    
    const message = await channel.messages.fetch(event.message_id);
    await message.reply(
        { t: replyText, songUrl, meetingCode, token }, 
    );

  } catch (err) {
    console.error(err);
  }
};