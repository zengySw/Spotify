import React from 'react';
import styles from './lending.module.css';
import Footer_bar from "../Footer/footer.jsx";

export const Lending = () => {
    return (
        <div className={styles.container}>
            <div className={styles.backgroundCircles}></div>

            <header className={styles.header}>
                <div className={styles.logoWrapper}>
                    <div className={styles.logoContainer}>
                        <img src="././src/components/header/img/logo.svg" alt="logo" />
                    </div>
                    <div className={styles.logoText}>LumiTune</div>
                </div>
                <nav className={styles.nav}>
                    <a href="#">Підписки</a>
                    <a href="#">Підтримка</a>
                    <a href="#">Завантажити додаток</a>
                    <button className={styles.registerBtn}>Реєстрація</button>
                </nav>
            </header>

            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <img src="./src/components/lending/img/lumitune_002.svg" alt="" />
                    <h1>Закортілося чогось новенького у рутині?</h1>
                    <p>Мерщій приєднуйся до шабашу музик! Тут звучать ритми, історії!</p>
                    <div className={styles.heroButtons}>
                        <button href="/" className={styles.btnOutline}>Перейти на сайт</button>
                        <button className={styles.btnPrimary}>Зареєструватися</button>
                    </div>
                </div>
                <img className={styles.background} src="./src/components/lending/img/background.svg" alt="" />
            </section>
            <img className={styles.lumik} src="./src/components/lending/img/lumik_3.svg" alt="" />
            <img className={styles.frame} src="./src/components/lending/img/Frame.svg" alt="" />

            {/* 🔥 ОБНОВЛЕННЫЕ СТАТЫ */}
            <section className={styles.stats}>
                <div className={styles.statCard}>
                    100m+
                    <span>Пісень</span>
                </div>

                <div className={styles.statCard}>
                    40k+
                    <span>Підкастів</span>
                </div>

                <div className={styles.statCard}>
                    20k+
                    <span>Виконавців</span>
                </div>
            </section>

            <section className={styles.features}>
                <h2>Що робить LumiTune особливим?</h2>
                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}></div>
                        <h3>Безкоштовна медіатека</h3>
                        <p>Слухай музику без реклами, пауз і з об’ємним звучанням.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}></div>
                        <h3>Інтелектуальні рекомендації</h3>
                        <p>LumiTune вивчає твої вподобання та пропонує ідеальні треки для настрою.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}></div>
                        <h3>Хмарне зберігання</h3>
                        <p>Усі твої треки доступні з будь-якого пристрою.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}></div>
                        <h3>Персоналізація інтерфейсу</h3>
                        <p>Зручний інтерфейс, який можна налаштовувати під себе.</p>
                    </div>
                </div>
            </section>

            <Footer_bar />
        </div>
    );
};

export default Lending;