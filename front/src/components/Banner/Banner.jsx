import React from 'react';
import './Banner.css';

export default function Dot({ State }) {function Check(State) {
    if (State) {
        return 'banner_dot--' + State;
    }
    return '';
} return (<div className={`banner_dot ${Check(State)}`}></div>); }

export const Banner = () => {
    const slides = [
        { id: 1, src: 'https://placehold.co/748x374', alt: 'Slide 1' },
        { id: 2, src: 'https://placehold.co/748x374', alt: 'Slide 2' },
        { id: 3, src: 'https://placehold.co/748x374', alt: 'Slide 3' },
    ];

    return (
        <div data-layer="Promo Banner" className="banner">
            {slides.map((slide) => (
                <div key={slide.id} data-layer={`Slide ${slide.id} Container`} className="banner_slide">
                    <img data-layer={`Slide Image ${slide.id}`} className="banner_image" src={slide.src} alt={slide.alt} />
                </div>
            ))}

            <div data-layer="Pagination Indicators" className="banner_pagination">

                <Dot isActive={"active"} />
                <Dot isActive={"dimmed-light"} />
                <Dot isActive={"dimmed-extreme"} />
            </div>
        </div>
    );
};
