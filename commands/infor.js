
const fs = require('fs');
const path = require('path');

module.exports = async function handleInfor(client, event) {
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
    const match = text.match(/\*infor\s+(\S+)/i);
    musicId = match ? match[1] : null;
    if (!musicId) {
      const msg = await channel.messages.fetch(event.message_id);
      await msg.reply({ t: "Vui lòng nhập đúng cú pháp: *infor <id>" });
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

 
  const info = `🎵 ID: ${song.id}\n📛 Tên: ${song.name}\n👤 Nghệ sĩ: ${song.artist}\n🏷️ Thể loại: ${song.title}\n📀 Định dạng: ${song.type.toUpperCase()}\n🔗 Link: ${song.url}`;
  try {
    const msg = await channel.messages.fetch(event.message_id);
    await msg.reply({
      t: info,
      mk: [
        { type: 'pre', s: 0, e: info.length }
      ]
    });
  } catch (err) {
    console.error('Lỗi khi gửi reply:', err);
  }
}
