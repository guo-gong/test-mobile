"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, Tag, AtSign, Globe, Lock } from "lucide-react";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (content: string) => void;
}

export default function CreatePostModal({ isOpen, onClose, onPost }: CreatePostModalProps) {
  const [content, setContent] = useState("");
  const [privacy, setPrivacy] = useState("public");

  if (!isOpen) return null;

  const handlePost = () => {
    if (content.trim()) {
      onPost(content);
      setContent("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
          <button 
            onClick={onClose}
            className="text-gray-400 font-bold hover:text-gray-900 transition-colors text-lg"
          >
            CANCEL
          </button>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">NEW PLAZA POST</h2>
            <div className="flex items-center gap-2 mt-1">
              <button 
                onClick={() => setPrivacy(privacy === "public" ? "private" : "public")}
                className="flex items-center gap-1.5 text-xs font-bold text-[#2d7d8e] bg-[#2d7d8e]/10 px-2 py-0.5 rounded-full uppercase tracking-tighter hover:bg-[#2d7d8e]/20 transition-colors"
              >
                {privacy === "public" ? <Globe size={12} /> : <Lock size={12} />}
                {privacy}
              </button>
            </div>
          </div>
          <button 
            onClick={handlePost}
            disabled={!content.trim()}
            className="bg-gray-900 text-white px-10 py-3 rounded-full font-black hover:bg-[#2d7d8e] disabled:bg-gray-100 disabled:text-gray-300 transition-all duration-300 text-lg shadow-lg hover:shadow-[#2d7d8e]/20 active:scale-95"
          >
            POST
          </button>
        </div>

        {/* Content Area */}
        <div className="px-8 pt-8 pb-4">
          <div className="flex gap-4 mb-6">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-50 flex-shrink-0">
              <Image 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" 
                alt="User" 
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <textarea 
              autoFocus
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening in your world?" 
              className="w-full min-h-[160px] text-2xl font-medium text-gray-800 placeholder-gray-300 border-none focus:ring-0 resize-none p-0 leading-relaxed mt-2"
            />
          </div>
          
          {/* Action Bar */}
          <div className="flex items-center justify-between py-4 border-t border-gray-50">
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-[#2d7d8e] hover:bg-[#2d7d8e]/5 p-3 rounded-2xl transition-all duration-300">
                <ImageIcon size={28} />
              </button>
              <button className="text-gray-400 hover:text-[#2d7d8e] hover:bg-[#2d7d8e]/5 p-3 rounded-2xl transition-all duration-300">
                <Tag size={28} />
              </button>
              <button className="text-gray-400 hover:text-[#2d7d8e] hover:bg-[#2d7d8e]/5 p-3 rounded-2xl transition-all duration-300">
                <AtSign size={28} />
              </button>
            </div>
            
            <div className="text-sm font-black text-gray-200 tracking-widest">
              {content.length} / 280
            </div>
          </div>
        </div>

        {/* Suggestion tags */}
        <div className="px-8 pb-8 flex gap-3 overflow-x-auto scrollbar-hide">
          {["#Life", "#Design", "#Code", "#Travel"].map(tag => (
            <button 
              key={tag}
              onClick={() => setContent(prev => prev + " " + tag)}
              className="flex-shrink-0 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-xl text-sm font-bold transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
