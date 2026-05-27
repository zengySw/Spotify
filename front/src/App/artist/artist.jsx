import "./artist.css"
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistById } from "../../hooks/dataHooks.js";

export default function Artist() {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getArtistById(id)
            .then(data => {
                if (data) {
                    setArtist(data);
                } else {
                    setError("Artist not found");
                }
            })
            .catch(error => {
                console.error("Error fetching artist data:", error);
                setError("Failed to load artist information");
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="artist-page loading">
                <div className="spinner"></div>
                <p>Loading artist information...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="artist-page error">
                <h2>⚠️ {error}</h2>
                <p>Sorry, we couldn't load the artist information.</p>
            </div>
        );
    }

    return (
        <div className="artist-page">
            {artist && (
                <>
                    <div className="artist-header">
                        <div className="artist-image-wrapper">
                            <img 
                                src={artist.icon} 
                                alt={artist.name}
                                className="artist-image"
                            />
                        </div>
                        <div className="artist-header-info">
                            <p className="artist-label">ARTIST</p>
                            <h1 className="artist-name">{artist.name}</h1>
                            <p className="artist-followers">
                                {artist.followers?.toLocaleString() || 0} followers
                            </p>
                        </div>
                    </div>

                    <div className="artist-details">
                        {artist.genres && artist.genres.length > 0 && (
                            <div className="detail-section">
                                <h3>Genres</h3>
                                <div className="genres-list">
                                    {artist.genres.map((genre, idx) => (
                                        <span key={idx} className="genre-tag">
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {artist.popularity && (
                            <div className="detail-section">
                                <h3>Popularity</h3>
                                <div className="popularity-bar">
                                    <div 
                                        className="popularity-fill"
                                        style={{ width: `${artist.popularity}%` }}
                                    ></div>
                                </div>
                                <p className="popularity-text">{artist.popularity}%</p>
                            </div>
                        )}

                        {artist.external_urls?.spotify && (
                            <div className="detail-section">
                                <a 
                                    href={artist.external_urls.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="spotify-link"
                                >
                                    Open on Spotify →
                                </a>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}