import React, { useState, useEffect } from 'react';
import { appData } from './data';
import { Bookshelf } from './components/Bookshelf';
import { CompLoading } from './components/CompLoading';
import { MapPin, Calendar, Clock, Map, Instagram, X, HelpCircle } from 'lucide-react';

const Signboard = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasClickedTooltip, setHasClickedTooltip] = useState(false);

  return (
    <div className="relative flex flex-col items-center my-20">
      {/* The Signboard */}
      <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative max-w-2xl w-full text-center z-10">
        <h3 className="font-sebang font-bold text-xl md:text-2xl text-black mb-2">
          공연진의 한마디
        </h3>
        <p className="font-sebang text-neutral-600 font-medium text-sm md:text-base">
          "내가 출판사에 다닌다면 만들고 싶은 책 제목은?"
        </p>

        {/* Tooltip Icon */}
        <div className="absolute -right-4 -top-4 z-20 flex items-center justify-center">
          {!hasClickedTooltip && (
            <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-60 animate-ping" style={{ animationDuration: '2s' }}></span>
          )}
          <button 
            className="relative bg-yellow-300 rounded-full p-1 shadow-[2px_2px_0px_black] border-2 border-black hover:bg-yellow-400 transition-colors"
            onClick={() => {
              setShowTooltip(!showTooltip);
              setHasClickedTooltip(true);
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <HelpCircle className="w-8 h-8 text-black" />
          </button>
        </div>

        {/* Tooltip Content */}
        {showTooltip && (
          <div className="absolute top-full right-0 md:-right-12 mt-4 bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left w-80 z-30 text-sm font-sebang animate-fade-in">
            <p className="font-bold text-black mb-1 bg-yellow-300 inline-block px-1">공연진의 한마디란?</p>
            <p className="text-neutral-700 mb-4 leading-relaxed break-keep">
              질문에 대해 공연진이 답을 하는 성균극회의 문화입니다. 공연진 개개인의 개성이 담긴 한마디를 감상해보세요!
            </p>
            <p className="font-bold text-black mb-1 bg-yellow-300 inline-block px-1">어디에 있나요?</p>
            <p className="text-neutral-700 leading-relaxed break-keep">
              이번 공연진의 한마디는 책의 제목에 위치해 있습니다.
            </p>
          </div>
        )}
      </div>
      
      {/* Signboard Post */}
      <div className="w-4 h-12 bg-black -mt-1 z-0"></div>
      <div className="w-16 h-2 bg-black rounded-full opacity-20 mt-1"></div>
    </div>
  );
};

const MagicEffects = () => {
  const [effect, setEffect] = useState<'sojuOn' | 'sojuOff' | null>(null);

  useEffect(() => {
    const handleSojuUpdate = (e: any) => {
      if (e.detail && e.detail.type) {
        setEffect(e.detail.type);
        setTimeout(() => setEffect(null), 1500);
      }
    };
    window.addEventListener('sojuUpdate', handleSojuUpdate);
    return () => window.removeEventListener('sojuUpdate', handleSojuUpdate);
  }, []);

  if (!effect) return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center">
      {effect === 'sojuOn' && (
        <div className="absolute inset-0 bg-green-500/30 animate-magic-on flex items-center justify-center">
          <img src="./Drink.svg" className="w-48 h-48 animate-bounce" alt="Soju" />
        </div>
      )}
      {effect === 'sojuOff' && (
        <div className="absolute inset-0 bg-white/70 animate-magic-off flex items-center justify-center">
          <div className="text-9xl animate-ping">✨</div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [showTicketAlert, setShowTicketAlert] = useState(false);

  useEffect(() => {
    // Wait for CompLoading to finish (approx 4.5s total with fade)
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const handleTicketClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const openDate = new Date("2026-02-25T15:00:00");
    const now = new Date();
    
    if (now < openDate) {
      setShowTicketAlert(true);
    } else {
      window.open("https://forms.gle/awgVWb3XZSCoxJib9/", "_blank");
    }
  };

  return (
    <>
      <CompLoading />
      <MagicEffects />
      <div className={`relative min-h-screen w-full bg-neutral-100 bg-grain text-black selection:bg-black selection:text-white transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* --- Ticket Alert Modal --- */}
      {showTicketAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white border-4 border-black p-6 md:p-8 max-w-sm w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative animate-bounce-in">
             <button 
               onClick={() => setShowTicketAlert(false)}
               className="absolute top-2 right-2 p-1 hover:bg-neutral-100 transition-colors"
             >
               <X className="w-6 h-6" />
             </button>
             <h3 className="font-oswald font-bold text-2xl mb-4 border-b-2 border-black pb-2 inline-block">NOTICE</h3>
             <p className="font-sebang font-bold text-lg mb-2">예매 오픈 대기중!</p>
             <p className="font-sebang text-sm text-neutral-600 mb-6 leading-relaxed">
               티켓 예매는 <br/>
               <span className="font-bold text-black bg-yellow-300 px-1">2026년 2월 25일 15시</span>부터<br/>
               가능합니다. 잠시만 기다려주세요!
             </p>
             <button 
               onClick={() => setShowTicketAlert(false)}
               className="w-full bg-black text-white font-bold py-3 hover:bg-neutral-800 transition-colors"
             >
               확인
             </button>
          </div>
        </div>
      )}

      {/* --- Main Content --- */}
      <main className="relative z-10 container mx-auto px-4 py-16 max-w-6xl">
        
        {/* Poster Header */}
        <header className="mb-24 border-b-8 border-black pb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
            <div>
              <p className="font-sebang font-bold text-sm mb-2 uppercase tracking-widest border border-black inline-block px-2 py-1">
                제130회 대공연
              </p>
              <h1 className="font-sebang font-black text-6xl md:text-8xl leading-[1.1] tracking-tight mb-4">
                {appData.title.split(' ').map((word, i) => (
                  <span key={i} className="block md:inline mr-4">{word}</span>
                ))}
              </h1>
              {/* Creative Team Credits */}
              <div className="font-sebang text-lg md:text-xl font-bold mt-2 flex flex-wrap gap-4 text-neutral-800">
                <span>작 <span className="text-black">신호권</span></span>
                <span className="text-neutral-400">|</span>
                <span>연출 <span className="text-black">김동건</span></span>
                <span className="text-neutral-400">|</span>
                <span>기획 <span className="text-black">김윤형</span></span>
              </div>
            </div>
            <div className="mt-8 md:mt-0 text-right">
              <p className="font-oswald text-2xl font-bold border-b-2 border-black inline-block mb-1">2026.03.05 - 08</p>
              <p className="font-sebang text-lg font-bold">예술공간 혜화</p>
              <p className="text-xs text-neutral-500 mt-2 font-sebang">성균극회 since 1946</p>
            </div>
          </div>
          
          <div className="w-full h-4 bg-black pattern-diagonal-lines"></div>
        </header>

        {/* Synopsis Section - Styled to match Bookshelf headers */}
        <section className="mb-24">
          <div className="flex items-center mb-8 border-b-4 border-black pb-2 justify-center md:justify-start">
             <div className="bg-black text-white px-3 py-2 mr-4 min-w-[120px] text-center">
                <span className="font-oswald font-bold text-xl tracking-widest uppercase">
                  SYNOPSIS
                </span>
             </div>
             <h2 className="font-sebang font-bold text-3xl tracking-tight text-black hidden md:block">
               시놉시스
             </h2>
             <div className="flex-grow ml-4 h-px bg-black opacity-20 bg-[length:4px_1px] bg-repeat-x hidden md:block"></div>
          </div>

          <div className="flex justify-center">
            <div className="max-w-3xl text-center md:text-left w-full md:pl-8">
               <p className="font-sebang text-base md:text-lg leading-loose whitespace-pre-wrap text-neutral-800">
                 {appData.synopsis}
               </p>
               <div className="w-16 h-1 bg-black mx-auto md:mx-0 mt-8"></div>
            </div>
          </div>
        </section>

        {/* Shelves Container */}
        <div className="space-y-16 pb-20">
          {appData.shelves.map((shelf) => (
            <React.Fragment key={shelf.id}>
              <Bookshelf shelf={shelf} />
              {shelf.id === 'section-character' && <Signboard />}
            </React.Fragment>
          ))}
        </div>

        {/* Special Thanks Section */}
        <section className="mb-24 border-t-4 border-black pt-12">
           <h2 className="font-oswald font-bold text-3xl tracking-widest uppercase mb-8 text-center">
             SPECIAL THANKS TO
           </h2>
           <div className="flex flex-col items-center gap-4">
              {appData.specialThanks.map((person, idx) => (
                <span key={idx} className="font-sebang text-lg font-bold border-b border-black pb-1">
                  {person}
                </span>
              ))}
           </div>
        </section>

        {/* Performance Information Section */}
        <section className="mb-24 bg-white border-2 border-black p-6 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center mb-8 border-b-4 border-black pb-2">
            <h2 className="font-sebang font-bold text-3xl tracking-tight text-black">
              공연 정보
            </h2>
            <span className="ml-4 font-oswald text-neutral-400">INFORMATION</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Schedule & Basic Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-xl mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  일시 및 회차
                </h3>
                <ul className="space-y-3 font-sebang">
                  {appData.schedule.map((item, idx) => (
                    <li key={idx} className="flex items-center border-b border-neutral-200 pb-2">
                      <span className="font-bold bg-black text-white px-2 py-0.5 text-sm mr-4 w-16 text-center shrink-0">{item.round}</span>
                      <span className="text-left">{item.date} {item.time}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-sm text-neutral-600 space-y-1">
                   <p>• 관람가격: 무료</p>
                   <p>• 공연시간: 100분</p>
                   <p className="text-xs text-neutral-400 pl-2">* 변동 가능</p>
                </div>
              </div>
            </div>

            {/* Right: Ticketing & Location */}
            <div className="space-y-8">
              {/* Ticket Section */}
              <div>
                <h3 className="font-bold text-xl mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  예매 안내
                </h3>
                <p className="mb-2 font-bold">예매 시작: 2월 25일 15시~</p>
                <a 
                  href="#"
                  onClick={handleTicketClick}
                  className="block w-full bg-black text-white text-center font-oswald text-xl py-4 hover:bg-neutral-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] mb-4"
                >
                  RESERVE TICKET &rarr;
                </a>
                <div className="text-sm text-neutral-600 space-y-1 font-sebang bg-neutral-100 p-3">
                  <p>• 극장 입장은 공연 시작 20분 전부터 진행됩니다!</p>
                  <p>• 잔여좌석이 있으면 현장 예매도 가능합니다!</p>
                </div>
              </div>

              {/* Location Section */}
              <div>
                <h3 className="font-bold text-xl mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  오시는 길
                </h3>
                
                {/* Visual Hierarchy Applied Here */}
                <div className="mb-4 border-l-4 border-black pl-4">
                  <p className="font-sebang font-black text-2xl tracking-tight mb-1">
                    예술공간 혜화
                  </p>
                  <p className="font-sebang text-sm text-neutral-600 font-medium">
                    (서울특별시 종로구 혜화로 10-3)
                  </p>
                </div>
                
                <div className="flex gap-4 mb-6">
                  <a 
                    href="https://naver.me/I55aL4OY" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#03C75A] text-white py-3 px-4 font-bold text-center shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Map className="w-4 h-4" /> 네이버 지도
                  </a>
                  <a 
                    href="https://kko.to/2X5sskrUAK" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#FAE100] text-[#3C1E1E] py-3 px-4 font-bold text-center shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Map className="w-4 h-4" /> 카카오맵
                  </a>
                </div>

                 {/* Parking Info */}
                <div className="border border-neutral-300 p-4 bg-white">
                  <h4 className="font-bold mb-2">주차안내</h4>
                  <p className="text-sm mb-1 text-neutral-600">극장 주차장 이용 불가</p>
                  <p className="text-sm mb-3 text-neutral-600">성균관대학교 내 주차장(유료) 이용 가능</p>
                  <a 
                    href="https://www.skku.edu/skku/about/campusInfo/parking.do"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 border border-neutral-200 p-2 hover:bg-neutral-50 transition-colors mb-2"
                  >
                    {/* Placeholder for the image requested */}
                    <div className="w-12 h-12 bg-neutral-200 flex items-center justify-center">
                      <span className="font-oswald font-bold text-xs text-neutral-500">SKKU</span>
                    </div>
                    <span className="font-sebang font-bold text-sm">성균관대학교 주차안내</span>
                  </a>
                  
                  <a 
                    href="https://naver.me/GPdHR5Qc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 border border-neutral-200 p-2 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-neutral-200 flex items-center justify-center">
                      <span className="font-oswald font-bold text-xs text-neutral-500">PARKING</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sebang font-bold text-sm">명륜1가공영주차장</span>
                      <span className="text-xs text-neutral-500">5분 300원</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Updated */}
        <footer className="border-t-4 border-black pt-12 pb-12 font-sebang text-sm text-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-12">
            
            {/* Left: Contact Info */}
            <div className="space-y-4">
               <a 
                 href="https://www.instagram.com/skku_dramaclub" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 font-bold text-lg hover:text-neutral-600 transition-colors"
               >
                 <span>문의 |</span> 
                 <Instagram className="w-5 h-5" />
                 <span>@skku_dramaclub</span>
               </a>
               <div className="space-y-1">
                 <p className="font-bold text-base">성균관대학교극예술연구회</p>
                 <p className="text-neutral-600">기획팀장 65기 김윤형 010-4120-6938</p>
               </div>
            </div>

            {/* Right: Credits */}
            <div className="text-left md:text-right space-y-2">
               <p><span className="font-bold">Web by</span> 이재욱</p>
               <p><span className="font-bold">Photo by</span> 이지원</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-neutral-300 pt-6 text-center text-xs text-neutral-500">
             Copyright © 2026 성균관대학교극예술연구회 All rights reserved.
          </div>
        </footer>

      </main>
    </div>
    </>
  );
};

export default App;