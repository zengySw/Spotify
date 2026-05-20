import styles from './header.module.css';
import React from "react";
import SearchBar from './search';

export const Header_bar = () => {
  return (
    <div style={{ 
      width: '100%',
      height: 'var(--app-header-height)',
      paddingLeft: 'clamp(12px, 3vw, 37px)', 
      paddingRight: 'clamp(12px, 3vw, 37px)', 
      background: 'rgba(0, 18, 33, 0.80)', 
      borderBottom: '0.50px #A6DAFF solid', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      display: 'flex',
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1200
    }}>

      <div style={{ 
        paddingLeft: 'clamp(8px, 2vw, 16px)', 
        paddingRight: 'clamp(8px, 2vw, 16px)', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        gap: 'clamp(8px, 2vw, 20px)', 
        display: 'flex', 
        flexWrap: 'wrap', 
        alignContent: 'center' 
      }}>
        <img src="././src/components/header/img/logo.svg" alt="logo" />
      </div>

      <SearchBar />

      <div style={{ 
        width: 'clamp(72px, 10vw, 119px)', 
        height: 'clamp(40px, 6vw, 56px)', 
        paddingLeft: 'clamp(6px, 1.5vw, 10px)', 
        paddingRight: 'clamp(6px, 1.5vw, 10px)', 
        paddingTop: 'clamp(4px, 1vw, 7px)', 
        paddingBottom: 'clamp(4px, 1vw, 7px)', 
        borderRadius: 40, 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 'clamp(4px, 1vw, 5px)', 
        display: 'flex' 
      }}>
        <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 'clamp(8px, 2vw, 16px)', display: 'flex' }}>
          <div data-property-1="выкл" style={{ padding: 'clamp(6px,1vw,7px)', justifyContent: 'flex-start', alignItems: 'center', gap: 'clamp(6px,1vw,10px)', display: 'flex' }}>
            <div style={{ width: 'clamp(18px,3vw,26px)', height: 'clamp(18px,3vw,28px)', position: 'relative', overflow: 'hidden' }} />
          </div>
          <img src="././src/components/header/img/msg.svg" alt="logo" />
          <img src="././src/components/header/img/user.svg" alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Header_bar;
