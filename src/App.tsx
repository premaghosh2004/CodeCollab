import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LandingPage } from './components/LandingPage';
import { SignupPage } from './components/SignupPage';
import { LoginPage } from './components/LoginPage';
import { ChatPage } from './components/ChatPage';

export type Page = 'landing' | 'signup' | 'login' | 'chat';

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  token: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
      setCurrentPage('chat');
    }
  }, []);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleAuthSuccess = (userData: User) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
    setCurrentPage('chat');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'signup':
        return <SignupPage onNavigate={handleNavigate} onAuthSuccess={handleAuthSuccess} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onAuthSuccess={handleAuthSuccess} />;
      case 'chat':
        return user ? <ChatPage user={user} onNavigate={handleNavigate} /> : <LoginPage onNavigate={handleNavigate} onAuthSuccess={handleAuthSuccess} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-500">
        {renderPage()}
      </div>
    </ThemeProvider>
  );
}

export default App;