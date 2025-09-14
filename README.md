# 🎧 Bot Music Sample

## 1. Giới thiệu về Bot

🎶 **Bot Music Sample** là chatbot âm nhạc thông minh dành cho nền tảng Mezon, giúp bạn biến phòng voice thành không gian giải trí sống động:

- 🚀 Phát nhạc trực tiếp từ URL (hỗ trợ cả mp3, mp4)
- 📋 Quản lý & phát nhạc theo ID bài hát có sẵn trong hệ thống
- 🗂️ Hiển thị danh sách nhạc dưới dạng bảng đẹp, đầy đủ thông tin: ID, tên, thể loại, nghệ sĩ, định dạng
- 💬 Tương tác qua các lệnh chat đơn giản, thân thiện
- 🛠️ Tích hợp mezon SDK, phát media trực tiếp trong phòng voice
- 🔒 Quản lý nhạc qua file JSON, dễ dàng mở rộng

Bot phù hợp cho các cuộc thi, demo sản phẩm, hoặc làm nền tảng phát triển các tính năng âm nhạc nâng cao.

---

## 2. Hướng dẫn cài đặt, chạy và sử dụng bot

### 2.1. Yêu cầu hệ thống

- 🟢 Node.js >= 18.x
- 🟢 npm >= 9.x
- 🟢 Tài khoản bot trên Mezon ([Mezon Bot Docs](https://mezon.ai/docs/mezon-bot-docs))
- 🟢 Token bot và thông tin kênh/channel trên Mezon

### 2.2. Cài đặt

```bash
git clone <repo-url>
cd bot-music-sample
npm install
```

### 2.3. Cấu hình

- Tạo file `.env` và điền các thông tin cần thiết (token, channel_id, ...)
- Đảm bảo file `db/music_system.json` chứa danh sách bài hát mẫu (định dạng chuẩn JSON)

### 2.4. Chạy bot

```bash
npm start
```
Hoặc:
```bash
node index.js
```

### 2.5. Sử dụng bot

#### Các lệnh cơ bản

- 🎵 **Phát nhạc từ URL**
	```
	*playmusic <url>
	```
	Ví dụ: `*playmusic https://cdn.mezon.ai/sounds/123456789.mp3`

- 🔎 **Phát nhạc theo ID**
	```
	*playid <id>
	```
	Ví dụ: `*playid 2`

- 📑 **Xem danh sách bài hát**
	```
	*listmusic
	```
	Bot sẽ trả về bảng danh sách bài hát có sẵn.

- ℹ️ **Xem hướng dẫn**
	```
	*intro
	```
	Bot sẽ trả về hướng dẫn sử dụng và các lệnh hỗ trợ.

#### Lưu ý
- Đảm bảo đã join voice channel trước khi phát nhạc
- Bot hỗ trợ cả định dạng mp3 và mp4
- Có thể mở rộng thêm các tính năng như thêm bài hát, tìm kiếm, bình chọn, v.v.

---

## 3. Đóng góp & Liên hệ

- 💡 Nếu có ý tưởng, lỗi hoặc cần hỗ trợ, hãy liên hệ qua [Mezon Developers](https://mezon.ai/developers)
- 🤝 Đóng góp code, tính năng mới qua pull request hoặc issue trên repo

---

🎉 Chúc bạn thành công với dự án và cuộc thi!
