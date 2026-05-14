import React from 'react';
import styles from './error.module.css';

export const Error = () => {
    return (
        <div className={styles.errorPage}>
            <div className={styles.circle} style={{ width: 286, height: 286, left: 288.09, top: 1953.89, transform: 'rotate(165deg)', background: '#04142D' }} />
            <div className={styles.circle} style={{ width: 286, height: 286, left: 35.58, top: 1873.50, transform: 'rotate(165deg)', background: '#52B9F4' }} />
            <div className={styles.circle} style={{ width: 286, height: 286, left: 136.82, top: 2365.03, transform: 'rotate(165deg)', background: '#2F6FF3' }} />
            <div className={styles.circle} style={{ width: 286, height: 286, left: 186.82, top: 1678.03, transform: 'rotate(165deg)', background: 'rgba(112, 241, 213, 0.03)' }} />
            <div className={styles.circle} style={{ width: 310.54, height: 310.54, left: 2220.79, top: 1394.23, transform: 'rotate(172deg)', background: '#04142D' }} />
            <div className={styles.circle} style={{ width: 310.54, height: 310.54, left: 1960.34, top: 1271.94, transform: 'rotate(172deg)', background: '#52B9F4' }} />
            <div className={styles.circle} style={{ width: 310.54, height: 310.54, left: 1912, top: 2126.65, transform: 'rotate(172deg)', background: '#2FBBF3' }} />
            <div className={styles.circle} style={{ width: 486.91, height: 490.15, left: 1802.33, top: 1754.72, transform: 'rotate(172deg)', background: 'rgba(47, 111, 243, 0.43)' }} />
            <div className={styles.circle} style={{ width: 410.41, height: 413.14, left: 1738.93, top: 170.46, transform: 'rotate(172deg)', background: 'rgba(47, 243, 180.93, 0.60)' }} />
            <div className={styles.circle} style={{ width: 410.41, height: 413.14, left: 302.71, top: 1831.26, transform: 'rotate(172deg)', background: 'rgba(47, 243, 180.93, 0.26)' }} />
            <div className={styles.circle} style={{ width: 486.91, height: 490.15, left: 522.73, top: 636.39, transform: 'rotate(172deg)', background: 'rgba(47, 138.47, 243, 0.43)' }} />
            <div className={styles.circle} style={{ width: 486.91, height: 490.15, left: 1878.38, top: 1103.80, transform: 'rotate(172deg)', background: 'rgba(47, 135.20, 243, 0.43)' }} />
            <div className={styles.circle} style={{ width: 625.68, height: 625.68, left: 1324.62, top: 582.58, transform: 'rotate(172deg)', background: 'rgba(47, 111, 243, 0.73)' }} />
            <div className={styles.circle} style={{ width: 625.68, height: 625.68, left: 2071.80, top: 605.29, transform: 'rotate(172deg)', background: 'rgba(47, 174.40, 243, 0.45)' }} />
            <div className={styles.circle} style={{ width: 430.68, height: 430.68, left: 1134.82, top: 1174.76, transform: 'rotate(172deg)', background: 'rgba(47, 141.73, 243, 0.62)' }} />
            <div className={styles.circle} style={{ width: 430.68, height: 430.68, left: 579.08, top: 1538.63, transform: 'rotate(172deg)', background: 'rgba(47, 118.87, 243, 0.62)' }} />
            <div className={styles.circle} style={{ width: 310.54, height: 310.54, left: 2163.05, top: 1161.62, transform: 'rotate(172deg)', opacity: 0.20, background: '#70F1D5' }} />
            <div className={styles.circle} style={{ width: 310.54, height: 310.54, left: 1229.46, top: 1718.47, transform: 'rotate(172deg)', background: '#004DC5' }} />
            <div className={styles.circle} style={{ width: 310.54, height: 310.54, left: -124.67, top: 1637.28, transform: 'rotate(172deg)', background: 'rgba(82, 185, 244, 0.72)' }} />
            <div className={styles.circle} style={{ width: 2084.31, height: 162.18, left: 1960.83, top: 2506.68, transform: 'rotate(180deg)', background: '#2F8EF3' }} />
            <div className={styles.circle} style={{ width: 310.54, height: 310.54, left: 213.25, top: 1035.07, transform: 'rotate(172deg)', background: 'rgba(112, 221.65, 241, 0.58)' }} />
            <div className={styles.circle} style={{ width: 286, height: 286, left: -108.45, top: -320.57, background: '#04142D' }} />
            <div className={styles.circle} style={{ width: 286, height: 286, left: 114.65, top: -177.57, background: '#52B9F4' }} />
            <div className={styles.circle} style={{ width: 286, height: 286, left: 78.09, top: -387.23, background: '#2F6FF3' }} />
            <div className={styles.circle} style={{ width: 286, height: 286, left: -83.72, top: -101.23, background: '#70F1D5' }} />
            <div className={styles.circle} style={{ width: 286, height: 286, left: 2260.55, top: 1059.12, transform: 'rotate(165deg)', background: '#04142D' }} />
            <div className={styles.circle} style={{ width: 286, height: 286, left: 2008.04, top: 978.73, transform: 'rotate(165deg)', opacity: 0.50, background: '#52B9F4' }} />
            <div className={styles.circle} style={{ width: 286, height: 286, left: 2097.61, top: 1171.79, transform: 'rotate(165deg)', background: '#2F6FF3' }} />
            <div className={styles.circle} style={{ width: 286, height: 286, left: 2179.89, top: 853.65, transform: 'rotate(165deg)', background: '#70F1D5' }} />

            <div className={styles.overlay} />

            <header className={styles.header}>
                <img src="./src/components/pages/error404/img/logo.svg" alt="logo" />
                <img className={styles.logoText} src="./src/components/pages/error404/img/LumiTune.svg" alt="LumiTune" />
                <nav className={styles.nav}>
                    <a href="#">О нас</a>
                    <a href="#">Підтримка</a>
                    <a href="#">Контакти</a>
                </nav>
                <div className={styles.phone}>
                    <img src="./src/components/pages/error404/img/Phone.svg" alt="phone" />
                    <span>(380) 00-000-00-00</span>
                </div>
            </header>

            <div className={styles.content}>
                <div className={styles.errorNumber}>404</div>
                <div className={styles.textBlock}>
                    <h1>Упс..Ти натрапив на міжтрекову тишу...</h1>
                    <p>Тиша — не кінець. Це пауза перед наступним вибухом ритму.</p>
                    <a href="/" className={styles.homeButton} style={{ textDecoration: 'none' }}>
                        <img src="./src/components/pages/error404/img/back_yes.svg" alt="" />
                        <span>На головну</span>
                    </a>
                </div>
            </div>

            <img className={styles.decorImage} src="./src/components/pages/error404/img/man_in_error.svg" alt="decor" />

            <div className={styles.bottomSpacer} />
        </div>
    );
};

export default Error;