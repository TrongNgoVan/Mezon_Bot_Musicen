const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = async function handleRecommend(client, event) {
  let channel;
  try {
    channel = await client.channels.fetch(event.channel_id);
  } catch (err) {
    console.error('Lỗi khi lấy channel:', err);
    return;
  }

  let text, keyword;
  try {
    text = event?.content?.t || "";
    const match = text.match(/\*recommend\s+(.+)/i);
    keyword = match ? match[1].trim() : null;
    if (!keyword) {
      const msg = await channel.messages.fetch(event.message_id);
      await msg.reply({ t: "Vui lòng nhập đúng cú pháp: *recommend <tukhoa>" });
      return;
    }
  } catch (err) {
    console.error('Lỗi khi phân tích cú pháp lệnh:', err);
    return;
  }


  let dbJson = '';
  try {
    const dbPath = path.join(__dirname, '../db/music_system.json');
    dbJson = fs.readFileSync(dbPath, 'utf8');
  } catch (err) {
    dbJson = '';
  }

  
  try {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const prompt = `Bạn là một chuyên gia về tư vấn âm nhạc. Đầu tiên, hãy đọc kho nhạc sau đây của hệ thống:\n${dbJson}\nSau đó, dựa vào yêu cầu của người dùng: '${keyword}', hãy đề xuất từ 1 đến 3 bài hát phù hợp nhất (chỉ đề xuất những bài hát thực sự phù hợp chứ không cố bịa cho nhiều), trả về dạng danh sách: ID - Tên - Nghệ sĩ ( kèm hướng dẫn "Muốn nghe nhạc vui lòng nhắn: *playid <id>").`;
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': geminiApiKey
        }
      }
    );
    const result = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Không có kết quả.";
    const msg = await channel.messages.fetch(event.message_id);
    const header = `🎵 Gợi ý nhạc cho từ khóa '${keyword}':\n`;
    await msg.reply({
      t: header + result,
      mk: [
        { type: 'pre', s: header.length, e: header.length + result.length }
      ]
    });
  } catch (err) {
    console.error('Lỗi khi gọi API Gemini:', err);
    const msg = await channel.messages.fetch(event.message_id);
    await msg.reply({ t: 'Có lỗi khi gọi API Gemini.' });
  }
}
