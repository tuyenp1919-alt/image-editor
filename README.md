# 🖼️ Image Editor - Công cụ chỉnh sửa ảnh online

![Image Editor](https://img.shields.io/badge/Image-Editor-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?logo=pwa&logoColor=white)

Công cụ chỉnh sửa ảnh online miễn phí với giao diện thân thiện và nhiều tính năng mạnh mẽ.

## 🌟 Tính năng

### ✨ Chỉnh sửa cơ bản
- 📁 Tải ảnh lên từ máy tính hoặc kéo thả
- 🔆 Điều chỉnh độ sáng
- 🌗 Điều chỉnh tương phản  
- 🎨 Điều chỉnh độ bão hòa màu
- 🌈 Thay đổi màu sắc (Hue)
- 🔍 Hiệu ứng làm mờ

### 🎭 Bộ lọc có sẵn
- **Gốc**: Không áp dụng filter
- **Xám**: Chuyển đổi thành ảnh đen trắng
- **Sepia**: Hiệu ứng cổ điển màu nâu
- **Đảo ngược**: Đảo ngược màu sắc
- **Cổ điển**: Hiệu ứng vintage
- **Ấm áp**: Tông màu ấm
- **Lạnh**: Tông màu lạnh

### 🔄 Biến đổi ảnh
- 🔄 Xoay ảnh 90°
- ↔️ Lật ngang
- ↕️ Lật dọc
- 🔄 Đặt lại tất cả thay đổi

### 💾 Xuất ảnh
- Tải xuống ảnh đã chỉnh sửa
- Định dạng PNG chất lượng cao
- Giữ nguyên kích thước gốc

### 📱 Hỗ trợ đa nền tảng
- ✅ Responsive design cho mobile
- ✅ PWA support - cài đặt như app
- ✅ Hoạt động offline
- ✅ Dark mode support

## 🚀 Demo trực tiếp

Truy cập: [https://tuyenpham.github.io/image-editor](https://tuyenpham.github.io/image-editor)

## 💻 Cài đặt và chạy local

### Yêu cầu
- Web browser hiện đại (Chrome, Firefox, Safari, Edge)
- Web server (để phục vụ các file static)

### Chạy với Python
```bash
# Clone repository
git clone https://github.com/tuyenpham/image-editor.git
cd image-editor

# Python 3
python -m http.server 8000

# Python 2 
python -m SimpleHTTPServer 8000

# Mở browser tại: http://localhost:8000
```

### Chạy với Node.js
```bash
# Cài đặt http-server
npm install -g http-server

# Chạy server
http-server -p 8000

# Mở browser tại: http://localhost:8000
```

### Chạy với PHP
```bash
php -S localhost:8000
```

## 📁 Cấu trúc project

```
image-editor/
├── index.html              # File HTML chính
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── CNAME                   # Custom domain config
├── assets/
│   ├── css/
│   │   └── style.css       # CSS styling
│   ├── js/
│   │   └── app.js          # JavaScript logic
│   └── images/             # Icons và assets
├── docs/                   # Documentation
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
└── README.md
```

## 🛠️ Công nghệ sử dụng

- **HTML5 Canvas**: Xử lý và hiển thị ảnh
- **CSS3**: Styling và animations
- **Vanilla JavaScript**: Logic chính, không dùng framework
- **CSS Filters**: Áp dụng hiệu ứng real-time
- **File API**: Đọc file từ máy tính
- **PWA**: Progressive Web App support

## 🌐 Deploy lên GitHub Pages

1. Fork repository này
2. Vào Settings > Pages
3. Chọn Source: **GitHub Actions**
4. Push code lên main branch
5. GitHub Actions sẽ tự động deploy

### Cấu hình Custom Domain

1. Mua domain và cấu hình DNS:
   ```
   Type: CNAME
   Name: editor (hoặc subdomain bạn muốn)
   Value: yourusername.github.io
   ```

2. Sửa file `CNAME`:
   ```
   editor.yourdomain.com
   ```

3. Push changes lên GitHub

## ⌨️ Phím tắt

- `Ctrl/Cmd + O`: Tải ảnh lên
- `Ctrl/Cmd + S`: Tải ảnh xuống  
- `Ctrl/Cmd + Z`: Đặt lại tất cả

## 🎨 Tùy chỉnh

### Thêm filter mới

Trong file `assets/js/app.js`, thêm case mới trong function `getCSSFilters()`:

```javascript
case 'your-filter':
    filters.push('your-css-filter-here');
    break;
```

### Thay đổi màu sắc chủ đạo

Trong file `assets/css/style.css`, sửa biến CSS:

```css
:root {
    --primary-color: #your-color;
}
```

## 🤝 Đóng góp

1. Fork project
2. Tạo feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Mở Pull Request

## 📝 License

Project này được phân phối dưới MIT License. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🐛 Báo lỗi

Nếu bạn gặp lỗi hoặc có ý tưởng cải tiến, hãy [tạo issue](https://github.com/tuyenpham/image-editor/issues) mới.

## 📧 Liên hệ

**Tuyen Pham**
- GitHub: [@tuyenpham](https://github.com/tuyenpham)
- Email: your-email@example.com

## 🙏 Cảm ơn

- [MDN Web Docs](https://developer.mozilla.org/) - Tài liệu tham khảo
- [CSS-Tricks](https://css-tricks.com/) - CSS tips và tricks
- [GitHub Pages](https://pages.github.com/) - Hosting miễn phí

---

⭐ Nếu project này hữu ích, hãy cho một star nhé!