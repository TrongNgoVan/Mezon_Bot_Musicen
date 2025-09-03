module.exports = async function handleHelp(client, event) {

  try {
    const channel = await client.channels.fetch(event.channel_id);

    const helpText = `
      Xin chào! Tôi là bot hỗ trợ phát nhạc trong kênh họp trực tuyến.

      Các lệnh bạn có thể sử dụng:
      - *playmusic <i>: Bắt đầu phát nhạc trong kênh họp với stt là i.
    
      Vui lòng đảm bảo rằng bạn đã thiết lập mã họp (meeting code) cho kênh trước khi sử dụng các lệnh phát nhạc.

      Nếu bạn cần thêm trợ giúp, hãy liên hệ với quản trị viên của bạn.
    `;

    const message = await channel.messages.fetch(event.message_id);
    await message.reply({ t: helpText });

  } catch (err) {
    console.error(err);
  }
}