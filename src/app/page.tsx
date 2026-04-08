"use client";

import { useState, useMemo } from "react";
import Post from "@/components/Post";
import CreatePostModal from "@/components/CreatePostModal";
import { Plus, Search, Bell, Settings } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("大家");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ["朋友", "大家", "收藏標籤"];

  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      time: "2 HOURS AGO",
      content: "生活在台北的午後，陽光灑進咖啡館的窗戶，這一刻感覺時間慢了下來。 #taipei #vibe",
      image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&h=800&fit=crop",
      category: "大家"
    },
    {
      id: 2,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      time: "5 HOURS AGO",
      content: "今天終於完成了我的第一個大型專案，這種成就感真的難以言喻！ #frontend #proud",
      category: "朋友"
    },
    {
      id: 3,
      name: "Marcus Wong",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      time: "8 HOURS AGO",
      content: "在不眠的城市中尋找那一抹寧靜。 #citylife #night",
      image: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=400&h=800&fit=crop",
      category: "大家"
    },
    {
      id: 4,
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      time: "1 DAY AGO",
      content: "好久不見的朋友，今天下午茶聊得很開心。 #friendship #teatime",
      category: "朋友"
    }
  ]);

  const filteredPosts = useMemo(() => {
    if (activeTab === "收藏標籤") return posts.filter(p => p.content.includes("#"));
    return posts.filter(p => p.category === activeTab || activeTab === "大家");
  }, [activeTab, posts]);

  const handleAddPost = (newPostContent: string) => {
    const newPost = {
      id: Date.now(),
      name: "Current User",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      time: "JUST NOW",
      content: newPostContent,
      category: "大家"
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900 selection:bg-[#2d7d8e]/10">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2d7d8e]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      {/* Header / Tabs */}
      <header className="sticky top-0 z-40 bg-[#fafafa]/80 backdrop-blur-xl px-8 pt-10 pb-2">
        <div className="max-w-screen-2xl mx-auto flex items-end justify-between">
          <nav className="flex gap-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-6 text-[1.75rem] font-black transition-all duration-300 ${
                  activeTab === tab ? "text-gray-900 scale-105" : "text-gray-300 hover:text-gray-400"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#2d7d8e] rounded-full animate-in slide-in-from-bottom-2 duration-300" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6 pb-6 text-gray-400">
            <button className="hover:text-gray-900 transition-colors"><Search size={24} /></button>
            <button className="hover:text-gray-900 transition-colors relative">
              <Bell size={24} />
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#fafafa]" />
            </button>
            <button className="hover:text-gray-900 transition-colors"><Settings size={24} /></button>
          </div>
        </div>
      </header>

      {/* Feed Area */}
      <div className="relative z-10 w-full overflow-hidden">
        <div className="flex gap-10 px-12 py-16 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          <div className="flex-shrink-0 w-20 md:w-40" /> {/* Spacer */}
          {filteredPosts.map((post) => (
            <div key={post.id} className="flex-shrink-0 snap-center">
              <Post
                name={post.name}
                avatar={post.avatar}
                time={post.time}
                content={post.content}
                image={post.image}
              />
            </div>
          ))}
          <div className="flex-shrink-0 w-20 md:w-40" /> {/* Spacer */}
        </div>
      </div>

      {/* Floating Create Post Button */}
      <div className="fixed bottom-12 right-12 flex flex-col items-center gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-20 h-20 bg-gray-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#2d7d8e] transition-all duration-500 hover:scale-110 active:scale-95 group"
        >
          <Plus size={40} className="group-hover:rotate-90 transition-transform duration-500" />
        </button>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onPost={handleAddPost}
      />
    </main>
  );
}
