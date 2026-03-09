import React, { useState, useEffect, useRef } from 'react';
import { BookData } from '../types';
import { X, ChevronLeft, ChevronRight, Heart, Lock, Unlock, Upload, Camera, Crown, Wine, Cat } from 'lucide-react';
import { castHistory, memberPasswords } from '../data/parsedData';
import { ref, onValue, runTransaction } from 'firebase/database';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db, firestore } from '../firebaseConfig';

interface BookReaderProps {
  book: BookData;
  initialRect: DOMRect | null;
  onClose: () => void;
}

interface GuestbookEntry {
  id: string;
  imageUrl: string;
  isPrivate: boolean;
  timestamp: number;
}

// Utility component removed

// Global state for persistence until refresh
let isSojuGlobal = false;

export const BookReader: React.FC<BookReaderProps> = ({ book, initialRect, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState<'forward' | 'backward' | null>(null);
  const [likes, setLikes] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Easter Egg States
  const [clickCount, setClickCount] = useState(0); // For Lee Jaeuk
  const [isSoju, setIsSoju] = useState(isSojuGlobal); // For Jung Woohyuk
  const [cats, setCats] = useState<{id: number, x: number, y: number, rot: number, scale: number}[]>([]); // For Lee Sumin
  const [shake, setShake] = useState<number>(0); // For Ji Seohyun
  const [swipeUnlocked, setSwipeUnlocked] = useState(false); // For Jin Taehun
  const [swipeScores, setSwipeScores] = useState<any[]>([]);
  
  // Jung Junwon
  const [junwonHeartClicked, setJunwonHeartClicked] = useState(false);
  const [junwonPhotoSwapped, setJunwonPhotoSwapped] = useState(false);

  // Eom Hyunsik
  const [hyunsikHeartClicked, setHyunsikHeartClicked] = useState(false);
  const [showPoop, setShowPoop] = useState(false);
  const [poopPos, setPoopPos] = useState({ x: 0, y: 0 });
  const [isDraggingPoop, setIsDraggingPoop] = useState(false);
  const [showPoopList, setShowPoopList] = useState(false);
  const [poopList, setPoopList] = useState<any[]>([]);
  const [hasDroppedPoop, setHasDroppedPoop] = useState(false);
  const [customPrompt, setCustomPrompt] = useState<{ message: string, onSubmit: (val: string) => void } | null>(null);
  const [showJaeukModal, setShowJaeukModal] = useState(false);

  const shakeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Animation States
  const [isOpening, setIsOpening] = useState(true);
  const [styles, setStyles] = useState<React.CSSProperties>({
    position: 'fixed',
    top: initialRect ? initialRect.top : '50%',
    left: initialRect ? initialRect.left : '50%',
    width: initialRect ? initialRect.width : '0px',
    height: initialRect ? initialRect.height : '0px',
    zIndex: 101, // Higher than overlay
    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    transform: initialRect ? 'none' : 'translate(-50%, -50%)',
  });

  // Guestbook State - Removed for now
  const [guestbookImages] = useState<any[]>([]);
  const [isUnlocked] = useState(false);
  const [uploading] = useState(false);
  const [isPrivateUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Guestbook State
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayTitle = (book.author === '엄현식' && new Date().getMonth() === 2 && new Date().getDate() === 5) ? "오늘은 제 생일입니다" : book.title;

  // Determine the correct ID for Firebase
  const getFirebaseId = (id: string) => {
    if (id.startsWith('Char_')) {
      return id.replace('Char_', 'Cast_');
    }
    return id;
  };

  const firebaseId = getFirebaseId(book.id);

  // Fetch Guestbook Messages
  useEffect(() => {
    const q = query(
      collection(firestore, 'guestbooks'),
      where('bookId', '==', firebaseId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [firebaseId]);

  const handleGuestbookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !authorName.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(firestore, 'guestbooks'), {
        bookId: firebaseId,
        author: authorName,
        message: newMessage,
        createdAt: serverTimestamp(),
      });
      setNewMessage('');
      setAuthorName('');
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch likes from Firebase
  useEffect(() => {
    const likesRef = ref(db, `likes/${firebaseId}`);
    const unsubscribe = onValue(likesRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setLikes(data);
      } else {
        setLikes(0);
      }
    });

    return () => unsubscribe();
  }, [firebaseId]);

  // Swipe Brick Breaker Leaderboard
  useEffect(() => {
    if (swipeUnlocked) {
      const q = query(collection(firestore, 'swipeScores'), orderBy('score', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setSwipeScores(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return () => unsubscribe();
    }
  }, [swipeUnlocked]);

  useEffect(() => {
    const handleMessage = async (e: MessageEvent) => {
      if (e.data?.type === 'SWIPE_GAME_OVER') {
        const score = e.data.score;
        setCustomPrompt({
          message: `게임 오버! 점수: ${score}\n순위표에 등록할 이름을 입력하세요:`,
          onSubmit: async (name) => {
            try {
              await addDoc(collection(firestore, 'swipeScores'), {
                name: name.substring(0, 10),
                score,
                createdAt: serverTimestamp()
              });
            } catch (error) {
              console.error("Error saving score:", error);
            }
          }
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Responsive Check & Opening Animation
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Trigger animation to expand
    const timer = setTimeout(() => {
      setIsOpening(false);
      // Determine final size based on screen
      const isSmallScreen = window.innerWidth < 768;
      const finalWidth = isSmallScreen ? '90vw' : '1000px'; // max-w-6xlish
      const finalHeight = isSmallScreen ? '60vh' : '80vh';
      
      setStyles({
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: isSmallScreen ? '85vw' : '90vw',
        maxWidth: isSmallScreen ? '400px' : '1000px',
        aspectRatio: isSmallScreen ? '1 / 1.4' : '2160 / 1350',
        transform: 'translate(-50%, -50%)',
        zIndex: 101,
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      });
    }, 50);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
      if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);
    };
  }, []);

  // Eom Hyunsik Poop List
  useEffect(() => {
    if (showPoopList) {
      const q = query(collection(firestore, 'poops'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setPoopList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return () => unsubscribe();
    }
  }, [showPoopList]);

  // Draggable Poop logic
  const handlePoopPointerDown = (e: React.PointerEvent) => {
    setIsDraggingPoop(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const handlePoopPointerMove = (e: React.PointerEvent) => {
    if (isDraggingPoop) {
      setPoopPos({ x: e.clientX, y: e.clientY });
    }
  };
  const handlePoopPointerUp = async (e: React.PointerEvent) => {
    if (!isDraggingPoop) return;
    setIsDraggingPoop(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    if (hasDroppedPoop) return;
    setHasDroppedPoop(true);

    // Check if dropped on head
    const photoContainer = document.getElementById('profile-photo-container');
    if (photoContainer) {
      const rect = photoContainer.getBoundingClientRect();
      const clientX = e.clientX || poopPos.x;
      const clientY = e.clientY || poopPos.y;
      
      // Hitbox: horizontal center 30% (35% to 65%), top 20% (0% to 20%)
      const hitLeft = rect.left + rect.width * 0.35;
      const hitRight = rect.left + rect.width * 0.65;
      const hitTop = rect.top;
      const hitBottom = rect.top + rect.height * 0.20;

      if (
        clientX >= hitLeft && clientX <= hitRight &&
        clientY >= hitTop && clientY <= hitBottom
      ) {
        setCustomPrompt({
          message: "정확히 머리에 명중했습니다!\n이름을 입력하세요:",
          onSubmit: async (name) => {
            try {
              await addDoc(collection(firestore, 'poops'), {
                name: name.substring(0, 10),
                createdAt: serverTimestamp()
              });
            } catch (error) {
              console.error("Error saving poop:", error);
            }
          }
        });
      }
    }
  };

  const handleLike = () => {
    // Optimistic update
    setLikes(prev => prev + 1);
    
    // Easter Egg Logics
    if (book.author === '이재욱') {
      setClickCount(prev => {
        const next = prev + 1;
        if (next === 549) {
          setShowJaeukModal(true);
        }
        return next;
      });
    }
    if (book.author === '정우혁') {
      if (!isSojuGlobal) {
        isSojuGlobal = true;
        setIsSoju(true);
        (window as any).isSojuGlobal = true;
        window.dispatchEvent(new CustomEvent('sojuUpdate', { detail: { type: 'sojuOn' } }));
      }
    }
    if (book.author === '하선영') {
      if (isSojuGlobal) {
        isSojuGlobal = false;
        setIsSoju(false);
        (window as any).isSojuGlobal = false;
        window.dispatchEvent(new CustomEvent('sojuUpdate', { detail: { type: 'sojuOff' } }));
      }
    }
    if (book.author === '이수민') {
      const newCat = {
        id: Date.now(),
        x: Math.random() * 80 + 10, // 10% to 90%
        y: Math.random() * 80 + 10,
        rot: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5
      };
      setCats(prev => [...prev, newCat]);
    }
    if (book.author === '지서현') {
      setShake(prev => prev === 1 ? 2 : 1);
      if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);
      shakeTimeoutRef.current = setTimeout(() => setShake(0), 500);
    }
    if (book.author === '진태훈') {
      setSwipeUnlocked(true);
    }
    if (book.author === '정준원') {
      setJunwonHeartClicked(true);
    }
    if (book.author === '엄현식') {
      setHyunsikHeartClicked(true);
    }

    const likesRef = ref(db, `likes/${firebaseId}`);
    runTransaction(likesRef, (currentLikes) => {
      return (currentLikes || 0) + 1;
    });
  };

  // Total pages calculation (Cover + Profile + History + Guestbook pages)
  const totalPages = swipeUnlocked ? 7 : 6; 

  const nextPage = () => {
    if (isFlipping) return;
    if (isMobile) {
      if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
    } else {
      if (currentPage < totalPages - 1) {
        setIsFlipping('forward');
        setTimeout(() => {
          setCurrentPage(prev => (prev === 0 ? 1 : prev + 2));
          setIsFlipping(null);
        }, 600);
      }
    }
  };

  const prevPage = () => {
    if (isFlipping) return;
    if (isMobile) {
      if (currentPage > 0) setCurrentPage(prev => prev - 1);
    } else {
      if (currentPage > 0) {
        setIsFlipping('backward');
        setTimeout(() => {
          setCurrentPage(prev => (prev === 1 ? 0 : prev - 2));
          setIsFlipping(null);
        }, 600);
      }
    }
  };

  const handleCloseAnimation = () => {
    // Reverse animation logic could go here, but simply closing is often snappier UX
    onClose();
  };

  // Render Page Content
  const renderPageContent = (pageIndex: number) => {
    // 0: Cover
    if (pageIndex === 0) {
      return (
        <div className={`w-full h-full flex flex-col items-center justify-center p-8 text-center ${book.color} ${book.textColor || 'text-black'} border-r-2 border-black/10 relative overflow-hidden`}>
           {/* Simulate Book Cover Texture */}
           <div className="absolute inset-0 opacity-10 bg-black pointer-events-none"></div>
           
           <div className="w-4/5 h-4/5 border-4 border-current flex flex-col items-center justify-center p-4 relative z-10">
            {/* Crown Icon for everyone, swaps to Soju for Jung Woohyuk */}
            <div className="mb-4">
              {book.author === '정우혁' && isSoju ? (
                <img src="./Drink.svg" className="w-20 h-20 animate-bounce object-contain" alt="Soju" />
              ) : (
                <Crown className="w-12 h-12" />
              )}
            </div>
            <h1 className="text-4xl font-black font-sebang mb-4 leading-tight" style={{ wordBreak: 'keep-all' }}>{displayTitle || "Untitled"}</h1>
            <p className="text-xl font-bold font-oswald tracking-widest uppercase">{book.author}</p>
            <div className="mt-8 text-sm opacity-70 font-mono">NO.{book.id}</div>
          </div>
        </div>
      );
    }

    // 1: Profile
    if (pageIndex === 1) {
      return (
        <div className="w-full h-full p-8 bg-white flex flex-col items-center justify-center">
          <div 
            id="profile-photo-container"
            className="w-full max-w-[280px] aspect-[1/1.1] bg-neutral-100 mb-8 overflow-hidden border-2 border-black shadow-[4px_4px_0px_black] relative"
          >
             {book.imageUrl ? (
               <img 
                 src={book.author === '정준원' && junwonPhotoSwapped ? './pic/JJW21.jpg' : book.imageUrl} 
                 className={`w-full h-full object-cover object-top ${book.author === '정준원' || book.author === '엄현식' ? 'cursor-pointer' : ''}`} 
                 alt={book.author} 
                 onClick={(e) => {
                   if (book.author === '정준원' && junwonHeartClicked) {
                     setJunwonPhotoSwapped(true);
                   }
                   if (book.author === '엄현식' && hyunsikHeartClicked && !showPoop) {
                     setShowPoop(true);
                     setPoopPos({ x: e.clientX, y: e.clientY });
                   }
                 }}
               />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-neutral-400">NO IMAGE</div>
             )}
          </div>
          <div className="text-center">
            <p className="text-2xl font-black font-sebang text-black mb-2">
              {book.cohort} {book.author}
            </p>
            <p className="text-lg font-bold text-neutral-600 font-sebang">
              {book.department}{book.studentId}
            </p>
          </div>
        </div>
      );
    }

    // 2: Q&A
    if (pageIndex === 2) {
      return (
        <div className="w-full h-full p-8 bg-neutral-50 flex flex-col items-center overflow-y-auto custom-scrollbar">
          <div className="my-auto w-full text-center py-8">
            <span className="inline-block bg-black text-white px-3 py-1 font-bold text-sm mb-4">공연진의 한마디</span>
            <h3 className="text-xl font-bold leading-relaxed mb-8" style={{ wordBreak: 'keep-all' }}>
              "내가 출판사에 다닌다면<br/>만들고 싶은 책 제목은?"
            </h3>
            <div className="relative p-8 border-2 border-black bg-white shadow-[4px_4px_0px_black] w-full">
               <p 
                 className={`text-2xl font-black font-sebang text-neutral-800 ${book.author === '엄현식' && hyunsikHeartClicked ? 'cursor-pointer hover:text-amber-800' : ''}`} 
                 style={{ wordBreak: 'keep-all' }}
                 onClick={() => {
                   if (book.author === '엄현식' && hyunsikHeartClicked) {
                     setShowPoopList(true);
                   }
                 }}
               >
                 "{displayTitle || '무제'}"
               </p>
               <div className="absolute -top-3 -left-3 text-4xl text-neutral-200">❝</div>
               <div className="absolute -bottom-3 -right-3 text-4xl text-neutral-200">❞</div>
               
               {showPoopList && (
                 <div className="mt-8 pt-4 border-t-2 border-black text-left">
                   <h4 className="font-bold mb-2">범인 목록</h4>
                   <div className="flex flex-wrap gap-2">
                     {poopList.length > 0 ? poopList.map(p => (
                       <span key={p.id} className="bg-amber-100 px-2 py-1 rounded text-sm">{p.name}</span>
                     )) : (
                       <span className="text-sm text-neutral-500">아직 범인이 없습니다.</span>
                     )}
                   </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      );
    }

    // 3: History
    if (pageIndex === 3) {
      const history = castHistory[book.author] || [];
      return (
        <div className="w-full h-full p-8 bg-white flex flex-col">
          <h3 className="text-2xl font-black border-b-4 border-black pb-2 mb-6 uppercase">공연 경력</h3>
          <ul className="space-y-3 overflow-y-auto custom-scrollbar flex-1">
            {history.length > 0 ? history.map((h, i) => (
              <li key={i} className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 shrink-0"></span>
                <span className="font-sebang text-neutral-800">{h}</span>
              </li>
            )) : (
              <li className="text-neutral-400">등록된 이력이 없습니다.</li>
            )}
          </ul>
        </div>
      );
    }

    // 4: Actions (Like & Guestbook)
    if (pageIndex === 4) {
      return (
        <div className="w-full h-full p-4 md:p-8 bg-neutral-100 flex flex-col items-center relative overflow-hidden">
          {/* Lee Sumin Easter Egg: Cats Overlay */}
          {book.author === '이수민' && cats.map(cat => (
            <div 
              key={cat.id} 
              className="absolute pointer-events-none transition-opacity duration-500"
              style={{
                left: `${cat.x}%`,
                top: `${cat.y}%`,
                transform: `translate(-50%, -50%) rotate(${cat.rot}deg) scale(${cat.scale})`,
                zIndex: 50
              }}
            >
              <img src="./Cat.svg" className="w-12 h-12 object-contain" alt="Cat" />
            </div>
          ))}

          {/* Like Section */}
          <div className="text-center mb-6 shrink-0 relative z-10">
            <button 
              onClick={handleLike}
              className="group relative inline-flex items-center justify-center w-16 h-16 bg-white border-2 border-black rounded-full shadow-[4px_4px_0px_black] active:translate-y-1 active:shadow-none transition-all"
            >
              {book.author === '박자연' ? (
                <img src="./3acorns.png" className="w-12 h-12 rounded-full object-cover" alt="Acorns" />
              ) : (
                <Heart className="w-6 h-6 text-red-500 fill-current group-hover:scale-110 transition-transform" />
              )}
            </button>
            <p className="mt-2 font-bold font-oswald text-lg">{likes} LIKES</p>
            </div>
            {/* Lee Jaeuk Easter Egg: Path to Home */}
            {book.author === '이재욱' && (
              <div className="-mt-[18px] w-full px-8 mx-auto">
                <div className="relative h-8 border-b-2 border-black flex items-end">
                  {/* House at the end */}
                  <div className="absolute right-0 bottom-0 text-2xl">🏠</div>
                  
                  {/* Walking Person */}
                  <div 
                    className="absolute bottom-0 text-2xl transition-all duration-300"
                    style={{ 
                      left: `${Math.min((clickCount / 549) * 100, 95)}%`,
                      transform: `translateX(-50%) scaleX(-1) ${clickCount % 2 === 0 ? 'rotate(-5deg)' : 'rotate(5deg)'}`
                    }}
                  >
                    🚶
                  </div>
                </div>
                {clickCount >= 549 && (
                  <div className="mt-2 text-xs font-bold text-blue-600 animate-bounce">
                    집에 도착했습니다!
                  </div>
                )}
              </div>
            )}
          

          <div className="w-full h-px bg-neutral-300 mb-6 shrink-0 relative z-10"></div>

          {/* Guestbook Section */}
          <div className="w-full flex-1 flex flex-col min-h-0 relative z-10">
            <h3 className="font-bold mb-4 text-center shrink-0">방명록</h3>
            
            {/* Messages List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar mb-4 bg-white border border-neutral-200 p-3 rounded-md shadow-inner space-y-3">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div key={msg.id} className="border-b border-neutral-100 pb-2 last:border-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-bold text-sm">{msg.author}</span>
                      <span className="text-xs text-neutral-400">
                        {msg.createdAt?.seconds ? new Date(msg.createdAt.seconds * 1000).toLocaleDateString() : ''}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-700 whitespace-pre-wrap break-words">{msg.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-neutral-400 text-sm py-8">첫 번째 방명록을 남겨주세요!</p>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleGuestbookSubmit} className="shrink-0 flex flex-col gap-2">
              <input
                type="text"
                placeholder="이름"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full p-2 text-sm border border-neutral-300 rounded focus:outline-none focus:border-black"
                maxLength={10}
                required
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="메시지를 남겨주세요"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 p-2 text-sm border border-neutral-300 rounded focus:outline-none focus:border-black"
                  maxLength={100}
                  required
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting || !newMessage.trim() || !authorName.trim()}
                  className="bg-black text-white px-4 py-2 text-sm font-bold rounded hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }

    // 5: Final Page
    if (pageIndex === 5) {
      if (swipeUnlocked) {
        return (
          <div className="w-full h-full relative bg-[#faf8ef] overflow-hidden">
            <iframe src="./Swipe.html" className="w-full h-full border-0" title="Swipe Game" />
          </div>
        );
      }

      return (
        <div className="w-full h-full p-8 bg-white flex flex-col items-center justify-center">
          <div className="text-center">
            <h3 className="text-2xl font-black font-sebang mb-4">감사합니다</h3>
            <p className="text-neutral-600">성균극회 제130회 정기대공연</p>
            <p className="font-bold mt-2">회장님의 위인전</p>
          </div>
        </div>
      );
    }

    // 6: Leaderboard Page
    if (pageIndex === 6 && swipeUnlocked) {
      return (
        <div className="w-full h-full p-8 bg-[#faf8ef] flex flex-col items-center justify-center">
          <div className="w-full h-full bg-white p-6 rounded border-2 border-black shadow-[4px_4px_0px_black] flex flex-col">
            <h3 className="text-2xl font-black font-sebang mb-4 border-b-4 border-black pb-2 text-center">순위표</h3>
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
              {swipeScores.length > 0 ? swipeScores.map((s, i) => (
                <div key={s.id} className="text-lg flex justify-between font-mono border-b border-neutral-200 pb-2">
                  <span className="truncate mr-4">{i + 1}. {s.name}</span>
                  <span className="font-bold">{s.score}</span>
                </div>
              )) : (
                <div className="text-center text-neutral-500 mt-10">기록이 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return <div className="w-full h-full bg-white"></div>;
  };

  return (
    <>
      {/* Full Screen Overlay with higher z-index */}
      <div 
        className={`fixed top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isOpening ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleCloseAnimation}
        style={{marginTop: 0}}
      ></div>

      {/* Close Button - Fades in */}
      <button 
        onClick={handleCloseAnimation} 
        className={`fixed top-4 right-4 text-white hover:opacity-70 z-[102] transition-opacity duration-500 ${isOpening ? 'opacity-0' : 'opacity-100'}`}
        style={{marginTop: 0}}
      >
        <X className="w-8 h-8" />
      </button>

      {/* Draggable Poop */}
      {showPoop && currentPage === 1 && (
        <div 
          className={`fixed z-[200] text-6xl font-black text-amber-800 select-none drop-shadow-lg ${hasDroppedPoop ? '' : 'cursor-grab active:cursor-grabbing'}`}
          style={{ left: poopPos.x, top: poopPos.y, transform: 'translate(-50%, -50%)', touchAction: 'none' }}
          onPointerDown={hasDroppedPoop ? undefined : handlePoopPointerDown}
          onPointerMove={hasDroppedPoop ? undefined : handlePoopPointerMove}
          onPointerUp={hasDroppedPoop ? undefined : handlePoopPointerUp}
        >
          똥
        </div>
      )}

      {/* Custom Prompt Modal */}
      {customPrompt && (
        <div className="fixed inset-0 z-[300] bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded border-2 border-black shadow-[4px_4px_0px_black] max-w-sm w-full mx-4">
            <h3 className="font-bold font-sebang mb-4 whitespace-pre-wrap">{customPrompt.message}</h3>
            <input 
              type="text" 
              id="custom-prompt-input" 
              className="w-full border-2 border-black p-2 mb-4 font-sebang" 
              autoFocus 
              maxLength={10}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = (e.target as HTMLInputElement).value;
                  if (val.trim()) {
                    customPrompt.onSubmit(val.trim());
                    setCustomPrompt(null);
                  }
                }
              }}
            />
            <div className="flex justify-end gap-2 font-sebang">
              <button 
                onClick={() => setCustomPrompt(null)} 
                className="px-4 py-2 border-2 border-black hover:bg-neutral-100 font-bold"
              >
                취소
              </button>
              <button 
                onClick={() => {
                  const val = (document.getElementById('custom-prompt-input') as HTMLInputElement).value;
                  if (val.trim()) {
                    customPrompt.onSubmit(val.trim());
                    setCustomPrompt(null);
                  }
                }} 
                className="px-4 py-2 bg-black text-white hover:bg-neutral-800 font-bold"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Jaeuk Modal */}
      {showJaeukModal && (
        <div className="fixed inset-0 z-[300] bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded border-2 border-black shadow-[4px_4px_0px_black] max-w-sm w-full mx-4 text-center">
            <h3 className="text-2xl font-black font-sebang mb-4 text-blue-600">집에 도착했습니다!</h3>
            <p className="text-lg font-bold font-sebang mb-6">이재욱과의 밥약권 획득!</p>
            <button 
              onClick={() => setShowJaeukModal(false)} 
              className="px-6 py-2 bg-black text-white hover:bg-neutral-800 font-bold rounded"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* Book Container - Transforms from initialRect */}
      <div style={{ ...styles, marginTop: 0 }} className={shake === 1 ? 'animate-shake-1' : shake === 2 ? 'animate-shake-2' : ''}>
        
        {/* Navigation - Fades in after expansion */}
        <div className={`transition-opacity duration-300 delay-300 ${isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <button 
            onClick={prevPage} 
            disabled={currentPage === 0}
            className={`absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 z-[102] p-2 bg-black/80 md:bg-black/50 rounded-full hover:bg-black text-white transition-opacity ${currentPage === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button 
            onClick={nextPage} 
            disabled={currentPage >= totalPages - (isMobile ? 1 : 2)}
            className={`absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 z-[102] p-2 bg-black/80 md:bg-black/50 rounded-full hover:bg-black text-white transition-opacity ${currentPage >= totalPages - (isMobile ? 1 : 2) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* The Book */}
        <div 
          className={`relative w-full h-full ${isMobile ? '' : 'flex'}`}
          style={{ perspective: isMobile ? 'none' : '2000px', transformStyle: 'preserve-3d' }}
        >
           {/* Desktop: Spread View Logic */}
           {!isMobile && (() => {
             const leftPageIndex = isFlipping === 'backward' 
               ? (currentPage === 1 ? 0 : currentPage - 2) 
               : currentPage;
               
             const rightPageIndex = isFlipping === 'forward' 
               ? (currentPage === 0 ? 2 : currentPage + 3) 
               : (currentPage === 0 ? 0 : currentPage + 1);

             const isLeftTransparent = leftPageIndex === 0;
             const isRightTransparent = rightPageIndex >= totalPages;

             return (
               <>
                  {/* Left Side (Static) */}
                  <div className="w-1/2 h-full relative z-10">
                     <div className={`w-full h-full ${isLeftTransparent ? 'bg-transparent shadow-none border-none' : 'bg-white shadow-2xl border-r border-neutral-200'} rounded-l-md overflow-hidden relative`}>
                        {!isLeftTransparent ? renderPageContent(leftPageIndex) : <div className="w-full h-full bg-transparent"></div>}
                        {!isLeftTransparent && <div className="absolute inset-0 pointer-events-none bg-[#fffdf5] opacity-10 mix-blend-multiply"></div>}
                        {!isLeftTransparent && <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none"></div>}
                     </div>
                  </div>

                  {/* Right Side (Static) */}
                  <div className="w-1/2 h-full relative z-10">
                     <div className={`w-full h-full ${isRightTransparent ? 'bg-transparent shadow-none border-none' : 'bg-white shadow-2xl'} rounded-r-md overflow-hidden relative`}>
                        {!isRightTransparent ? renderPageContent(rightPageIndex) : <div className="w-full h-full bg-transparent"></div>}
                        {!isRightTransparent && <div className="absolute inset-0 pointer-events-none bg-[#fffdf5] opacity-10 mix-blend-multiply"></div>}
                        {!isRightTransparent && <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none"></div>}
                     </div>
                  </div>
                  
                  {/* Flipping Page (Animated) */}
                  {isFlipping && (
                    <div 
                      className={`absolute top-0 w-1/2 h-full z-20 transition-none ${isFlipping === 'forward' ? 'left-1/2 flip-forward' : 'left-0 flip-backward'}`}
                      style={{ 
                        transformOrigin: isFlipping === 'forward' ? 'left center' : 'right center',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* Front of the flipping page */}
                      <div className="absolute inset-0 bg-white shadow-xl overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                         {isFlipping === 'forward' 
                           ? renderPageContent(currentPage === 0 ? 0 : currentPage + 1) 
                           : renderPageContent(currentPage)}
                         <div className="absolute inset-0 pointer-events-none bg-[#fffdf5] opacity-10 mix-blend-multiply"></div>
                         <div className={`absolute top-0 bottom-0 w-12 pointer-events-none ${isFlipping === 'forward' ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l'} from-black/10 to-transparent`}></div>
                      </div>
                      {/* Back of the flipping page */}
                      <div className="absolute inset-0 bg-white shadow-xl overflow-hidden" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                         {isFlipping === 'forward' 
                           ? renderPageContent(currentPage === 0 ? 1 : currentPage + 2) 
                           : renderPageContent(currentPage === 1 ? 0 : currentPage - 1)}
                         <div className="absolute inset-0 pointer-events-none bg-[#fffdf5] opacity-10 mix-blend-multiply"></div>
                         <div className={`absolute top-0 bottom-0 w-12 pointer-events-none ${isFlipping === 'forward' ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} from-black/10 to-transparent`}></div>
                      </div>
                    </div>
                  )}

                  <style dangerouslySetInnerHTML={{__html: `
                    @keyframes page-turn-forward {
                      0% { transform: translateZ(1px) rotateY(0deg); }
                      100% { transform: translateZ(1px) rotateY(-180deg); }
                    }
                    @keyframes page-turn-backward {
                      0% { transform: translateZ(1px) rotateY(0deg); }
                      100% { transform: translateZ(1px) rotateY(180deg); }
                    }
                    .flip-forward {
                      animation: page-turn-forward 0.6s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
                    }
                    .flip-backward {
                      animation: page-turn-backward 0.6s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
                    }
                    @keyframes shake1 {
                      0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
                      25% { transform: translate(-50%, -50%) rotate(-1deg); }
                      75% { transform: translate(-50%, -50%) rotate(1deg); }
                    }
                    @keyframes shake2 {
                      0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
                      25% { transform: translate(-50%, -50%) rotate(-1deg); }
                      75% { transform: translate(-50%, -50%) rotate(1deg); }
                    }
                    .animate-shake-1 {
                      animation: shake1 0.5s ease-in-out;
                    }
                    .animate-shake-2 {
                      animation: shake2 0.5s ease-in-out;
                    }
                  `}} />
               </>
             );
           })()}

           {/* Mobile: Single View */}
           {isMobile && (
             <div className="w-full h-full bg-white shadow-2xl rounded-md overflow-hidden relative">
                {renderPageContent(currentPage)}
             </div>
           )}
        </div>
      </div>
    </>
  );
};