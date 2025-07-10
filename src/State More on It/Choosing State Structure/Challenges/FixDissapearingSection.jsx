import { useState } from 'react';
import { initialLetters } from './data.js';
import { Letter } from './LettersDissapearing.js';

export default function MailClient() {
  const [letters, setLetters] = useState(initialLetters);
  const [highlightedLetter, setHighlightedLetter] = useState(null);

  const handleHover = (letter) => setHighlightedLetter(letter);

  const handleStar = (starred) => {
    setLetters(letters.map(letter => {
        if (letter.id === starred.id) return {...letter, isStarred: !letter.isStarred };  
        else return letter;
    }));
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
            <Letter key={letter.id} letter={letter} isHighlighted={letter === highlightedLetter}
                onHover={handleHover} onToggleStar={handleStar} />
        ))}
      </ul>
    </>
  );
}

export function BestMailClient() {
  const [letters, setLetters] = useState(initialLetters);
  const [highlightedId, setHighlightedId ] = useState(null);

  const handleHover = (letterId) => setHighlightedId(letterId);

  const handleStar = (starredId) => {
    setLetters(letters.map(letter => {
      if (letter.id === starredId) return {...letter, isStarred: !letter.isStarred };
      else return letter;
    }));
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (<Letter key={letter.id} letter={letter} 
            isHighlighted={letter.id === highlightedId} onHover={handleHover} onToggleStar={handleStar} />
        ))}
      </ul>
    </>
  );
}
