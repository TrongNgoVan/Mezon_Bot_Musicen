const fs = require('fs');

module.exports = async function commandPlayMedia(client, event) {
    const { EButtonMessageStyle, EMessageComponentType } = require('mezon-sdk');
    const messageid = event.message_id;
    const user_id = event.sender_id;

    const musicPath = process.env.MUSIC_JSON_PATH;
    let musicList = [];
    try {
      const raw = fs.readFileSync(musicPath, 'utf8');
      musicList = JSON.parse(raw);
    } catch (e) {
      musicList = [];
    }

    // Tạo options từ danh sách nhạc
    const musicOptions = musicList.map(song => ({
        label: song.name,
        value: song.id
    }));

    const embed = [
      {
        color: 0x00bfff,
        title: ' Phát media theo danh sách nhạc có sẵn',
        author: {
          name: event.display_name || event.username || "Mezon User",
          icon_url: event.avatar,
        },
        thumbnail: { url: 'https://cdn.mezon.ai/1940048388468772864/1992130666438856704.gif'},
        fields: [
          {
            name: 'Chọn bài hát:',
            value: '',
            inputs: {
              id: `select-media-${messageid}`,
              type: EMessageComponentType.SELECT,
              component: {
                options: musicOptions,
                required: true,
                valueSelected: musicOptions[0] || { label: '', value: '' }
              }
            }
          }
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: 'Powered by Mezon Bot Media',
          icon_url: 'https://cdn.mezon.ai/1940048388468772864/1992139540768231424.gif'
        }
      }
    ];

    const components = [
      {
        components: [
          {
            id: `button-cancel-${messageid}-${user_id}`,
            type: EMessageComponentType.BUTTON,
            component: {
              label: 'Cancel',
              style: EButtonMessageStyle.SECONDARY
            }
          },
          {
            id: `button-play-${messageid}-${user_id}`,
            type: EMessageComponentType.BUTTON,
            component: {
              label: 'Play',
              style: EButtonMessageStyle.SUCCESS
            }
          }
        ]
      }
    ];
  try {
    const channelId = event.channel_id;
    const channel = await client.channels.fetch(channelId);
    const message = await channel.messages.fetch(event.message_id);
    await message.reply({ embed, components });
  } catch (err) {
    console.error('Lỗi khi gửi message phát media:', err);
    return;
  }
}

