'use client';
import React from 'react';

export const WaveRibbons: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div 
            className={`wave-ribbons-container ${className}`}
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden',
                maskImage: 'radial-gradient(ellipse at 50% 45%, black 65%, transparent 95%)',
                WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, black 65%, transparent 95%)',
            }}
            aria-hidden="true"
        >
            {/* 1. TOP-RIGHT CORNER SILK RIBBON (Live Flowing Streams) */}
            <div style={{
                position: 'absolute',
                top: '-15%',
                right: '-10%',
                width: '55vw',
                height: '700px',
                minWidth: '650px',
                opacity: 0.9,
                transform: 'rotate(-5deg)',
                animation: 'ribbonBreathe1 18s ease-in-out infinite alternate',
            }}>
                <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
                        const offset = i * 12;
                        const pinch = i * 4;
                        const isFlowing = i % 2 === 0;
                        return (
                            <path
                                key={i}
                                className={isFlowing ? 'flowing-stream-1' : ''}
                                d={`M ${150 + offset},0 C ${250 + pinch},250 ${500 - pinch},150 800,${300 + offset}`}
                                stroke="#0f172a"
                                strokeWidth={isFlowing ? "1.75" : "1.25"}
                                strokeOpacity={0.65 - i * 0.035}
                                strokeDasharray={isFlowing ? "400 300" : "none"}
                            />
                        );
                    })}
                </svg>
            </div>

            {/* 2. BOTTOM-RIGHT PERIMETER SWEEP (Live Flowing Streams) */}
            <div style={{
                position: 'absolute',
                bottom: '-20%',
                right: '-10%',
                width: '60vw',
                height: '750px',
                minWidth: '700px',
                opacity: 0.95,
                transform: 'rotate(-15deg)',
                animation: 'ribbonBreathe2 22s ease-in-out infinite alternate',
            }}>
                <svg viewBox="0 0 900 700" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((i) => {
                        const offset = i * 14;
                        const pinch = i * 5;
                        const isFlowing = i % 2 !== 0;
                        return (
                            <path
                                key={i}
                                className={isFlowing ? 'flowing-stream-2' : ''}
                                d={`M 900,${100 + offset} C ${600 - pinch},${350 + pinch} ${400 + pinch},${600 - pinch} ${100 + offset},700`}
                                stroke="#0f172a"
                                strokeWidth={isFlowing ? "1.75" : "1.25"}
                                strokeOpacity={0.7 - i * 0.035}
                                strokeDasharray={isFlowing ? "500 400" : "none"}
                            />
                        );
                    })}
                </svg>
            </div>

            {/* 3. TOP-LEFT / LEFT-SIDE FRAMING RIBBON (Live Flowing Streams) */}
            <div style={{
                position: 'absolute',
                top: '-5%',
                left: '-5%',
                width: '60vw',
                height: '800px',
                minWidth: '700px',
                opacity: 0.88,
                transform: 'rotate(12deg)',
                animation: 'ribbonBreathe3 20s ease-in-out infinite alternate',
            }}>
                <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
                        const offset = i * 14;
                        const pinch = i * 4;
                        const isFlowing = i % 2 === 0;
                        return (
                            <path
                                key={i}
                                className={isFlowing ? 'flowing-stream-3' : ''}
                                d={`M 0,${30 + offset} C ${420 - pinch},${250 + pinch} ${350 + pinch},${550 - pinch} 0,${750 + offset}`}
                                stroke="#0f172a"
                                strokeWidth={isFlowing ? "1.75" : "1.25"}
                                strokeOpacity={0.68 - i * 0.035}
                                strokeDasharray={isFlowing ? "400 300" : "none"}
                            />
                        );
                    })}
                </svg>
            </div>

            <style>{`
                .flowing-stream-1 {
                    animation: streamRun1 14s linear infinite;
                }
                .flowing-stream-2 {
                    animation: streamRun2 18s linear infinite;
                }
                .flowing-stream-3 {
                    animation: streamRun3 16s linear infinite;
                }

                @keyframes streamRun1 {
                    from { stroke-dashoffset: 700; }
                    to { stroke-dashoffset: 0; }
                }
                @keyframes streamRun2 {
                    from { stroke-dashoffset: 0; }
                    to { stroke-dashoffset: 900; }
                }
                @keyframes streamRun3 {
                    from { stroke-dashoffset: 600; }
                    to { stroke-dashoffset: 0; }
                }

                @keyframes ribbonBreathe1 {
                    0% { transform: translateY(0) rotate(-5deg) scale(1); }
                    100% { transform: translateY(35px) rotate(-8deg) scale(1.05); }
                }
                @keyframes ribbonBreathe2 {
                    0% { transform: translateY(0) rotate(-15deg) scale(1); }
                    100% { transform: translateY(-45px) rotate(-10deg) scale(1.06); }
                }
                @keyframes ribbonBreathe3 {
                    0% { transform: translateY(0) rotate(10deg) scale(1); }
                    100% { transform: translateY(-30px) rotate(14deg) scale(1.04); }
                }
            `}</style>
        </div>
    );
};
export default WaveRibbons;
