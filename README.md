

# 🎧 Bot Music Mezon

## 1. Giới thiệu

Bot Music Mezon là chatbot âm nhạc thông minh cho nền tảng Mezon, giúp phòng voice trở nên sống động với nhiều tính năng mới:

- 🚀 Phát nhạc trực tiếp từ URL (mp3, mp4, m3u8)
- 📋 Quản lý & phát nhạc theo ID bài hát
- 🗂️ Hiển thị danh sách nhạc dạng bảng đẹp, đầy đủ thông tin
- ℹ️ Xem chi tiết bài hát với icon, link, định dạng
- 🔎 Tìm kiếm bài hát theo tên, nghệ sĩ, thể loại
- 🤖 Gợi ý nhạc AI Gemini theo tâm trạng/chủ đề
- 📝 Xem hướng dẫn, thông tin bot
- 💬 Tương tác qua các lệnh chat đơn giản, UI mezon đẹp
- 🛠️ Tích hợp mezon SDK, phát media trực tiếp trong phòng voice
- 🔒 Quản lý nhạc qua file JSON, dễ dàng mở rộng

Phù hợp cho các cuộc thi, demo sản phẩm, hoặc làm nền tảng phát triển các tính năng âm nhạc nâng cao.

---

## 2. Hướng dẫn cài đặt & sử dụng



### 2.1. Cài đặt

```bash
git clone <repo-url>
cd Mezon_Bot_Musicen
npm install
```

### 2.2. Cấu hình

- Tạo file `.env` và điền các thông tin cần thiết (token, gemini_apikey, youtube_api_key, ...)
- Đảm bảo file `db/music_system.json` chứa danh sách bài hát mẫu (định dạng chuẩn JSON)

### 2.3. Chạy bot

```bash
npm start
```


### 2.5. Sử dụng bot

#### Các lệnh chính (cập nhật mới nhất)

- 🎵 **Phát nhạc từ URL**
	```
	*playmusic <url>
	```
	Ví dụ: `*playmusic https://cdn.mezon.ai/sounds/7346483973050015537.mp3`

- 🔎 **Phát nhạc theo ID**
	```
	*playid <id>
	```
	Ví dụ: `*playid 2`

- 📑 **Xem danh sách bài hát**
	```
	*listmusic
	```
	Trả về bảng danh sách bài hát có sẵn.

- ℹ️ **Xem thông tin bài hát**
	```
	*infor <id>
	```
	Xem chi tiết bài hát với icon, link, định dạng.

- 🔍 **Tìm kiếm bài hát**
	```
	*search <từ khóa>
	```
	Tìm kiếm theo tên, nghệ sĩ, thể loại.

- 🤖 **Gợi ý nhạc AI Gemini**
	```
	*recommend <tâm trạng/chủ đề>
	```
	Gợi ý nhạc phù hợp, copy lệnh *playid để nghe ngay.

- 📝 **Xem hướng dẫn**
	```
	*intro
	```
	Xem hướng dẫn sử dụng và các lệnh hỗ trợ.

#### Lưu ý
- Đảm bảo đã join voice channel trước khi phát nhạc
- Bot hỗ trợ cả định dạng mp3, mp4, m3u8


---




## Bot nhắc nhở trực nhật

lúc build bắt buộc phải có node module đã được install , nên nếu install với version khác mà build với version khác là sẽ lỗi ngay.

nvm install 18.20.2
nvm list
nvm use 18.20.2


Remove-Item -Recurse -Force node_modules

rmdir /s /q node_modules

pkg index.js --targets node18-win-x64 --output bot_playmedia.exe

build có 3 cách
   pkg 
   nexe
   bun
   
"messages": [
        {
            "clan_id": "1996962163641552896",
            "channel_id": "1997521577897365504",
            "message_id": "1840651252657033216",
            "code": 0,
            "sender_id": "1950875350829371392",
            "username": "trong.ngovan",
            "avatar": "https://profile.mezon.ai/1969101240251977728/1950875350829371392/1950875350829371400/1761203301809_IMG_20220529_002041.jpg",
            "content": "{\"t\":\"hi\"}",
            "create_time": "2025-12-07T04:23:41Z",
            "update_time": "2025-12-07T04:23:41Z",
            "display_name": "Alexander Trọng",
            "mentions": "[]",
            "attachments": "[{\"filename\":\"NoiDauXotXa-MinhVuongM4U.mp3\",\"size\":4470003,\"url\":\"https://cdn.mezon.ai/1950875350829371392/1997522371933638656.mp3\",\"filetype\":\"audio/mpeg\"}]",
            "references": "[]",
            "create_time_seconds": 1765081421,
            "update_time_seconds": 1765081421,
            "hide_editted": true
        },