🚀 CodeCollab - The Real-time Chat App for Developers

**CodeCollab** is a full-stack, real-time chat application built **specifically for developers**. It’s more than just a messenger — it’s a productivity tool crafted to support **technical discussions**, **pair programming**, and **team collaboration**. Built using the **MERN stack** with **Socket.IO**, it provides a rich, seamless chat experience.

---

## ✨ Features

CodeCollab is packed with features that make a developer's life easier:

* 👥 **Real-time 1-on-1 & Group Chat** — Instant messaging powered by Socket.IO.
* 💻 **Markdown & Code Syntax Highlighting** — Share formatted code using markdown with full syntax highlighting.
* 🤖 **AI Coding Assistant** — Use `/ai` to summon an in-chat AI for coding questions.
* 🤝 **Team Collaboration** — Search users and form group chats for specific teams or projects.
* 📸 **Image Sharing** — Upload and share images directly in the chat.
* 😃 **Emoji Support** — Integrated emoji picker for expression.
* 🟢 **Online & Typing Indicators** — See who's active and typing in real time.
* 🎨 **Modern UI/UX** — Clean, responsive design with Dark/Light theme toggle.
* 🔐 **Secure Authentication** — User registration/login secured with **JWT**.

---

## 🛠️ Tech Stack

| Frontend                 | Backend          | Database | Real-time Communication |
| ------------------------ | ---------------- | -------- | ----------------------- |
| React (Vite)             | Node.js          | MongoDB  | Socket.IO               |
| TypeScript               | Express.js       | Mongoose |                         |
| Tailwind CSS             | JWT Auth         |          |                         |
| Framer Motion            | Multer (uploads) |          |                         |
| react-markdown           |                  |          |                         |
| react-syntax-highlighter |                  |          |                         |

---

## 🚀 Getting Started

Follow these steps to run the app locally:

### ✅ Prerequisites

* Node.js (v16 or later)
* npm
* MongoDB (local or MongoDB Atlas)

---

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/premaghosh2004/codecollab.git
cd codecollab
```

---

### 🖥️ 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
npm start
```

> Server will run at: `http://localhost:5000`

---

### 🌐 3. Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

> App will be available at: `http://localhost:5173`

---

## 📁 Project Structure

```
/codecollab
├── backend/
│   ├── config/         # DB and JWT config
│   ├── controllers/    # API logic
│   ├── middleware/     # Auth & error handlers
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── uploads/        # Uploaded images
│   └── server.js       # Entry point
│
└── frontend/
    └── src/
        ├── components/ # React components
        ├── contexts/   # Global state management
        └── App.tsx     # Main app file
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repo
2. Create your Feature Branch:

   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:

   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

---



