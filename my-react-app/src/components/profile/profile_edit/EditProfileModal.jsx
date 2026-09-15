import { useState } from "react";
import { motion } from "framer-motion";

import { updateProfile } from "../../../services/profile";
import "./EditProfileModalStyle.css";
function EditProfileModal({ profile, setProfile, onClose }) {

    const [username, setUsername] = useState(profile.username);
    const [bio, setBio] = useState(profile.bio);

    async function handleSave() {

        try {

            const updatedProfile = await updateProfile(profile.id, {
                username,
                bio,
            });

            setProfile(updatedProfile);

            onClose();

        } catch (err) {

            console.error(err);

        }

    }

    return (

        <motion.div
            className="edit-profile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >

            <motion.div
                className="edit-profile-modal"
                initial={{ scale: .9 }}
                animate={{ scale: 1 }}
                exit={{ scale: .9 }}
            >

                <h2>Edit Profile</h2>

                <input
                    className="username-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />

                <textarea
                    className="bio-input"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Bio"
                />

                <div className="edit-buttons">

                    <button className="save-button" onClick={handleSave}>
                        Save
                    </button>

                    <button className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>

                </div>

            </motion.div>

        </motion.div>

    );

}

export default EditProfileModal;