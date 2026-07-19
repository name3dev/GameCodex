import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ERAS_DATA = [
    {
        id: 'era-8bit',
        name: '1980s (8-Bit Era)',
        title: 'The Golden Age & 8-Bit Resurrection',
        intro: 'Following the infamous 1983 crash, a new wave of home entertainment emerged. Pixels, chiptunes, and rigid mechanics defined a generation where gaming moved from smoky arcades straight into the living room.',
        games: [
            { name: 'Super Mario Bros. (1985)', desc: 'The legendary side-scroller that established industry standards for platforming, camera movement, and level design.' },
            { name: 'Pac-Man (1980)', desc: 'An arcade pop-culture phenomenon that introduced maze-chase gameplay and the very first gaming mascot.' },
            { name: 'Tetris (1984)', desc: 'The timeless puzzle masterpiece from Moscow, proving that addictive gameplay beats heavy graphics every single time.' }
        ],
        hardware: [
            { name: 'Nintendo Entertainment System (NES)', power: 'Ricoh 2A03 8-bit CPU, 2KB RAM', impact: 'Saved the home console market and introduced strict quality control for third-party developers.' },
            { name: 'Nintendo Game Boy', power: 'Sharp LR35902 8-bit, Monochrome LCD', impact: 'Made gaming truly portable, dominating the handheld market for over a decade.' }
        ]
    },
    {
        id: 'era-16bit',
        name: '1990s (16-Bit & 3D Wars)',
        title: 'The Bit Wars & The Third Dimension',
        intro: 'An era of intense marketing wars between Sega and Nintendo that pushed 2D sprite art to its absolute peak, only to be completely disrupted by the explosive arrival of real-time 3D polygons and CD-ROM technology.',
        games: [
            { name: 'Doom (1993)', desc: 'A revolutionary shareware title that defined first-person shooters with fast-paced networked multiplayer and immersive pseudo-3D levels.' },
            { name: 'Sonic the Hedgehog (1991)', desc: 'Built completely around speed to showcase the processing power of Segas hardware, sparking the classic console wars.' },
            { name: 'Pokémon Red & Blue (1996)', desc: 'A late Game Boy masterpiece that sparked a global media franchise through social cable-trading and collecting mechanics.' }
        ],
        hardware: [
            { name: 'Sega Mega Drive / Genesis', power: 'Motorola 68000 16-bit CPU', impact: 'Brought arcade-accurate sports games and an edgy, teenage-focused attitude to the market.' },
            { name: 'Sony PlayStation 1', power: '32-bit MIPS RISC CPU, CD-ROM Drive', impact: 'Ditched cartridges for high-capacity CDs, making orchestral music and cinematic FMV cutscenes possible.' }
        ]
    },
    {
        id: 'era-3d',
        name: '2000s (Cinematic 3D)',
        title: 'The Rise of Cinematic Open Worlds',
        intro: 'The turn of the millennium turned video games into multi-million dollar cinematic blockbusters. Processing power allowed developers to render fully open 3D urban landscapes, complex physics, and mature narratives.',
        games: [
            { name: 'Grand Theft Auto III (2001)', desc: 'A cultural milestone that defined the non-linear 3D open-world genre, giving players unprecedented freedom.' },
            { name: 'Half-Life 2 (2004)', desc: 'Set a brand new benchmark for first-person storytelling, physics-based puzzles, and realistic facial animations.' },
            { name: 'World of Warcraft (2004)', desc: 'Conquered the MMORPG market, creating a massive, interconnected online social space for millions of active players.' }
        ],
        hardware: [
            { name: 'Sony PlayStation 2', power: 'Emotion Engine 64-bit CPU, DVD Drive', impact: 'The best-selling console of all time, doubling as an affordable home DVD player for millions.' },
            { name: 'Microsoft Xbox 360', power: 'Xenon 3-core 3.2 GHz, HD Graphics', impact: 'Popularized high-definition gaming and established the modern blueprint for premium online multiplayer console networks.' }
        ]
    },
    {
        id: 'era-modern',
        name: 'Modern Era',
        title: 'Photorealism, Indies & The Infinite Connected World',
        intro: 'Today, the boundaries between movies and games are completely blurred. Ultra-fast SSDs, ray tracing, and high-fidelity engines coexist with a massive indie revolution where independent creators dictate gaming trends.',
        games: [
            { name: 'Minecraft (2011)', desc: 'The ultimate sandbox phenomenon that rewrote the rules of player freedom, emergent gameplay, and digital crafting.' },
            { name: 'The Witcher 3: Wild Hunt (2015)', desc: 'Redefined modern dark-fantasy action RPGs with incredibly dense world-building and mature side-quest writing.' },
            { name: 'Elden Ring (2022)', desc: 'Merged mysterious cryptic storytelling with a massive, uncompromising open world, winning universal critical acclaim.' }
        ],
        hardware: [
            { name: 'PlayStation 5 / Xbox Series X', power: 'Custom AMD Zen 2 CPU, Ultra-Fast NVMe SSD', impact: 'Virtually eliminated loading screens and introduced native ray-traced lighting physics.' },
            { name: 'Nintendo Switch', power: 'Custom NVIDIA Tegra X1 Hybrid SoC', impact: 'Successfully merged home console power with handheld portability, creating a unique hardware segment.' }
        ]
    }
];

function Home({ eraIndex, setEraIndex }) {
    const currentData = ERAS_DATA[eraIndex];

    return (
        <div className="home-page">

            <section className="hero-section">
                <h1 className="hero-title">Welcome to <span className="neon-text">GameCodex</span></h1>
                <p className="hero-subtitle">Travel through the timeline of interactive entertainment history.</p>
            </section>

            <section className="slider-section">
                <div className="custom-slider-wrapper">
                    <span className="era-slider-label">Current Timeline View:</span>
                    <div className="slider-track-container">
                        {ERAS_DATA.map((era, idx) => (
                            <button
                                key={era.id}
                                className={`slider-node-btn ${idx === eraIndex ? 'active-node' : ''}`}
                                onClick={() => setEraIndex(idx)}
                            >
                                {era.name.split(' ')[0]}
                                {idx === eraIndex && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="slider-smooth-thumb"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence mode="wait">
                <motion.div
                    key={eraIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="era-content-layout"
                >
                    <div className="era-intro-block">
                        <h2 className="era-main-title">{currentData.title}</h2>
                        <p className="era-main-text">{currentData.intro}</p>
                    </div>

                    <div className="era-games-block">
                        <h3 className="era-sub-title">✦ Iconic Soundtracks & Games</h3>
                        <div className="home-games-grid">
                            {currentData.games.map((game, i) => (
                                <div key={i} className="home-game-card">
                                    <h4 className="home-game-name">{game.name}</h4>
                                    <p className="home-game-desc">{game.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="era-hardware-block">
                        <h3 className="era-sub-title">⚙ Key Hardware & Architectural Impact</h3>
                        <div className="home-hardware-grid">
                            {currentData.hardware.map((hw, i) => (
                                <div key={i} className="home-hw-card">
                                    <div className="home-hw-header">
                                        <h4 className="home-hw-name">{hw.name}</h4>
                                        <span className="home-hw-specs">{hw.power}</span>
                                    </div>
                                    <p className="home-hw-impact"><strong>Historical Impact:</strong> {hw.impact}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </motion.div>
            </AnimatePresence>

        </div>
    );
}

export default Home;
