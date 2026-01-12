
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { User, UserPlan, ThumbnailStyle } from '../types';
import { STYLES } from '../constants';

interface GeneratorProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  onUpgrade: () => void;
}

const Generator: React.FC<GeneratorProps> = ({ user, setUser, onUpgrade }) => {
  const [title, setTitle] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ThumbnailStyle>(STYLES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateThumbnail = async () => {
    if (!title.trim()) {
      setError("Please enter a video title first.");
      return;
    }

    if (user.plan === UserPlan.FREE && user.dailyQuotaUsed >= user.totalQuota) {
      setError("Daily limit reached. Upgrade to Pro for unlimited generations!");
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      // Create fresh instance to ensure correct API key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const modelName = user.plan === UserPlan.PAID ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
      
      const prompt = `A professional YouTube thumbnail for a video titled "${title}". Style details: ${selectedStyle.promptSuffix}. Ensure text is readable and expressive. Focus on visual storytelling and high click-through rate.`;

      const response = await ai.models.generateContent({
        model: modelName,
        contents: { parts: [{ text: prompt }] },
        config: user.plan === UserPlan.PAID ? {
          imageConfig: { aspectRatio: "16:9", imageSize: "1K" }
        } : {
           imageConfig: { aspectRatio: "16:9" }
        }
      });

      let imageUrl: string | null = null;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (imageUrl) {
        setResultImage(imageUrl);
        if (user.plan === UserPlan.FREE) {
          const newQuota = user.dailyQuotaUsed + 1;
          const updatedUser = { ...user, dailyQuotaUsed: newQuota };
          setUser(updatedUser);
          localStorage.setItem('daily_quota_used', newQuota.toString());
          localStorage.setItem('thumbgenie_user', JSON.stringify(updatedUser));
        }
      } else {
        throw new Error("No image data received from the AI. The model might have returned text instead.");
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("entity was not found") || err.message?.includes("API_KEY_INVALID")) {
        setError("API Key issue. Re-authenticating your session...");
        if (typeof window.aistudio?.openSelectKey === 'function') {
           await window.aistudio.openSelectKey();
        }
      } else {
        setError(err.message || "Failed to generate thumbnail. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `thumbgenie-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: Configuration */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          <div>
            <h1 className="text-3xl font-bold mb-2">Generate Viral Thumbnails</h1>
            <p className="text-slate-400">Describe your video and pick a style. AI will generate the perfect thumbnail for your next hit.</p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-300">Video Title or Topic</label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Surviving 100 Days in a Deserted City..."
              className="w-full h-32 px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none text-lg placeholder:text-slate-600"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-300">Choose a Visual Style</label>
            <div className="grid grid-cols-2 gap-4">
              {STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style)}
                  className={`relative group overflow-hidden rounded-xl border-2 transition-all text-left ${
                    selectedStyle.id === style.id 
                    ? 'border-indigo-500 ring-4 ring-indigo-500/10' 
                    : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <img src={style.previewImage} alt={style.name} className="w-full h-24 object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent">
                    <span className="text-sm font-bold block">{style.name}</span>
                    <span className="text-[10px] text-slate-400 line-clamp-1">{style.description}</span>
                  </div>
                  {selectedStyle.id === style.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateThumbnail}
            disabled={isGenerating}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
              isGenerating 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 active:scale-[0.98]'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-500 border-t-white rounded-full animate-spin"></div>
                Magic in progress...
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Generate Thumbnail
              </>
            )}
          </button>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 animate-in fade-in slide-in-from-top-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">{error}</span>
                {error.includes("limit") && (
                  <button onClick={onUpgrade} className="text-sm font-bold underline text-red-300 hover:text-red-200">Upgrade to Pro</button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Preview */}
        <div className="lg:sticky lg:top-32 space-y-6">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden glass-morphism border-2 border-slate-800 group shadow-2xl bg-slate-900 flex items-center justify-center">
            {resultImage ? (
              <img 
                src={resultImage} 
                alt="Generated Thumbnail" 
                className="w-full h-full object-cover animate-in fade-in zoom-in duration-500" 
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 p-8 text-center space-y-4">
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                    <p className="text-lg font-medium text-slate-300 animate-pulse">Designing your viral asset...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-slate-400">Your generated thumbnail will appear here.</p>
                  </>
                )}
              </div>
            )}
          </div>

          {resultImage && (
            <div className="flex gap-4">
              <button
                onClick={downloadImage}
                className="flex-grow py-4 bg-slate-100 hover:bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PNG (1280x720)
              </button>
              <button
                onClick={() => setResultImage(null)}
                className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-all"
                title="Discard"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          )}

          <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Pro Tip</h4>
            <p className="text-sm text-slate-400">Use emotional words like "Incredible", "Mistake", or "Shocking" in your title for better AI generation results!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
