"use client";

import { useState } from "react";
import Post from "@/components/Post";
import CreatePostModal from "@/components/CreatePostModal";
import { Plus } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("大家");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ["朋友", "大家", "收藏標籤"];

  const mockPosts = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
      time: "2小時前",
      content: "今天學到了一個新的 React Hook! #react #javascript",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      time: "5小時前",
      content: "這是一個充滿陽光的午後，適合喝杯咖啡。 #coffee #sunnyday",
    }
  ];

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-gray-900">
      {/* Header / Tabs */}
      <header className="sticky top-0 z-40 bg-[#f5f5f5]/80 backdrop-blur-md px-8 pt-12 pb-4 border-b border-gray-100">
        <div className="max-w-screen-md mx-auto">
          <nav className="flex gap-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-4 text-2xl font-bold transition-all ${
                  activeTab === tab ? "text-[#2d7d8e]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#2d7d8e] rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Feed Area */}
      <div className="max-w-screen-md mx-auto p-8 flex flex-col items-start border-l border-gray-200 ml-4 md:ml-24 min-h-[calc(100vh-100px)]">
        <div className="w-full flex gap-12 overflow-x-auto pb-12 scrollbar-hide">
          {mockPosts.map((post) => (
            <div key={post.id} className="flex-shrink-0">
              <Post
                name={post.name}
                avatar={post.avatar}
                time={post.time}
                content={post.content}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Create Post Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#2d7d8e] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#246370] transition-all hover:scale-110 active:scale-95"
      >
        <Plus size={32} />
      </button>

      {/* Create Post Modal */}
      <CreatePostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  );
}
