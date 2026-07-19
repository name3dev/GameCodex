import React from "react";
import { motion } from "framer-motion";
import GameCard from "../components/explore/GameCard";
import "../App.css";

const GENRES = [
    {
        name: "FPS",
        icon: "🎯",
        color: "#00e5ff",
        desc: "First-person combat and shooting mechanics.",
        branches: [
            {
                name: "Arena Shooter",
                desc: "Fast paced movement and reflexes."
            },
            {
                name: "Tactical Shooter",
                desc: "Precision and teamwork."
            }
        ]
    },

    {
        name: "Action",
        icon: "⚔️",
        color: "#ff9933",
        desc: "Fast movement and direct combat.",
        branches: [
            {
                name: "Hack & Slash",
                desc: "Stylish combo combat."
            },
            {
                name: "Adventure Action",
                desc: "Story focused gameplay."
            }
        ]
    },

    {
        name: "Horror",
        icon: "👁️",
        color: "#ff5555",
        desc: "Fear, tension and survival mechanics.",
        branches: [
            {
                name: "Survival Horror",
                desc: "Resource management."
            },
            {
                name: "Psychological Horror",
                desc: "Atmosphere over jumpscares."
            }
        ]
    }
];

function Explore({ eraIndex }) {

    const eraClasses = [
        "era-8bit",
        "era-16bit",
        "era-3d",
        "era-modern"
    ];

    const era = eraClasses[eraIndex];

    return (
        <div className={`tree-page ${era}`}>

            <motion.h1
                className="tree-title"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Genre Tree
            </motion.h1>

            {GENRES.map((genre, index) => (

                <motion.section
                    key={genre.name}
                    className="tree-root-section"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                >

                    <div
                        className="root-card"
                        style={{
                            borderColor: genre.color
                        }}
                    >
                        <div className="root-icon">
                            {genre.icon}
                        </div>

                        <h2>{genre.name}</h2>

                        <p>{genre.desc}</p>
                    </div>

                    <div className="root-main-line"></div>

                    <div className="branches-row">

                        {genre.branches.map((branch) => (

                            <div
                                className="branch-column"
                                key={branch.name}
                            >

                                <div className="branch-line-top"></div>

                                <div className="branch-card">

                                    <h3>{branch.name}</h3>

                                    <p>{branch.desc}</p>

                                </div>

                                <GameCard
                                    genre={genre.name}
                                    branch={branch.name}
                                    era={era}
                                />

                            </div>

                        ))}

                    </div>

                </motion.section>

            ))}

        </div>
    );
}

export default Explore;