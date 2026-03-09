import React, { useState } from 'react';
import { ShelfData, BookData } from '../types';
import { Book } from './Book';
import { CharacterCard } from './CharacterCard';
import { BookReader } from './BookReader';

interface BookshelfProps {
  shelf: ShelfData;
}

export const Bookshelf: React.FC<BookshelfProps> = ({ shelf }) => {
  const [selectedBook, setSelectedBook] = useState<{ data: BookData; initialRect: DOMRect | null } | null>(null);
  const hasMonologues = shelf.monologues && shelf.monologues.length > 0;
  const isCharacterSection = shelf.id === 'section-character';

  const handleBookClick = (book: BookData, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSelectedBook({ data: book, initialRect: rect });
  };

  return (
    <>
      <div className="w-full mb-24">
        {/* Category Header */}
        <div className="flex items-center mb-8 border-b-4 border-black pb-2">
          <div className="bg-black text-white px-3 py-2 mr-4 min-w-[120px] text-center">
            <span className="font-oswald font-bold text-xl tracking-widest uppercase">
              {shelf.categoryEnglish}
            </span>
          </div>
          <h2 className="font-sebang font-bold text-3xl tracking-tight text-black">
            {shelf.categoryKorean}
          </h2>
          <div className="flex-grow ml-4 h-px bg-black opacity-20 bg-[length:4px_1px] bg-repeat-x"></div>
        </div>

        <div className="flex flex-col gap-12">
          {/* Group Photo Section (Available for any shelf) */}
          {shelf.groupPhotoUrl && (
            <div className="mb-12 w-full border-2 border-black p-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <img 
                src={shelf.groupPhotoUrl} 
                alt="Group Photo" 
                className="w-full h-auto object-cover lg:grayscale lg:hover:grayscale-0 transition-all duration-700"
              />
              <div className="mt-2 text-right">
                <span className="font-oswald text-xs font-bold tracking-widest bg-black text-white px-2 py-1">CHARACTERS</span>
              </div>
            </div>
          )}

          {/* Conditional Rendering for Characters vs Standard Books */}
          {isCharacterSection ? (
             <div className="w-full px-2">
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-start">
                 {shelf.books.map((book) => (
                    <div key={book.id} onClick={(e) => handleBookClick(book, e)} className="w-full max-w-[240px] mx-auto">
                      <CharacterCard data={book} />
                    </div>
                 ))}
               </div>
               {/* Bottom Deco Line for Characters */}
               <div className="mt-8 w-full border-b-2 border-dashed border-black opacity-30"></div>
             </div>
          ) : (
            <div className="w-full px-2">
              {/* Standard Books Grid */}
              <div className={`grid gap-x-6 gap-y-12 items-end justify-start ${
                (shelf.id === 'section-director' || shelf.id === 'section-planning-leader') 
                  ? 'grid-cols-1 md:grid-cols-2' 
                  : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'
              }`}>
                 {shelf.books.map((book) => (
                   <div key={book.id} onClick={(e) => handleBookClick(book, e)} className={`w-full mx-auto cursor-pointer group ${
                     (shelf.id === 'section-director' || shelf.id === 'section-planning-leader') 
                       ? 'max-w-[350px] flex items-end justify-center gap-4' 
                       : 'max-w-[200px]'
                   }`}>
                      {(shelf.id === 'section-director' || shelf.id === 'section-planning-leader') && book.imageUrl && (
                        <div className="w-[100px] md:w-[120px] aspect-[3/4] border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden shrink-0 relative transition-transform group-hover:-translate-y-2">
                           <img src={book.imageUrl} alt={book.author} className="w-full h-full object-cover object-top lg:grayscale lg:group-hover:grayscale-0 transition-all duration-500" />
                           <div className="absolute bottom-0 left-0 w-full bg-black text-white text-center text-[10px] md:text-xs py-1 font-sebang font-bold flex flex-col leading-tight">
                             <span className="text-[8px] md:text-[10px] text-neutral-300 font-normal">{book.author === '김동건' ? '연출' : book.author === '하선영' ? '조연출' : '기획팀장'}</span>
                             <span>{book.author}</span>
                           </div>
                        </div>
                      )}
                      <div className="w-full max-w-[200px]">
                        <Book book={book} defaultIcon={shelf.defaultIcon} />
                      </div>
                   </div>
                ))}
              </div>
              
              {/* Heavy Bottom Shelf Line */}
              <div className="mt-12 w-full h-2 bg-black border-t border-b-2 border-neutral-700 relative">
                <div className="absolute top-2 left-0 w-full text-[10px] font-mono text-neutral-400 text-center mt-1">
                  /// SKKU DRAMA CLUB ARCHIVE /// SHELF ID: {shelf.categoryEnglish.toUpperCase()} ///
                </div>
              </div>
            </div>
          )}

          {/* Monologues Section (Moved to Bottom for all screens) */}
          {hasMonologues && (
            <div className="w-full max-w-4xl mx-auto space-y-8 mt-4">
              {shelf.monologues!.map((mono, idx) => (
                <div key={idx} className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="font-sebang font-bold text-lg mb-4 border-b-2 border-black inline-block pb-1">
                    {mono.title}
                  </h3>
                  <p className="font-sebang text-sm leading-relaxed whitespace-pre-wrap text-neutral-800">
                    {mono.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Book Reader Modal */}
      {selectedBook && (
        <BookReader 
          book={selectedBook.data} 
          initialRect={selectedBook.initialRect}
          onClose={() => setSelectedBook(null)} 
        />
      )}
    </>
  );
};