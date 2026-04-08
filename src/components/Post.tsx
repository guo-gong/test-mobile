"use client";

import Image from "next/image";

interface PostProps {
  name: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
}

export default function Post({ name, avatar, time, content, image }: PostProps) {
  return (
    <div className="flex flex-col p-8 bg-white rounded-[40px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-500 w-[320px] h-[75vh] min-h-[500px] overflow-hidden group border border-gray-50/50">
      {/* Header */}
      <div className="flex items-start gap-4 mb-10 group-hover:translate-x-1 transition-transform duration-500">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white ring-4 ring-gray-50 flex-shrink-0 shadow-sm">
          <Image src={avatar} alt={name} fill className="object-cover" unoptimized />
        </div>
        <div className="flex flex-col pt-1">
          <span className="font-bold text-gray-900 text-lg tracking-tight leading-none mb-1.5">{name}</span>
          <span className="text-sm font-medium text-gray-300 uppercase tracking-widest">{time}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Vertical Text */}
        <div 
          className="text-[2.2rem] font-medium text-gray-800 leading-[1.6] h-full"
          style={{ 
            writingMode: 'vertical-lr', 
            textOrientation: 'upright',
            letterSpacing: '0.3em',
            wordBreak: 'break-all'
          }}
        >
          {content.split(' ').map((word, i) => (
            <span key={i} className={word.startsWith('#') ? 'text-[#2d7d8e] font-bold' : ''}>
              {word}
            </span>
          ))}
        </div>

        {/* Optional Image */}
        {image && (
          <div className="relative flex-1 h-full rounded-2xl overflow-hidden bg-gray-50 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
            <Image src={image} alt="Post content" fill className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" unoptimized />
          </div>
        )}
      </div>

      {/* Action Footer (Optional/Decorative) */}
      <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between text-gray-300 group-hover:text-gray-400 transition-colors">
        <div className="flex gap-4">
          <div className="w-2 h-2 rounded-full bg-current" />
          <div className="w-2 h-2 rounded-full bg-current opacity-50" />
          <div className="w-2 h-2 rounded-full bg-current opacity-25" />
        </div>
        <span className="text-xs font-bold tracking-tighter">VIEW DETAILS</span>
      </div>
    </div>
  );
}
