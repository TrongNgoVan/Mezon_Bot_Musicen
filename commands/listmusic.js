module.exports = async function handleListMusic(client, event) {
  const fs = require('fs');
  const path = require('path');

  try {
    // Đọc file nhạc
    const dbPath = path.join(__dirname, '../db/music_system.json');
    const raw = fs.readFileSync(dbPath, 'utf8');
    const items = JSON.parse(raw);

    // Tạo bảng đẹp với icon và trường type
    let table = '🔢 ID |          🎶 Name              |        🏷️ Title        |       👤 Artist       |       📀 Type       \n';
    table += '--------|----------------------------|-----------------------|-----------------------|-------------------------\n';
    items.forEach(song => {
      table += `${song.id} | ${song.name} | ${song.title} | ${song.artist} | ${song.type ? song.type.toUpperCase() : ''}\n`;
    });

    // Định dạng block code cho bảng
    const t = '🎵 Danh sách bài hát có sẵn trong hệ thống ( gồm cả mp3 lẫn mp4):\n\n' + table;
    const mk = [
      { type: 'pre', s: t.indexOf('🔢'), e: t.length }
    ];

    const channel = await client.channels.fetch(event.channel_id);
    const message = await channel.messages.fetch(event.message_id);
    await message.reply({ t, mk });
  } catch (err) {
    console.error(err);
    // Thông báo lỗi cho user
    const channel = await client.channels.fetch(event.channel_id);
    const message = await channel.messages.fetch(event.message_id);
    await message.reply({ t: 'Không thể đọc danh sách nhạc.' });
  }
}
