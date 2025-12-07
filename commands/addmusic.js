const fs = require("fs");

module.exports = async function handleAddMusic(client, event) {
  let channel;
  let message;
  try {
    channel = await client.channels.fetch(event.channel_id);
    message = await channel.messages.fetch(event.message_id);
  } catch (err) {
    console.error("Lỗi khi lấy channel hoặc message:", err);
    return;
  }

  // Lấy attachments từ message đã fetch
  const attachments = message.attachments || [];
  if (!attachments.length) {
    await message.reply({ t: "❌ Không tìm thấy file đính kèm." });
    return;
  }

  const file = attachments[0];
  // Xác định type hợp lệ
  let type = "";
  if (file.filetype === "audio/mpeg") type = "mp3";
  else if (file.filetype === "video/mp4") type = "mp4";
  else {
    await message.reply({ t: "❌ Chỉ hỗ trợ file mp3 hoặc mp4." });
    return;
  }

  // Đọc file nhạc hiện tại
  const musicPath = process.env.MUSIC_JSON_PATH;
  let musicList = [];
  try {
    if (fs.existsSync(musicPath)) {
      const raw = fs.readFileSync(musicPath, "utf8");
      musicList = JSON.parse(raw);
    }
  } catch (e) {
    musicList = [];
  }

  // Tạo id mới
  let newId = "0";
  if (musicList.length > 0) {
    const maxId = Math.max(...musicList.map((item) => parseInt(item.id, 10)));
    newId = String(maxId + 1);
  }

  // Tạo object bài hát mới
  const newSong = {
    id: newId,
    url: file.url,
    name: file.filename,
    title: "",
    artist: "",
    type: type,
  };

  musicList.push(newSong);

  // Ghi lại file JSON
  try {
    fs.writeFileSync(musicPath, JSON.stringify(musicList, null, 2), "utf8");
    await message.reply({
      t: `✅ Đã thêm bài hát mới: ${file.filename} (${type})`,
    });
  } catch (e) {
    await message.reply({ t: "❌ Lỗi khi ghi file nhạc." });
    return;
  }
};
