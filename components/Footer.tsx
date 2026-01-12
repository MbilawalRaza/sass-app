
import React from 'react';
import { APP_NAME } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-lg font-bold gradient-text">{APP_NAME}</span>
          </div>
          <p className="text-sm text-slate-500 text-center md:text-left">
            The world's first AI thumbnail engine optimized for YouTube creators.<br />
            Built for growth, designed for engagement.
          </p>
        </div>

        <div className="flex gap-12 text-sm text-slate-400">
          <div className="flex flex-col gap-3">
            <span className="font-bold text-slate-200">Product</span>
            <a href="#" className="hover:text-indigo-400 transition-colors">Generator</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">API Access</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold text-slate-200">Legal</span>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Refunds</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold text-slate-200">Social</span>
            <a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">YouTube</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
