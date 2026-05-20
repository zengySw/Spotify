import React from "react";
import "./foundPage.css";
import BTS2 from "../../assets/imgs/BTS2.svg";
import BE from "../../assets/imgs/BE.svg";
import LoveYourSelf1 from "../../assets/imgs/LoveYourSelfMusicCard.svg";
import LoveYourSelf2 from "../../assets/imgs/LoveYourSelfMusicCard2.svg";
import MapOfTheSoul from "../../assets/imgs/MapOfTheSoul.svg";
import Proof from "../../assets/imgs/Proof.svg";
import MapOfTheSoul2 from "../../assets/imgs/MapOfTheSoul2.svg";
import OurCommand from "../../assets/imgs/OurCommand.svg";
import JungKook from "../../assets/imgs/JungkookPhoto.svg";
import Jimin from "../../assets/imgs/JiminPhoto.svg";
import Jin from "../../assets/imgs/JinPhoto.svg";
import V from "../../assets/imgs/VPhoto.svg";
import RM from "../../assets/imgs/RMPhoto.svg";
import BTSThisWeek from "../../assets/imgs/BTS-This-Week.svg";
import BTSKPOP from "../../assets/imgs/BTS-K-POP.svg";
import BTSWith from "../../assets/imgs/BTS-With.svg";
import BTSFan from "../../assets/imgs/BTS-Fan.svg";
import BTSfun from "../../assets/imgs/BTS-fun.svg";
import BTSFrance from "../../assets/imgs/BTS-France.svg";
import ArMy from "../../assets/imgs/ArMy.svg";
import BTSArmy from "../../assets/imgs/BTS-Army.svg";
import BTSTaekook from "../../assets/imgs/BTS-Taekook.svg";

function FoundPage() {

    const albums = [
        { title: "BE", p: "BTS", image: BE },
        { title: "Love Yourself", p: "BTS", image: LoveYourSelf1 },
        { title: "Love Yourself Turn...", p: "BTS", image: LoveYourSelf2 },
        { title: "Map of the Soul", p: "BTS", image: MapOfTheSoul },
        { title: "Proof", p: "BTS", image: Proof },
        { title: "Map of the Soul 7", p: "BTS", image: MapOfTheSoul2 },
    ];
    const authors = [
        { name: "RM", image: RM },
        { name: "Jungkook", image: JungKook },
        { name: "Jimin", image: Jimin },
        { name: "Jin", image: Jin },
        { name: "V", image: V },
    ];
    const podcasts = [
        { title: "BTS This Week", image: BTSThisWeek, description: "Подкаст BTS This Week — ваше джерело всіх новин про BTS" },
        { title: "BTS K-POP", image: BTSKPOP, description: "Приєднуйтесь до нас у BTS – Beyond the Spotlight" },
        { title: "BTS With", image: BTSWith, description: "Приєднуйтесь до нас у BTS – Beyond the Spotlight" },
        { title: "BTS Fan", image: BTSFan, description: "Приєднуйтесь до нас у BTS – Beyond the Spotlight" },
    ];
    const profiles = [
        { title: "BTS Fun", image: BTSfun },
        { title: "BTS France", image: BTSFrance },
        { title: "BTS ArMy", image: ArMy },
        { title: "BTS Army", image: BTSArmy },
        { title: "BTS Taekook", image: BTSTaekook },
    ];

    return (
        <div className="found-Page-style">
            <div style={{ display: "flex", gap: 10, padding: "12px 18px 10px" }}>
                {["Всі", "Треки", "Альбоми","Плейлiсти", "Виконавцi", "Подкасти", "Профiлi"].map((label) => (
                    <button
                        key={label}
                        type="button"
                        style={{
                            minWidth: 68,
                            height: 28,
                            borderRadius: 6,
                            border: "1px solid rgba(132, 184, 220, 0.45)",
                            background: "rgba(33, 56, 77, 0.55)",
                            color: "#d8ebfb",
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: "pointer",
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>
            {/* Здесь можно добавить контент для страницы "FoundPage" */}
            <div className="best-result">
                <h2 >
                    <span style={{ color: "#ffffff" }}>Найкращий </span>
                    <span style={{paddingLeft: 10, color: "#7dd1ff" }}>результат</span>
                </h2>
                <img src={BTS2} alt="BTS" />
                <div className="best-result-text">
                <p>Виконавець</p>
                <h1>BTS</h1>
                <h4>15 297 200 Слухачiв за мiсяць</h4>
                </div>
                <h3>BTS, абревіатура від Bangtan Sonyeondan або «Beyond the Scene», — південнокорейська група, номінована на «Греммі», яка захоплює серця мільйонів шанувальників у всьому світі з моменту свого дебюту в червні 2013 року.Членами BTS є RM, Jin, SUGA, j-hope, Jimin,V і Jung Kook.</h3>
            </div>


            <div className="tracks">
                <h2>Треки</h2>
                <div className="tracks-container"></div>
                <div className="tracks-container"></div>
                <div className="tracks-container"></div>
                <div className="tracks-container"></div>
                <button>Показати ще...</button>
            </div>
            <h2 id="albums-text">Альбоми</h2>

            <div className="albums-container">
                {albums.map((album, index) => (
                    <div key={`${album.title}-${index}`} className="album-card">
                        <img src={album.image} alt={album.title} />
                        <div className="album-card-title">{album.title}</div>
                        <div className="album-card-author">{album.p}</div>
                    </div>
                ))}
            </div>

            <h2 id="authors-text">Виконавці</h2>

            <div className="authors-container">
                {authors.map((author, index) => (
                    <div key={`${author.name}-${index}`} className="author-card">
                        <img src={author.image} alt={author.name} />
                        <div className="author-card-name">{author.name}</div>
                    </div>
                ))}
            </div>

            <h2 id="podcasts-text">Подкасти</h2>

            <div className="podcasts-container">
                {podcasts.map((podcast, index) => (
                    <div key={`${podcast.title}-${index}`} className="podcast-card">
                        <img src={podcast.image} />
                        <p className="podcasts-title">{podcast.title}</p>
                        <p className="podcasts-description">{podcast.description}</p>
                    </div>
                ))}

            </div>

            <h2 id="profile-text">Профілі</h2>

            <div className="profile-container">
                {profiles.map((profile, index) => (
                    <div key={`${profile.name}-${index}`} className="profile-card">
                        <img src={profile.image} alt={profile.name} />
                        <p>{profile.title}</p>  
                    </div>
                ))}

            </div>
        </div>
    );
}


export default FoundPage;