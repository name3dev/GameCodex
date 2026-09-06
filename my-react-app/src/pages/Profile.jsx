import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfileByUsername, updateProfile } from "../services/profile";
import { getUser } from "../auth/auth";
import { motion, AnimatePresence } from "framer-motion";
import ProfileBanner from "../components/profile/ProfileBanner";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileStats from "../components/profile/ProfileStats";
import FavoriteGames from "../components/profile/FavoriteGames";
import AchievementList from "../components/profile/AchievementList";
import ActivityTimeline from "../components/profile/ActivityTimeline";
import EditProfileModal from "../components/profile/profile_edit/EditProfileModal";

import "../components/profile/Profile.css";

function Profile() {

    const { username } = useParams();

    const [profile, setProfile] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {

        async function loadEverything() {

            try {

                const user = await getUser();
                setCurrentUser(user);

                const data = await getProfileByUsername(username);
                setProfile(data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        }

        loadEverything();

    }, [username]);

    if (loading) {
        return <div className="loading-screen">
            <img src="../../../src/assets/dev_icon.png" alt="GameCodex Logo" className="loading-logo" />
            <p className="loading-text">Loading...</p>
        </div>;
    }

    if (!profile) {
        return <h2>Profile not found</h2>;
    }

    const isOwner = currentUser?.id === profile.id;

    return (

        <div className="profile-page">

            <ProfileBanner profile={profile} />

            <ProfileCard profile={profile} />

            <ProfileStats profile={profile} />

            <FavoriteGames profile={profile} />

            <AchievementList profile={profile} />

            <ActivityTimeline profile={profile} />
            {isOwner && (

                <button
                    className="edit-profile-btn"
                    onClick={() => setIsEditing(true)}
                >
                    Edit Profile
                </button>

            )}

            <AnimatePresence>

                {isEditing && (

                    <EditProfileModal
                        profile={profile}
                        onClose={() => setIsEditing(false)}
                        setProfile={setProfile}
                    />

                )}

            </AnimatePresence>
        </div>

    );

}

export default Profile;