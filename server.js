require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Playlist = require("./model/PlaylistModel");

const app = express();

// Sử dụng CORS để cho phép các yêu cầu từ mọi nguồn
app.use(cors());

// Middleware để xử lý JSON
app.use(express.json());

// Kết nối tới MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000, // Thời gian timeout 20 giây
  })
  .then(() => console.log("Kết nối thành công tới MongoDB"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

// Tạo API endpoint GET /api/data
app.get("/api/data", async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.status(200).json(playlists); // Trả về JSON chứa danh sách playlists
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    res.status(500).json({ error: error.message });
  }
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server đang chạy trên cổng ${PORT}`));
