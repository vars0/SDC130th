import React, { useState, useEffect } from 'react';
import { BookData } from '../types';
import { FileText, Bookmark, Paperclip, Mic2, FolderOpen, PenTool, Crown, Star, Anchor, Music, DollarSign, CloudLightning, Sandwich, Pen, Lightbulb, Hammer, Scissors, Briefcase } from 'lucide-react';

interface BookProps {
  book: BookData;
  defaultIcon?: 'star' | 'music' | 'burger' | 'jellyfish' | 'anchor' | 'money' | 'pen' | 'lightbulb' | 'hammer' | 'scissors' | 'briefcase';
}

export const Book: React.FC<BookProps> = ({ book, defaultIcon }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSoju, setIsSoju] = useState(false);

  useEffect(() => {
    const checkSoju = () => {
      const isSojuGlobal = (window as any).isSojuGlobal;
      setIsSoju(!!isSojuGlobal);
    };

    checkSoju();
    window.addEventListener('sojuUpdate', checkSoju);
    return () => window.removeEventListener('sojuUpdate', checkSoju);
  }, []);

  const displayTitle = (book.author === '엄현식' && new Date().getMonth() === 2 && new Date().getDate() === 5) ? "오늘은 제 생일입니다" : book.title;

  // Icon / Content rendering logic
  const renderContent = () => {
    // 0. Soju Easter Egg
    if (isSoju) {
       return <img src="./Drink.svg" className="w-8 h-8 mb-3 object-contain animate-bounce" alt="Soju" />;
    }

    // 1. If it's a leader, show Crown
    if (book.isLeader) {
      return <Crown className={`w-8 h-8 mb-3 text-yellow-500 fill-current drop-shadow-md`} />;
    }

    // 2. If it's a Cast member (has characterRole), show the role text
    if (book.characterRole) {
      return (
        <div className={`mb-3 text-2xl font-bold tracking-tight border-b-2 border-current pb-1 ${book.textColor === 'text-white' ? 'opacity-100' : 'opacity-80'}`}>
          {book.characterRole}
        </div>
      );
    }

    // 3. Otherwise, use unified icon if available
    const iconProps = { className: `w-8 h-8 mb-3 ${book.textColor === 'text-white' ? 'opacity-90' : 'opacity-60'}` };
    
    if (defaultIcon) {
        switch (defaultIcon) {
            case 'star': return <Star {...iconProps} />;
            case 'music': return <Music {...iconProps} />;
            case 'burger': return <Sandwich {...iconProps} />;
            case 'jellyfish': return <CloudLightning {...iconProps} />; 
            case 'anchor': return <Anchor {...iconProps} />;
            case 'money': return <DollarSign {...iconProps} />;
            case 'pen': return <Pen {...iconProps} />;
            case 'lightbulb': return <Lightbulb {...iconProps} />;
            case 'hammer': return <Hammer {...iconProps} />;
            case 'scissors': return <Scissors {...iconProps} />;
            case 'briefcase': return <Briefcase {...iconProps} />;
            default: break;
        }
    }

    // Fallback Icon (Unified for all others if no defaultIcon)
    return <FileText {...iconProps} />;
  };

  return (
    <div 
      className={`relative w-full aspect-[2/3] group cursor-pointer transition-transform duration-200 ease-linear ${isHovered ? '-translate-y-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shadow/Stack Effect behind the book */}
      <div className={`absolute top-2 left-2 w-full h-full border-2 border-black bg-neutral-400 transition-all duration-200 ${isHovered ? 'top-3 left-3' : 'top-1 left-1'}`}></div>

      {/* Main Cover */}
      <div 
        className={`
          relative
          w-full h-full
          ${book.color} 
          border-2 border-black
          flex flex-col justify-between
          p-4
          ${book.textColor || 'text-black'}
        `}
      >
        {/* Top: Barcode or ID */}
        <div className="flex justify-between items-start border-b border-current pb-2 opacity-50">
          <span className="text-[10px] font-mono tracking-widest">NO.{book.id.toUpperCase()}</span>
          <div className="w-8 h-3 bg-current opacity-20"></div>
        </div>

        {/* Middle: Title or Content */}
        <div className="flex flex-col items-start my-auto">
          {renderContent()}
          <h3 className="font-sebang font-bold text-lg leading-tight tracking-tight break-words w-full line-clamp-3">
            {displayTitle || "Untitled"}
          </h3>
        </div>

        {/* Bottom: Author/Meta */}
        <div className="pt-2 border-t-2 border-current w-full">
          <p className="font-sebang text-xs font-bold uppercase tracking-wider truncate">
            {book.author}
          </p>
          <div className="flex gap-1 mt-1">
             <div className="w-full h-1 bg-current opacity-30"></div>
             <div className="w-1/3 h-1 bg-current opacity-60"></div>
          </div>
        </div>
      </div>
    </div>
  );
};