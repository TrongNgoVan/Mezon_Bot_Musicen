module.exports = async function handleIntro(client, event) {
  try {
    const channel = await client.channels.fetch(event.channel_id);

    // Định dạng đẹp cho message
    const introText = `👋 Xin chào!\n🎧 Tôi là bot hỗ trợ phát media trong voice channel trên Mezon.\n✨ *Các lệnh bạn có thể sử dụng:*`;

    // Block hướng dẫn lệnh
    const preText = `
*playmusic <url>
  🎵 Phát nhạc từ URL (mp3, mp4, m3u8)
  Ví dụ: *playmusic https://cdn.mezon.ai/sounds/7346483973050015537.mp3
  ⚠️ Đảm bảo đã join voice channel trước khi phát media
  ℹ️ Ping bot trong voice channel sẽ không reply, nhạc vẫn phát

*playid <id>
  🔎 Phát nhạc theo ID bài hát có sẵn trong hệ thống
  Ví dụ: *playid 2

*listmusic
  📑 Xem danh sách bài hát có sẵn

*searchmusic <từ khóa>
  ▶️ Tìm kiếm video YouTube, trả về link và trình diễn video trên chat
  Ví dụ: *searchmusic thất tình
`;

    // mk chỉ cho block code
    const t = introText + "\n" + preText;
    const mk = [
      { type: "pre", s: introText.length + 2, e: t.length }
    ];

    const message = await channel.messages.fetch(event.message_id);
    await message.reply({
      t,
      mk
    });

  } catch (err) {
    console.error(err);
  }
}