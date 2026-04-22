import React from 'react';
import styles from './footer.module.css';

export const Footer_bar = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <img src="././src/components/Footer/img/Logo_big.svg" alt="logo" className={styles.logo} />

          <div className={styles.rightBlock}>
            <div className={styles.address}>
              <img src="././src/components/Footer/img/Adress.svg" alt="address" />
              <span>Adress st. Shevchenko, 25 house, UA, Odessa, 00000</span>
            </div>

            <div className={styles.phoneEmail}>
              <div className={styles.contactItem}>
                <img src="././src/components/Footer/img/Phone.svg" alt="phone" />
                <span>(380) 00-000-00-00</span>
              </div>
              <div className={styles.contactItem}>
                <img src="././src/components/Footer/img/Mail.svg" alt="email" />
                <span>lumitune@gmail.com</span>
              </div>
            </div>

            <div className={styles.socials}>
              <img src="././src/components/Footer/img/Facebook.svg" alt="Facebook" />
              <img src="././src/components/Footer/img/Twitter.svg" alt="Twitter" />
              <img src="././src/components/Footer/img/Pinterest.svg" alt="Pinterest" />
              <img src="././src/components/Footer/img/RSS.svg" alt="RSS" />
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