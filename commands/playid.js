module.exports = async function handlePlayId(client, event) {
  const fs = require('fs');
  const path = require('path');

  let channel;
  try {
    channel = await client.channels.fetch(event.channel_id);
  } catch (err) {
    console.error('Lỗi khi lấy channel:', err);
    return;
  }

  let text, musicId;
  try {
    text = event?.content?.t || "";
    const match = text.match(/\*playid\s+(\S+)/i);
    musicId = match ? match[1] : null;
    if (!musicId) {
      const msg = await channel.messages.fetch(event.message_id);
      await msg.reply({ t: "Vui lòng nhập đúng cú pháp: *playid <id>" });
      return;
    }
  } catch (err) {
    console.error('Lỗi khi phân tích cú pháp lệnh:', err);
    return;
  }

  let items, song;
  try {
    const dbPath = path.join(__dirname, '../db/music_system.json');
    const raw = fs.readFileSync(dbPath, 'utf8');
    items = JSON.parse(raw);
    song = items.find(item => item.id === musicId);
    if (!song) {
      const msg = await channel.messages.fetch(event.message_id);
      await msg.reply({ t: `Không tìm thấy bài hát với ID ${musicId}.` });
      return;
    }
  } catch (err) {
    console.error('Lỗi khi đọc DB hoặc tìm bài hát:', err);
    const msg = await channel.messages.fetch(event.message_id);
    await msg.reply({ t: 'Có lỗi khi truy xuất dữ liệu nhạc.' });
    return;
  }

  let playResult;
  try {
    playResult = await channel.playMedia(
      song.url,
      song.name,
      "BotPlayMedia",
      `Music: ${song.name} - ${song.artist}`
    );
    console.log("Kết quả phát nhạc:", playResult);
  } catch (err) {
    console.error('Lỗi khi gọi mezon SDK phát nhạc:', err);
    const msg = await channel.messages.fetch(event.message_id);
    await msg.reply({ t: 'Có lỗi khi phát nhạc qua mezon SDK.' });
    return;
  }

  try {
    const msg = await channel.messages.fetch(event.message_id);
    await msg.reply({
      t: `🎵 Đang phát: ${song.name}\n👤 Nghệ sĩ: ${song.artist}\n🏷️ Thể loại: ${song.title}\n📀 Định dạng: ${song.type.toUpperCase()}\n🔗 Link: ${song.url}\n\nKết quả: ${typeof playResult === "object" ? JSON.stringify(playResult) : playResult}`,
      mk: [
        { type: 'lk', s: `🎵 Đang phát: ${song.name}\n👤 Nghệ sĩ: ${song.artist}\n🏷️ Thể loại: ${song.title}\n📀 Định dạng: ${song.type.toUpperCase()}\n🔗 Link: `.length, e: `🎵 Đang phát: ${song.name}\n👤 Nghệ sĩ: ${song.artist}\n🏷️ Thể loại: ${song.title}\n📀 Định dạng: ${song.type.toUpperCase()}\n🔗 Link: `.length + song.url.length }
      ]
    });
  } catch (err) {
    console.error('Lỗi khi gửi reply:', err);
  }
}
