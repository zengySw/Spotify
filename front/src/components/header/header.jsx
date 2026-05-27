import styles from './header.module.css';
import React, { useState } from 'react';
import SearchBar from './search';
import logoIcon from './img/logo.svg';
import searchIcon from './img/find.svg';
import msgIcon from './img/msg.svg';
import userIcon from './img/user.svg';

export const Header_bar = ({ menuOpen, setMenuOpen }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.header_left}>
        <button
          className={styles.burger_menu}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span className={menuOpen ? styles.burger_open : ''}></span>
          <span className={menuOpen ? styles.burger_open : ''}></span>
          <span className={menuOpen ? styles.burger_open : ''}></span>
        </button>

        <img src={logoIcon} alt="Soundy" className={styles.logo} />
      </div>

      <div className={styles.search_desktop}>
        <SearchBar />
      </div>

      <div className={styles.header_right}>
        <button
          className={styles.search_toggle}
          onClick={() => setSearchOpen((prev) => !prev)}
          aria-label="Search"
          type="button"
        >
          <img src={searchIcon} alt="Search" />
        </button>

        <button className={styles.icon_button} type="button" aria-label="Messages">
          <img src={msgIcon} alt="" className={styles.header_icon} />
        </button>

        <button className={styles.icon_button} type="button" aria-label="Profile">
          <img src={userIcon} alt="" className={styles.header_icon} />
        </button>
      </div>

      {searchOpen && (
        <div className={styles.mobile_search_bar}>
          <SearchBar autoFocus />
        </div>
      )}
    </header>
  );
};

export default Header_bar;