
import React, { useState, useEffect } from 'react';
import { User, UserPlan, ThumbnailStyle } from './types';
import { STYLES, APP_NAME, FREE_DAILY_QUOTA } from './constants';
import Generator from './components/Generator';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Load user from local storage on mount (simulating session)
  useEffect(() => {
    const savedUser = localStorage.getItem('thumbgenie_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsAuthLoading(false);
  }, []);

  const handleLogin = () => {
    // Simulated Google Login
    const mockUser: User = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      email: 'creator@example.com',
      name: 'Content Creator',
      picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=creator',
      plan: UserPlan.FREE,
      dailyQuotaUsed: Number(localStorage.getItem('daily_quota_used') || 0),
      totalQuota: FREE_DAILY_QUOTA
    };
    setUser(mockUser);
    localStorage.setItem('thumbgenie_user', JSON.stringify(mockUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('thumbgenie_user');
  };

  const handleUpgrade = async () => {
    if (typeof window.aistudio?.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      // After opening key selection, we assume success or let the user try again
      const updatedUser = { ...user!, plan: UserPlan.PAID };
      setUser(updatedUser);
      localStorage.setItem('thumbgenie_user', JSON.stringify(updatedUser));
    } else {
      alert("Upgrade system currently unavailable. Please check your environment.");
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <Header 
        user={user} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
        onUpgrade={handleUpgrade}
      />
      
      <main className="flex-grow">
        {user ? (
          <Generator user={user} setUser={setUser} onUpgrade={handleUpgrade} />
        ) : (
          <LandingPage onGetStarted={handleLogin} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
