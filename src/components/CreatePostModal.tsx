"use client";

import { X, Image as ImageIcon, Tag, AtSign } from "lucide-react";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <button 
            onClick={onClose}
            className="text-gray-600 font-medium hover:text-gray-900 transition-colors"
          >
            取消
          </button>
          <h2 className="text-lg font-bold text-gray-900">創建新貼文</h2>
          <button className="bg-[#2d7d8e] text-white px-6 py-1.5 rounded-full font-medium hover:bg-[#246370] transition-colors">
            發布
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-gray-900">Your Name</span>
        </div>

        {/* Content Area */}
        <div className="px-4 pb-4">
          <textarea 
            placeholder="今天想分享些什麼？" 
            className="w-full h-32 text-lg text-gray-700 placeholder-gray-400 border-none focus:ring-0 resize-none p-0"
          />
          
          {/* Media Placeholder */}
          <div className="relative mt-4 group">
            <div className="w-full aspect-[2/1] rounded-xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2 group-hover:bg-gray-100 transition-colors cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop" 
                alt="Upload placeholder" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity"
              />
              <div className="relative z-10 flex flex-col items-center justify-center text-white drop-shadow-md">
                <span className="font-bold text-xl">點擊上傳媒體</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-6 px-4 py-4 border-t">
          <button className="text-[#2d7d8e] hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ImageIcon size={24} />
          </button>
          <button className="text-[#2d7d8e] hover:bg-gray-100 p-2 rounded-full transition-colors">
            <Tag size={24} />
          </button>
          <button className="text-[#2d7d8e] hover:bg-gray-100 p-2 rounded-full transition-colors">
            <AtSign size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
