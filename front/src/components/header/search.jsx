import React, { useState } from 'react';
import styles from './search.module.css';
import findIcon from './img/find.svg';
import micIcon from './img/micro.svg';

const SearchBar = ({ onSearch, autoFocus = false }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term = searchTerm) => {
    if (!term.trim()) return;
    if (onSearch) {
      onSearch(term);
      return;
    }
    console.log(`Search: ${term}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchBar}>
        <div className={styles.searchInner}>
          <button className={styles.searchIcon} onClick={() => handleSearch()} type="button" aria-label="Search">
            <img src={findIcon} alt="" />
          </button>

          <div className={styles.searchInputWrap}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Artists, tracks, podcasts..."
              className={styles.searchInput}
              autoFocus={autoFocus}
            />
          </div>

          <button className={styles.searchMic} type="button" aria-label="Voice search">
            <img src={micIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;