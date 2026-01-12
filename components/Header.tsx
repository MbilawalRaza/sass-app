
import React from 'react';
import { User, UserPlan } from '../types';
import { APP_NAME } from '../constants';

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onUpgrade: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout, onUpgrade }) => {
  return (
    <header className="sticky top-0 z-50 glass-morphism border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-xl font-bold gradient-text">{APP_NAME}</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Gallery</a>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-xs font-medium text-slate-400">
                  {user.plan === UserPlan.PAID ? 'Pro Plan' : `Free: ${user.totalQuota - user.dailyQuotaUsed} left`}
                </span>
                <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${user.plan === UserPlan.PAID ? 'bg-purple-500' : 'bg-indigo-500'}`}
                    style={{ width: user.plan === UserPlan.PAID ? '100%' : `${((user.totalQuota - user.dailyQuotaUsed) / user.totalQuota) * 100}%` }}
                  />
                </div>
              </div>
              
              {user.plan === UserPlan.FREE && (
                <button 
                  onClick={onUpgrade}
                  className="hidden sm:block px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-full text-sm font-semibold transition-all shadow-lg shadow-purple-500/20"
                >
                  Upgrade
                </button>
              )}

              <div className="relative group">
                <img 
                  src={user.picture} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full border-2 border-slate-700 hover:border-indigo-500 transition-all cursor-pointer"
                />
                <div className="absolute right-0 mt-2 w-48 py-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all translate-y-2 group-hover:translate-y-0">
                  <div className="px-4 py-2 border-b border-slate-800">
                    <p className="text-sm font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                  <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-800 transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={onLogin}
              className="px-6 py-2.5 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-200 transition-all shadow-xl"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
