import { User } from "lucide-react";
import ProfileBadges from "./ProfileBadges";
function ProfileCard({ profile }) {

    if (!profile) return null;

    return (
        <section className="profile-card">

            <div className="profile-avatar">

                {profile.avatar_url ? (
                    <img
                        src={profile.avatar_url}
                        alt={profile.username}
                    />
                ) : (
                    <User size={70} />
                )}

            </div>

            <div className="profile-info">

                <h1>{profile.username}</h1>

                <ProfileBadges roles={profile.roles} />

                <p>@{profile.username.toLowerCase()}</p>

                <p>
                    Member #{String(profile.member_id).padStart(6, "0")}
                </p>

                <p>
                    Level {profile.level}
                </p>

                <p>
                    XP {profile.xp.toLocaleString()}
                </p>

                <p>
                    {profile.bio || "No bio yet."}
                </p>

            </div>

        </section>
    );
}

export default ProfileCard;