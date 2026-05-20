import React, { useState } from 'react';
import styles from './setings.module.css';
import Header_bar from "../header/header.jsx";
import Footer_bar from "../Footer/footer.jsx";

export const Seting = () => {
  // Состояния для переключателей
  const [offline, setOffline] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [mature, setMature] = useState(true);
  const [showPublicPlaylists, setShowPublicPlaylists] = useState(false);
  const [showListening, setShowListening] = useState(false);
  const [hideProfile, setHideProfile] = useState(false);
  const [showDeviceFiles, setShowDeviceFiles] = useState(true);
  const [musicFolder, setMusicFolder] = useState(true);
  const [language, setLanguage] = useState('uk');
  const [themeColor, setThemeColor] = useState('main');

  return (
    <div className={styles.page}>
      {/* Все декоративные круги */}
      <div className={styles.bgCircles}>
        <div className={styles.circle} style={{ width: 286, height: 286, left: 288.09, top: 1953.89, transform: 'rotate(165deg)', background: '#04142D' }} />
        <div className={styles.circle} style={{ width: 286, height: 286, left: 35.58, top: 1873.51, transform: 'rotate(165deg)', background: '#52B9F4' }} />
        <div className={styles.circle} style={{ width: 286, height: 286, left: 136.82, top: 2365.03, transform: 'rotate(165deg)', background: '#2F6FF3' }} />
        <div className={styles.circle} style={{ width: 286, height: 286, left: 186.82, top: 1678.03, transform: 'rotate(165deg)', background: 'rgba(112, 241, 213, 0.03)' }} />
        <div className={styles.circle} style={{ width: 310.54, height: 310.54, left: 2220.78, top: 1394.23, transform: 'rotate(172deg)', background: '#04142D' }} />
        <div className={styles.circle} style={{ width: 310.54, height: 310.54, left: 1960.34, top: 1271.94, transform: 'rotate(172deg)', background: '#52B9F4' }} />
        <div className={styles.circle} style={{ width: 310.54, height: 310.54, left: 1912, top: 2126.64, transform: 'rotate(172deg)', background: '#2FBBF3' }} />
        <div className={styles.circle} style={{ width: 486.91, height: 490.15, left: 1802.33, top: 1754.72, transform: 'rotate(172deg)', background: 'rgba(47, 111, 243, 0.43)' }} />
        <div className={styles.circle} style={{ width: 410.41, height: 413.14, left: 1738.93, top: 170.46, transform: 'rotate(172deg)', background: 'rgba(47, 243, 180.93, 0.60)' }} />
        <div className={styles.circle} style={{ width: 410.41, height: 413.14, left: 302.71, top: 1831.26, transform: 'rotate(172deg)', background: 'rgba(47, 243, 180.93, 0.26)' }} />
        <div className={styles.circle} style={{ width: 486.91, height: 490.15, left: 522.73, top: 636.39, transform: 'rotate(172deg)', background: 'rgba(47, 138.47, 243, 0.43)' }} />
        <div className={styles.circle} style={{ width: 486.91, height: 490.15, left: 1878.37, top: 1103.80, transform: 'rotate(172deg)', background: 'rgba(47, 135.20, 243, 0.43)' }} />
        <div className={styles.circle} style={{ width: 625.68, height: 625.68, left: 1324.62, top: 582.58, transform: 'rotate(172deg)', background: 'rgba(47, 111, 243, 0.73)' }} />
        <div className={styles.circle} style={{ width: 625.68, height: 625.68, left: 2071.80, top: 605.29, transform: 'rotate(172deg)', background: 'rgba(47, 174.40, 243, 0.45)' }} />
        <div className={styles.circle} style={{ width: 430.68, height: 430.68, left: 1134.81, top: 1174.76, transform: 'rotate(172deg)', background: 'rgba(47, 141.73, 243, 0.62)' }} />
        <div className={styles.circle} style={{ width: 430.68, height: 430.68, left: 579.08, top: 1538.63, transform: 'rotate(172deg)', background: 'rgba(47, 118.87, 243, 0.62)' }} />
        <div className={styles.circle} style={{ width: 310.54, height: 310.54, left: 2163.05, top: 1161.62, transform: 'rotate(172deg)', opacity: 0.20, background: '#70F1D5' }} />
        <div className={styles.circle} style={{ width: 310.54, height: 310.54, left: 1229.46, top: 1718.48, transform: 'rotate(172deg)', background: '#004DC5' }} />
        <div className={styles.circle} style={{ width: 310.54, height: 310.54, left: -124.68, top: 1637.28, transform: 'rotate(172deg)', background: 'rgba(82, 185, 244, 0.72)' }} />
        <div className={styles.circle} style={{ width: 2084.31, height: 162.18, left: 1960.83, top: 2506.68, transform: 'rotate(180deg)', background: '#2F8EF3' }} />
        <div className={styles.circle} style={{ width: 310.54, height: 310.54, left: 213.25, top: 1035.07, transform: 'rotate(172deg)', background: 'rgba(112, 221.65, 241, 0.58)' }} />
        <div className={styles.circle} style={{ width: 286, height: 286, left: -108.45, top: -320.56, background: '#04142D' }} />
        <div className={styles.circle} style={{ width: 286, height: 286, left: 114.65, top: -177.56, background: '#52B9F4' }} />
        <div className={styles.circle} style={{ width: 286, height: 286, left: 78.09, top: -387.23, background: '#2F6FF3' }} />
        <div className={styles.circle} style={{ width: 286, height: 286, left: -83.72, top: -101.23, background: '#70F1D5' }} />
        <div className={styles.circle} style={{ width: 286, height: 286, left: 2260.54, top: 1059.12, transform: 'rotate(165deg)', background: '#04142D' }} />
        <div className={styles.circle} style={{ width: 286, height: 286, left: 2008.04, top: 978.74, transform: 'rotate(165deg)', opacity: 0.50, background: '#52B9F4' }} />
        <div className={styles.circle} style={{ width: 286, height: 286, left: 2097.61, top: 1171.79, transform: 'rotate(165deg)', background: '#2F6FF3' }} />
        <div className={styles.circle} style={{ width: 286, height: 286, left: 2179.89, top: 853.66, transform: 'rotate(165deg)', background: '#70F1D5' }} />
      </div>

      <div className={styles.headerFix}>
        <Header_bar />
      </div>

      <div className={styles.content}>
        <div className={styles.top_text}>
          <div className={styles.pageTitle}>Налаштування</div>
        </div>

        <div className={styles.settingsSection}>
          {/* Акаунт */}
          <div>
            <div className={styles.settingRow}>
              <div className={styles.sectionTitle}>Акаунт</div>
              <div className={styles.accountButtons}>
                <div className={styles.accountButton}>Вийти</div>
                <div className={styles.accountButton}>Змінити акаунт</div>
              </div>
            </div>
          </div>

          {/* Офлайн-Режим */}
          <div>
            <div className={styles.settingRow}>
              <div className={styles.sectionTitle}>Офлайн-Режим</div>
              <div
                className={styles.toggleSwitch}
                data-state={offline ? 'on' : 'off'}
                onClick={() => setOffline(!offline)}
              >
                <div className={styles.toggleKnob} />
              </div>
            </div>
            <div className={styles.settingDescription}>Слухайте музику без підключення до інтернету.</div>
          </div>

          {/* Мова */}
          <div>
            <div className={styles.settingRow}>
              <div className={styles.sectionTitle}>Мова</div>
              <select
                className={styles.select}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="uk">Українська (UA)</option>
                <option value="en">English (EN)</option>
              </select>
            </div>
            <div className={styles.settingDescription}>Оберіть мову платформи. Після цього зробіть перезапуск.</div>
          </div>

          {/* Сповіщення */}
          <div>
            <div className={styles.settingRow}>
              <div className={styles.sectionTitle}>Сповіщення</div>
              <div
                className={styles.toggleSwitch}
                data-state={notifications ? 'on' : 'off'}
                onClick={() => setNotifications(!notifications)}
              >
                <div className={styles.toggleKnob} />
              </div>
            </div>
            <div className={styles.settingDescription}>Контролюйте ваші сповіщення.</div>
          </div>

          {/* Контент для дорослих */}
          <div>
            <div className={styles.settingRow}>
              <div className={styles.sectionTitle}>Контент для дорослих (Mature)</div>
              <div
                className={styles.toggleSwitch}
                data-state={mature ? 'on' : 'off'}
                onClick={() => setMature(!mature)}
              >
                <div className={styles.toggleKnob} />
              </div>
            </div>
            <div className={styles.settingDescription}>Дозволити контент для дорослих (М). Контент позначений значком М. На налаштування може піти деякий час!</div>
          </div>

          {/* Приватність */}
          <div>
            <div className={styles.sectionTitle}>Приватність</div>
            <div className={styles.settingDescription}>Керуйте тим, хто може бачити ваші плейлисти, підписки та активність у додатку.</div>
            <div className={styles.privacyGroup}>
              <div className={styles.privacyRow}>
                <div className={styles.privacyLabel}>Показувати мої публічні плейлисти:</div>
                <div
                  className={styles.toggleSwitch}
                  data-state={showPublicPlaylists ? 'on' : 'off'}
                  onClick={() => setShowPublicPlaylists(!showPublicPlaylists)}
                >
                  <div className={styles.toggleKnob} />
                </div>
              </div>
              <div className={styles.privacyRow}>
                <div className={styles.privacyLabel}>Дозволити іншим бачити, що я слухаю зараз:</div>
                <div
                  className={styles.toggleSwitch}
                  data-state={showListening ? 'on' : 'off'}
                  onClick={() => setShowListening(!showListening)}
                >
                  <div className={styles.toggleKnob} />
                </div>
              </div>
              <div className={styles.privacyRow}>
                <div className={styles.privacyLabel}>Приховати мій профіль з пошуку:</div>
                <div
                  className={styles.toggleSwitch}
                  data-state={hideProfile ? 'on' : 'off'}
                  onClick={() => setHideProfile(!hideProfile)}
                >
                  <div className={styles.toggleKnob} />
                </div>
              </div>
            </div>
          </div>

          {/* Моя медіатека */}
          <div>
            <div className={styles.sectionTitle}>Моя медіатека</div>
            <div className={styles.settingDescription}>Слухайте музику з вашого пристрою!</div>
            <div className={styles.privacyGroup}>
              <div className={styles.privacyRow}>
                <div className={styles.privacyLabel}>Показати файли на пристрої</div>
                <div
                  className={styles.toggleSwitch}
                  data-state={showDeviceFiles ? 'on' : 'off'}
                  onClick={() => setShowDeviceFiles(!showDeviceFiles)}
                >
                  <div className={styles.toggleKnob} />
                </div>
              </div>
              <div className={styles.privacyRow}>
                <div className={styles.privacyLabel}>Папка “Музика”</div>
                <div
                  className={styles.toggleSwitch}
                  data-state={musicFolder ? 'on' : 'off'}
                  onClick={() => setMusicFolder(!musicFolder)}
                >
                  <div className={styles.toggleKnob} />
                </div>
              </div>
            </div>
          </div>

          {/* Колір системи */}
          <div>
            <div className={styles.settingRow}>
              <div className={styles.sectionTitle}>Колір системи</div>
              <select
                className={styles.select}
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
              >
                <option value="main">Основна</option>
                <option value="light">Світла</option>
                <option value="dark">Темна</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerFix}>
        <Footer_bar />
      </div>
    </div>
  );
};

export default Seting;