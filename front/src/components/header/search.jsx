import React, { useState, useRef, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  

  const handleSearch = (term = searchTerm) => {
    if (!term.trim()) return;
    
    if (onSearch) {
      onSearch(term);
    } else {
      console.log(`Поиск: ${term}`);
      alert(`🔍 Поиск: ${term}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{
      width: 645,
      paddingLeft: 20,
      paddingRight: 20,
      justifyContent: 'flex-start',
      alignItems: 'center',
      display: 'flex'
    }}>
      <div style={{
        width: 600,
        height: 40,
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 28,
        background: '#001C34',
        borderRadius: 10,
        outline: '0.50px #A6DAFF solid',
        outlineOffset: '-0.50px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 10,
        display: 'inline-flex'
      }}>
        <div style={{
          alignSelf: 'stretch',
          height: 42,
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 16,
          display: 'inline-flex'
        }}>
          <div
            style={{ width: 24, height: 24, position: 'relative', cursor: 'pointer' }}
            onClick={() => handleSearch()}
          >
            <img src="./src/components/header/img/find.svg" alt="Поиск" />
          </div>

          <div style={{
            flex: '1 1 0',
            overflow: 'hidden',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            display: 'inline-flex'
          }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Виконавці, треки, подкасти..."
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'white',
                fontSize: 14,
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: 400,
                padding: 0,
                margin: 0,
              }}
            />
          </div>

          <div
            style={{
              width: 80,
              height: 40,
              paddingLeft: 6,
              paddingRight: 6,
              paddingTop: 2,
              paddingBottom: 2,
              overflow: 'hidden',
              borderLeft: '0.50px #A6DAFF solid',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'inline-flex',
              cursor: 'pointer',
              opacity: isListening ? 0.7 : 1,
              transition: 'opacity 0.2s'
            }}
          >
            <img src="./src/components/header/img/micro.svg" alt="Голосовой поиск" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;