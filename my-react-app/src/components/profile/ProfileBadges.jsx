const badges = {
    founder: {
        icon: "👑",
        text: "Founder",
        color: "#ffb800"
    },

    developer: {
        icon: "🛠",
        text: "Developer",
        color: "#00d4ff"
    },

    admin: {
        icon: "🛡",
        text: "Administrator",
        color: "#ff5050"
    },

    verified: {
        icon: "⭐",
        text: "Verified",
        color: "#6cff47"
    },

    moderator: {
        icon: "⚖️",
        text: "Moderator",
        color: "#b45cff"
    },

    premium: {
        icon: "💎",
        text: "Premium",
        color: "#00e5ff"
    }
};

function ProfileBadges({ roles = [] }) {

    return (

        <div className="profile-badges">

            {roles.map(role => {

                const badge = badges[role];

                if (!badge) return null;

                return (

                    <div
                        key={role}
                        className="profile-badge"
                        style={{ borderColor: badge.color }}
                    >

                        <span>{badge.icon}</span>

                        {badge.text}

                    </div>

                );

            })}

        </div>

    );

}

export default ProfileBadges;