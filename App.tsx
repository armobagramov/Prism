import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TopicGraph } from './components/TopicGraph';
import { TopicDetail } from './components/TopicDetail';
import { LoginPage } from './components/LoginPage';
import { UserProfile } from './components/UserProfile';
import { Topic, User } from './types';
import { MOCK_USER } from './constants';

function App() {
  const [currentView, setCurrentView] = useState<'HOME' | 'TOPIC' | 'LOGIN' | 'PROFILE'>('HOME');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  // Apply dark mode class to HTML
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentView('TOPIC');
  };

  const handleBackToHome = () => {
    setCurrentView('HOME');
    setSelectedTopic(null);
  };

  const handleLogin = () => {
      // Simulate login
      setUser(MOCK_USER);
      // Return to previous view or home
      if (selectedTopic) {
          setCurrentView('TOPIC');
      } else {
          setCurrentView('HOME');
      }
  };

  return (
    <div className="min-h-screen font-sans transition-colors duration-300">
      <Navbar 
        onHomeClick={handleBackToHome} 
        user={user}
        onLoginClick={() => setCurrentView('LOGIN')}
        onProfileClick={() => setCurrentView('PROFILE')}
        darkMode={darkMode}
        toggleTheme={() => setDarkMode(!darkMode)}
      />
      
      {currentView === 'HOME' && (
        <TopicGraph onTopicSelect={handleTopicSelect} darkMode={darkMode} />
      )}

      {currentView === 'TOPIC' && selectedTopic && (
        <TopicDetail 
          topic={selectedTopic} 
          onBack={handleBackToHome} 
          user={user}
          onLoginRequest={() => setCurrentView('LOGIN')}
        />
      )}

      {currentView === 'LOGIN' && (
          <LoginPage 
            onLogin={handleLogin} 
            onCancel={() => {
                if(selectedTopic) setCurrentView('TOPIC');
                else setCurrentView('HOME');
            }} 
          />
      )}

      {currentView === 'PROFILE' && user && (
          <UserProfile user={user} onBack={handleBackToHome} />
      )}
    </div>
  );
}

export default App;