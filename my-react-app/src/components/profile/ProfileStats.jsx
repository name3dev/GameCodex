function ProfileStats({ profile }) {

    if (!profile) return null;

    return (
        <section className="profile-stats">

            <div>

                <h2>Games</h2>

                <span>{profile.games_count ?? 0}</span>

            </div>

            <div>

                <h2>Favorites</h2>

                <span>{profile.favorites?.length ?? 0}</span>

            </div>

            <div>

                <h2>Achievements</h2>

                <span>{profile.achievements?.length ?? 0}</span>

            </div>

            <div>

                <h2>Reviews</h2>

                <span>{profile.reviews_count ?? 0}</span>

            </div>

        </section>
    );
}

export default ProfileStats;