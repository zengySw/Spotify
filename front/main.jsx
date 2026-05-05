import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Main from "./Components/App/Main";
import Playlist from "./Components/App/Library/Playlist/Playlist";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Main /> */}
    <Playlist
      name="Мій плейлист"
      icon="/likes_ico.png"
      author={{ name: "Автор плейлиста", icon: "https://i.pinimg.com/564x/1c/8e/0b/1c8e0b9a7d2f5a3c9e4b6c9e5f1a2b.jpg" }}
      tracks={[
        { id: 1, num: 1, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/vG4wFeyyZv.png", title: "ВИМОЛИВ", artists: ["Jerry Heil", "MONATIK", "Evgeny Khmara"], album: "Вимолв", listenCount: null, duration: "3:02", addDate: "Сьогодні" },
        { id: 2, num: 2, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/oFWQHwbxbg.png", title: "Для моєї душі", artists: ["Сайонай Ли"], album: "Струни моєї душі", listenCount: null, duration: "2:56", addDate: "Сьогодні" },
        { id: 3, num: 3, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/14aiRt4ZhQ.png", title: "Remember me", artists: ["Hozen Recks"], album: "Harmonic Corwergence", listenCount: null, duration: "2:43", addDate: "Сьогодні" },
        { id: 4, num: 4, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/ws6rP8MeUL.png", title: "Solo", artists: ["MOLIN PRIM"], album: "G I R L", listenCount: null, duration: "1:34", addDate: "Сьогодні" },
        { id: 5, num: 5, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/oOXP6nmo1b.png", title: "How You Like That", artists: ["BLACKPINK"], album: "THE ALBUM", listenCount: null, duration: "2:34", addDate: "Сьогодні" },
        { id: 6, num: 6, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/NZS5kfBpwY.png", title: "Ice Cream", artists: ["BLACKPINK"], album: "THE ALBUM", listenCount: null, duration: "3:02", addDate: "02.04.2025" },
        { id: 7, num: 7, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/AMaspWa5Sw.png", title: "Bet You Wanna", artists: ["BLACKPINK"], album: "THE ALBUM", listenCount: null, duration: "3:02", addDate: "02.04.2025" },
        { id: 8, num: 8, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/QPoSZc315i.png", title: "TOMBOY", artists: ["(G)I-DLE"], album: "100% (G)I-DLE", listenCount: null, duration: "3:22", addDate: "02.04.2025" },
        { id: 9, num: 9, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/aSnGgL80Db.png", title: "LION", artists: ["(G)I-DLE"], album: "100% (G)I-DLE", listenCount: null, duration: "3:45", addDate: "02.04.2025" },
        { id: 10, num: 10, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/pUJvCsYzjC.png", title: "JEALOUSY", artists: ["Offset", "Cardi B"], album: "JEALOUSY", listenCount: null, duration: "3:22", addDate: "23.03.2025" },
        { id: 11, num: 11, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/U84tYvUhYa.png", title: "I Like It", artists: ["Cardi B"], album: "Invasion of Privacy", listenCount: null, duration: "3:12", addDate: "23.03.2025" },
        { id: 12, num: 12, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/HWpJ2gGFsu.png", title: "Up", artists: ["Cardi B"], album: "Invasion of Privacy", listenCount: null, duration: "1:11", addDate: "22.03.2025" },
        { id: 13, num: 13, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/gVwO9RNruM.png", title: "APT.", artists: ["ROSÉ", "Bruno Mars"], album: "Invasion of Privacy", listenCount: null, duration: "2:48", addDate: "12.03.2025" },
        { id: 14, num: 14, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/5QmmXGdKTA.png", title: "When I Was Your Man", artists: ["Bruno Mars"], album: "Unorthodox Jukebox", listenCount: null, duration: "2:43", addDate: "12.03.2025" },
        { id: 15, num: 15, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/VzC8Nj0Ck5.png", title: "Die With A Smile", artists: ["Lady Gaga", "Bruno Mars"], album: "Die With A Smile", listenCount: null, duration: "4:10", addDate: "12.03.2025" },
        { id: 16, num: 16, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/UXXXykUcfn.png", title: "Shallow", artists: ["Lady Gaga", "Bradley Cooper"], album: "A Star Is Born Soundtrack", listenCount: null, duration: "2:43", addDate: "12.03.2024" },
        { id: 17, num: 17, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/k36MLZyxCE.png", title: "Rockstar", artists: ["LISA"], album: "Alter Ego", listenCount: null, duration: "2:46", addDate: "14.02.2024" },
        { id: 18, num: 18, icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-04-29/6EJOz3XAFz.png", title: "Thunder", artists: ["LISA"], album: "Alter Ego", listenCount: null, duration: "2:42", addDate: "14.02.2024" },
      ]}
    />
  </StrictMode>
);
