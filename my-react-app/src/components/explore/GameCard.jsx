import React from "react";
const DATABASE = {
    FPS: {
        "Arena Shooter": [
            {
                name: "DOOM Eternal",
                year: "2020",
                image: "...",
                desc: "Fast demon slaying."
            },
            {
                name: "Quake",
                year: "1996",
                image: "...",
                desc: "Classic arena shooter."
            }
        ],

        "Tactical Shooter": [
            {
                name: "Counter-Strike 2",
                year: "2023",
                image: "...",
                desc: "Competitive FPS."
            }
        ]
    },

    Action: {
        "Hack & Slash": [
            {
                name: "Devil May Cry 5",
                year: "2019",
                image: "...",
                desc: "Stylish combat."
            }
        ],

        "Adventure Action": [
            {
                name: "God of War",
                year: "2018",
                image: "...",
                desc: "Story driven combat."
            }
        ]
    }
};
function GameCard({ genre, branch, era }) {
    const games = DATABASE[genre]?.[branch] || [];
    return (
        <div className="branch-games">

            {games.map((game, index) => (

                <div
                    key={index}
                    className={`game-card ${era}`}
                >

                    <div className="game-banner">

                        <img
                            src={game.image}
                            alt={game.name}
                            className="game-image"
                        />

                        <div className="game-overlay">
                            <span>{game.year}</span>
                        </div>

                    </div>

                    <div className="game-info">

                        <h4>{game.name}</h4>

                        <p>{game.desc}</p>

                        <button className="game-button">
                            View
                        </button>

                    </div>

                </div>

            ))}

        </div>
    );
}

export default GameCard;