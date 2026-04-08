"use client";

import Image from "next/image";

interface PostProps {
  name: string;
  avatar: string;
  time: string;
  content: string;
}

export default function Post({ name, avatar, time, content }: PostProps) {
  return (
    <div className="flex flex-col p-6 bg-white rounded-3xl shadow-sm w-fit min-w-[280px] max-w-sm h-[80vh] overflow-hidden">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col pt-2">
          <span className="font-bold text-gray-900 text-xl leading-relaxed">{name}</span>
          <span className="text-base text-gray-400 mt-1">{time}</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col pl-4">
        <div 
          className="text-3xl font-medium text-gray-800 leading-relaxed h-full"
          style={{ 
            writingMode: 'vertical-lr', 
            textOrientation: 'upright',
            letterSpacing: '0.4em'
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
