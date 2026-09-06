import founder_logo from "../../../src/assets/logo.png";
import dev_logo from "../../../src/assets/dev_icon.png";
import admin_logo from "../../../src/assets/administrator_icon.png";
import moderator_logo from "../../../src/assets/moderator_icon.png";
import verified_logo from "../../../src/assets/verified_icon.png";
const badges = {
    user: {
        icon: "👤",
        text: "First User",
        color: "#ffc414"
    },
    founder: {
        icon: founder_logo,
        text: "Founder",
        color: "#ffb800"
    },

    developer: {
        icon: dev_logo,
        text: "Developer",
        color: "#00d4ff"
    },

    admin: {
        icon: admin_logo,   
        text: "Administrator",
        color: "#ff5050"
    },

    verified: {
        icon:  verified_logo,
        text: "Verified",
        color: "#6cff47"
    },

    moderator: {
        icon: moderator_logo,
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

                        {badge.icon.endsWith?.(".png") ? (
                            <img
                                src={badge.icon}
                                alt={badge.text}
                                className="badge-icon"
                            />
                        ) : (
                            <span className="badge-emoji">
                                {badge.icon}
                            </span>
                        )}

                        {badge.text}

                    </div>

                );

            })}

        </div>

    );

}

export default ProfileBadges;