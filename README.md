

# 🎧 Bot Music Mezon

## 1. Giới thiệu

Bot Music Mezon là chatbot âm nhạc ( media gồm mp3,mp4) thông minh cho nền tảng Mezon, giúp phòng voice trở nên sống động với nhiều tính năng mới:

- 🚀 Phát nhạc trực tiếp từ URL (mp3, mp4, m3u8)
- 📋 Phát nhạc theo ID bài hát
- 🗂️ Hiển thị danh sách nhạc của hệ thống với đầy đủ thông tin.
- ℹ️ Xem chi tiết thông tin bài hát theo ID
- 🔎 Tìm kiếm bài hát trên Youtube 📺 và nghe trong chanel chat
- 🤖 Gợi ý nhạc AI Gemini theo tâm trạng/chủ đề
- 📝 Xem hướng dẫn, thông tin bot
- 🛠️ Tích hợp mezon SDK, phát media trực tiếp trong phòng voice
- 🔒 Quản lý nhạc qua file JSON, dễ dàng mở rộng


---

## 2. Hướng dẫn cài đặt & sử dụng



### 2.1. Cài đặt

```bash
git clone <repo-url>
cd bot-music-sample
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

- 🔍 **Tìm kiếm bài hát trên Youtube và nghe trong channel chat**
	```
	*search <từ khóa>
	```
	Tìm kiếm theo tên, nghệ sĩ, thể loại hoặc bất cứ tiêu đề gì.

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
- Đảm bảo đã join voice channel trước khi phát media
- Bot hỗ trợ cả định dạng mp3, mp4, m3u8


---


