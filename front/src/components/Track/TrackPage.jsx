import React from "react";
import "./TrackPage.css";

function TrackPage() {

    const recomendations = [

    ];
    const authorsTracks = [

    ];
    const authorsShop = [

    ];
    const otherAlbums = [

    ];

    return (
        <div className="track-Page-style">
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
                    {/* Здесь можно добавить контент для страницы "TrackPage" */}
                    <div classname="traks-home"></div>
        </div>
    );
}

export default TrackPage;