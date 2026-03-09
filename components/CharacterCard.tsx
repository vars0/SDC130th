import React from 'react';
import { BookData } from '../types';

interface CharacterCardProps {
  data: BookData;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ data }) => {
  return (
    <div className="group relative w-full aspect-[1/1.8] bg-white border-2 border-black flex flex-col transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_black] overflow-hidden cursor-pointer">
       {/* Photo Area */}
       <div className="w-full h-[78%] bg-neutral-100 border-b-2 border-black overflow-hidden relative">
          {data.imageUrl ? (
            <img 
              src={data.imageUrl} 
              alt={data.characterRole} 
              className="w-full h-full object-cover object-top lg:grayscale transition-all duration-500 lg:group-hover:grayscale-0 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-200">
               <span className="font-oswald text-neutral-400 text-2xl font-bold opacity-30">NO IMAGE</span>
            </div>
          )}
          
          {/* Accent Badge */}
          <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 font-oswald text-[10px] font-bold tracking-widest z-10">
            CHARACTER
          </div>
       </div>

       {/* Text Content */}
       <div className="p-3 flex flex-col flex-grow bg-white justify-between">
          <div>
             {/* Role (Hierarchy 1) */}
             <h3 className="font-sebang font-black text-xl leading-none mb-1 tracking-tight truncate">
               {data.characterRole}
             </h3>
             {/* Actor Name (Hierarchy 2) */}
             <div className="flex items-center gap-2 mb-2">
                <div className="h-px w-3 bg-black"></div>
                <p className="font-sebang font-bold text-sm text-neutral-600">
                  {data.author}
                </p>
             </div>
          </div>

          {/* Description */}
          <div className="relative pt-2 border-t border-neutral-200">
            <p className="font-sebang text-xs text-neutral-800 leading-tight break-keep line-clamp-3">
               {data.roleDescription}
            </p>
          </div>
       </div>
    </div>
  );
};