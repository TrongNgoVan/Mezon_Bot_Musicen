const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
module.exports = async function handleSearch(client, event) {
  try {
  // use fetch if axios is not available
    const query = event.content.t.split(" ").slice(1).join(" ");
    let videoUrl = '';
      try {
        if (query && YOUTUBE_API_KEY) {
          const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}&maxResults=1&type=video`);
          const data = await res.json();
          const items = data.items;
          if (items && items.length > 0) {
            const videoId = items[0].id.videoId;
            videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
          } else {
            videoUrl = 'Không tìm thấy kết quả phù hợp.';
          }
        } else {
          videoUrl = 'Thiếu từ khóa hoặc API key.';
        }
    
        if (videoUrl && videoUrl.startsWith('http')) {
          const prefix = '🔎 Kết quả tìm kiếm cho: ';
          const text = `${prefix}${query || '...'} ${videoUrl}`;
          const s = text.indexOf(videoUrl);
          const e = s + videoUrl.length;
        } else {
          videoUrl = 'Thiếu từ khóa hoặc API key.';
        }
    
        let response;
        if (videoUrl && videoUrl.startsWith('http')) {
          const prefix = '🔎 Kết quả tìm kiếm cho: ';
          const text = `${prefix}${query || '...'} ${videoUrl}`;
          const s = text.indexOf(videoUrl);
          const e = s + videoUrl.length;
          response = { t: text, mk: [{ s, e, type: 'lk' }] };
        } else {
          response = { t: videoUrl };
        }
    
          const channel = await client.channels.fetch(event.channel_id);
          const message = await channel.messages.fetch(event.message_id);
          await message.reply(response);
    
      } catch (err) {
        console.error(err);
      
        const errorMsg = 'Đã xảy ra lỗi khi tìm kiếm nhạc.';
        try {
          if (event.message_id) {
            const channel = await client.channels.fetch(event.channel_id);
            const message = await channel.messages.fetch(event.message_id);
            await message.reply({ t: errorMsg });
          } else {
            const channel = await client.channels.fetch(event.channel_id);
            await channel.send({ t: errorMsg });
          }
        } catch {}
      }
    } catch (err) {
      console.error(err);
    }
  };

  