module.exports = async function handlePlayMedia(client, ev) {
  const buttonId = ev.button_id || "";
  const messageId = ev.message_id;
  const channelId = ev.channel_id;
  let formData = ev.extra_data || {};
  if (typeof formData === "string") {
    try {
      formData = JSON.parse(formData);
    } catch (e) {
      formData = {};
    }
  }

  const idMedia = Object.keys(formData).find((k) => k.startsWith("select-media"));


  let missing = [];
  if (!idMedia || !formData[idMedia]) missing.push("select-media");

  let channel;
  let message;
  try {
    channel = await client.channels.fetch(channelId);
    message = await channel.messages.fetch(messageId);
  } catch (err) {
    return;
  }
  const mezon_user_id = ev.user_id || ev.userId || ev.userID;
  // console.log('Mezon User ID:', mezon_user_id);
  // console.log('Form Data:', formData);
  // console.log('buttonId:', buttonId);
  if (!buttonId.endsWith(`-${mezon_user_id}`)) {
    return;
  }

  if (buttonId.startsWith("button-play")) {
    if (missing.length > 0) {
      return;
    }

    if (!mezon_user_id) {
      await message.update({
        t: `❌ Không xác định được user. Vui lòng thử lại.`,
      });
      return;
    }

    // Lấy id bài hát từ form
    const selectedId = formData[idMedia];
    // Đọc danh sách nhạc từ JSON
    const fs = require('fs');
    const musicPath = process.env.MUSIC_JSON_PATH;
    let musicList = [];
    try {
      const raw = fs.readFileSync(musicPath, 'utf8');
      musicList = JSON.parse(raw);
    } catch (e) {
      musicList = [];
    }
    // Tìm bài hát theo id
    const song = musicList.find(s => s.id === selectedId);
    if (!song) {
      await message.update({ t: '❌ Không tìm thấy bài hát phù hợp.' });
      return;
    }
    // Gọi mezon SDK phát nhạc
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
      const msg = await channel.messages.fetch(ev.message_id);
      await msg.reply({ t: 'Có lỗi khi phát nhạc qua mezon SDK.' });
      return;
    }

  } else if (buttonId.startsWith("button-cancel-")) {
    await message.update({
      t: "⛔️ Đã hủy.",
    });
  }
};
