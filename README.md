🚀 CodeCollab - The Real-time Chat App for DevelopersCodeCollab is a full-stack, real-time chat application designed specifically for developers. It goes beyond a standard messenger by providing specialized tools that streamline technical discussions, pair programming, and team collaboration. Built on the MERN stack with Socket.IO, it offers a seamless and feature-rich experience for engineers who need to communicate effectively.✨ FeaturesCodeCollab is packed with features that make a developer's life easier:👥 Real-time 1-on-1 & Group Chat: Instantaneous messaging powered by Socket.IO.💻 Markdown & Code Syntax Highlighting: Share code snippets with full syntax highlighting directly in the chat.🤖 AI Coding Assistant: Summon an in-chat AI with the /ai command to get instant answers to coding questions.🤝 Team Collaboration: Easily search for other users and create group chats for projects or teams.📸 Image Sharing: Upload and share images directly in conversations.😃 Emoji Support: Express yourself with a built-in emoji picker.🟢 Online & Typing Indicators: See who's online and when they're typing a message.🎨 Modern UI/UX: A clean, responsive interface with a user-selectable Dark/Light Theme.🔐 Secure Authentication: User registration and login secured with JSON Web Tokens (JWT).🛠️ Tech StackFrontendBackendDatabaseReal-time CommunicationReact with ViteNode.jsMongoDBSocket.IOTypeScriptExpress.jsMongooseTailwind CSSJWT for AuthenticationFramer Motion for animationsMulter for file uploadsreact-markdown & react-syntax-highlighter🚀 Getting StartedFollow these instructions to get the project up and running on your local machine.PrerequisitesNode.js (v16 or later)npmMongoDB (local or a cloud instance like MongoDB Atlas)1. Clone the Repositorygit clone https://github.com/premaghosh2004/codecollab.git
cd codecollab
2. Backend SetupNavigate to the backend directory:cd backend
Install the dependencies:npm install
Create a .env file in the backend directory and add the following environment variables:MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
Start the backend server:npm start
The server will be running on http://localhost:5000.3. Frontend SetupOpen a new terminal and navigate to the project's root directory (codecollab).Install the dependencies:npm install
Start the frontend development server:npm run dev
The application will be available at http://localhost:5173.📁 Project Structure/
├── backend/
│   ├── config/         # Database and token configuration
│   ├── controllers/    # Express route logic
│   ├── middleware/     # Authentication and error handling
│   ├── models/         # Mongoose data models
│   ├── routes/         # API routes
│   ├── uploads/        # Folder for uploaded images
│   └── server.js       # Main backend server file
│
└── src/                # Frontend source code (React)
    ├── components/     # React components
    ├── contexts/       # React context providers (e.g., ThemeContext)
    └── App.tsx         # Main application component
🤝 ContributingContributions are welcome! If you have suggestions for improvements or want to add new features, please feel free to open an issue or submit a pull request.Fork the ProjectCreate your Feature Branch (git checkout -b feature/AmazingFeature)Commit your Changes (git commit -m 'Add some AmazingFeature')Push to the Branch (git push origin feature/AmazingFeature)Open a Pull Request📄 LicenseThis project is licensed under the MIT License. See the LICENSE file for details.
