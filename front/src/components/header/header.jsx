import styles from './header.module.css';
import React from "react";
import SearchBar from './search';

export const Header_bar = () => {
  return (
    <div style={{ 
      width: 'auto', 
      height: 64, 
      paddingLeft: 37, 
      paddingRight: 37, 
      background: 'rgba(0, 18, 33, 0.80)', 
      borderBottom: '0.50px #A6DAFF solid', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      display: 'inline-flex' 
    }}>

      <div style={{ 
        paddingLeft: 16, 
        paddingRight: 16, 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        gap: 20, 
        display: 'flex', 
        flexWrap: 'wrap', 
        alignContent: 'center' 
      }}>
        <img src="././src/components/header/img/logo.svg" alt="logo" />
      </div>

      <SearchBar />

      <div style={{ 
        width: 119, 
        height: 56, 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingTop: 7, 
        paddingBottom: 7, 
        borderRadius: 40, 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 5, 
        display: 'flex' 
      }}>
        <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex' }}>
          <div data-property-1="выкл" style={{ padding: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex' }}>
            <div style={{ width: 26, height: 28, position: 'relative', overflow: 'hidden' }} />
          </div>
          <img src="././src/components/header/img/msg.svg" alt="logo" />
          <img src="././src/components/header/img/user.svg" alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Header_bar;