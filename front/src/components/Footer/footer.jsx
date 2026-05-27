import React from 'react';
import styles from './footer.module.css';
import logoImg from './img/Logo_big.svg';
import addressImg from './img/Adress.svg';
import phoneImg from './img/Phone.svg';
import mailImg from './img/Mail.svg';
import facebookImg from './img/Facebook.svg';
import twitterImg from './img/Twitter.svg';
import pinterestImg from './img/Pinterest.svg';
import rssImg from './img/RSS.svg';

export const Footer_bar = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <img src={logoImg} alt="LumiTune" className={styles.logo} />

          <div className={styles.rightBlock}>
            <div className={styles.address}>
              <img src={addressImg} alt="Address" />
              <span>Address st. Shevchenko, 25 house, UA, Odesa, 00000</span>
            </div>

            <div className={styles.phoneEmail}>
              <a className={styles.contactItem} href="tel:+380000000000">
                <img src={phoneImg} alt="Phone" />
                <span>(380) 00-000-00-00</span>
              </a>
              <a className={styles.contactItem} href="mailto:lumitune@gmail.com">
                <img src={mailImg} alt="Email" />
                <span>lumitune@gmail.com</span>
              </a>
            </div>

            <div className={styles.socials}>
              <a href="#" aria-label="Facebook">
                <img src={facebookImg} alt="" />
              </a>
              <a href="#" aria-label="Twitter">
                <img src={twitterImg} alt="" />
              </a>
              <a href="#" aria-label="Pinterest">
                <img src={pinterestImg} alt="" />
              </a>
              <a href="#" aria-label="RSS">
                <img src={rssImg} alt="" />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.links}>
          <a href="#">About us</a>
          <a href="#">Contact us</a>
          <a href="#">Help</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Disclaimer</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer_bar;