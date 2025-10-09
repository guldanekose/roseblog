# 🌹 Rose Blog

**Rose Blog**, kullanıcıların farklı kategoriler (örneğin sanat, teknoloji, bilim vb.) altında yazılar paylaşabildiği, modern bir blog platformudur.  
Kullanıcılar kayıt olabilir, giriş yapabilir, yazı oluşturabilir, düzenleyebilir ve silebilir.  
Bu proje, **Node.js (Express)** ve **React (Vite)** tabanlı bir **tam yığın (full-stack)** uygulamadır.

---

## 🚀 Özellikler

- 🔐 Kullanıcı kayıt ve giriş işlemleri (JWT & Cookie tabanlı kimlik doğrulama)
- ✍️ Yeni yazı oluşturma, düzenleme ve silme
- 🖼️ Resim yükleme (multer ile dosya upload)
- 🗂️ Yazıları kategoriye göre filtreleme
- 💬 Her yazının detay sayfası
- 📅 Paylaşım tarihi görüntüleme (moment.js)
- ⚙️ Backend API (Node.js + Express + MySQL)
- 🎨 Modern arayüz (React + Tailwind CSS)

---

## 🧩 Teknolojiler

| Katman | Teknolojiler |
|--------|---------------|
| **Frontend** | React, React Router, Axios, Tailwind CSS, Moment.js, React Quill (zengin metin editörü) |
| **Backend** | Node.js, Express.js, MySQL, cookie-parser & cors |
| **Authentication** | JWT (JSON Web Token) |
| **Diğer** | Multer (dosya yükleme), bcrypt (şifreleme) |


---

## ⚙️ Kurulum & Çalıştırma

> Aşağıdaki adımları proje kökünden takip et.

### 1. Depoyu klonla
```bash
git clone https://github.com/guldanekose/roseblog.git
cd roseblog
```

### 2. Sunucu (backend) tarafını kur
```bash
cd api
npm install
npm start
```

### 3. İstemci (frontend) tarafını kur
```bash
cd client
npm install
npm run dev
```
---

## 📂 Proje Yapısı

```bash
roseblog/
├── api/                 # Backend (Express)
│   ├── routes/
│   ├── controllers/
│   ├── db.js
│   └── index.js
├── client/              # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
└── README.md
```

---


## ✨ Geliştirici

👩‍💻 **Güldane Köse**  
📧 guldaneekosee@gmail.com  
🔗 [GitHub Profilim](https://github.com/guldanekose)

