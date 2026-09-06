import React from "react";
const DATABASE = {
    FPS: {
        "Arena Shooter": [
            {
                name: "DOOM Eternal",
                year: "2020",
                image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/782330/feaf8293bcd2d078422faa547bc0d707c08f606e/header.jpg?t=1783432602",
                desc: "Fast demon slaying."
            },
            {
                name: "Quake",
                year: "1996",
                image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2310/fedba2dc09b59eab41d6ebb981b9c436ed04c85f/header_alt_assets_0.jpg?t=1786035741",
                desc: "Classic arena shooter."
            }
        ],

        "Tactical Shooter": [
            {
                name: "Counter-Strike 2",
                year: "2023",
                image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/162664aa5da85f418105350c5d67ca565f6c3713/header.jpg?t=1784564069",
                desc: "Competitive FPS."
            }
        ]
    },

    Action: {
        "Hack & Slash": [
            {
                name: "Devil May Cry 5",
                year: "2019",
                image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/601150/header.jpg?t=1768869803",
                desc: "Stylish combat."
            }
        ],

        "Adventure Action": [
            {
                name: "God of War",
                year: "2022",
                image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/header.jpg?t=1763059412",
                desc: "Story driven combat."
            }
        ]
    },
    Horror: {
        "Survival Horror": [
            {
                name: "Resident Evil 4",
                year: "2023",
                image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg?t=1783432602",
                desc: "Classic survival horror."
            }
        ],
        "Psychological Horror": [
            {
                name: "Silent Hill 2",
                year: "2001",
                image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2124490/header.jpg?t=1744248682",
                desc: "Psychological horror classic."
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
                    className="game-card"
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