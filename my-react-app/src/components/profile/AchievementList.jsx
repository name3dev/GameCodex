function AchievementList({ profile }) {

    if (!profile) return null;

    return (

        <section className="achievement-list">

            <h2>Achievements</h2>

            {profile.achievements?.length ? (

                profile.achievements.map((achievement) => (

                    <div key={achievement}>

                        {achievement}

                    </div>

                ))

            ) : (

                <p>No achievements yet.</p>

            )}

        </section>

    );

}

export default AchievementList;