import './RowList.css';
import { useState, useRef } from 'react';
import React from 'react';

export default function RowList({ title, childs, prevCount, continueLink = null }) {
    const [index, setIndex] = useState(0);
    const maxIndex = React.Children.count(childs) - prevCount;
    const listRef = useRef(null);

    const getStep = () => {
        if (!listRef.current) return 0;

        const firstChild = listRef.current.children[0];
        if (!firstChild) return 0;

        const gap = 24;
        return firstChild.offsetWidth + gap;
    };

    return (
        <div className="row-list">
            <div className="card-header">
                {title}
                <div className="scroll">
                    <svg onClick={() => {
                        const step = getStep();
                        listRef.current.scrollBy({
                            left: -step,
                            behavior: 'smooth'
                        });

                        setIndex(prev => Math.max(prev - 1, 0));
                    }} style={{ opacity: index === 0 ? 0.3 : 1, cursor: 'pointer' }} viewBox="0 0 48 48" version="1" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 48 48" transform="rotate(180)">
                        <polygon fill="#8FB3EF" points="17.1,5 14,8.1 29.9,24 14,39.9 17.1,43 36,24" />
                    </svg>
                    <svg onClick={() => {
                        const step = getStep();
                        listRef.current.scrollBy({
                            left: step,
                            behavior: 'smooth'
                        });

                        setIndex(prev => Math.min(prev + 1, maxIndex));
                    }} style={{ opacity: index === maxIndex ? 0.3 : 1, cursor: 'pointer' }} viewBox="0 0 48 48" version="1" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 48 48" fill="#000000">

                        <polygon fill="#8FB3EF" points="17.1,5 14,8.1 29.9,24 14,39.9 17.1,43 36,24" />
                    </svg>
                </div>
            </div>
            <div className="container">
                <div className="list" style={{ '--count': prevCount }} ref={listRef}>
                    {childs}
                </div>
                {continueLink ? <a href={continueLink}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12H18M12 6V18" stroke="#93A1B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>Все тут</a> : null}
            </div>
        </div>
    )
}