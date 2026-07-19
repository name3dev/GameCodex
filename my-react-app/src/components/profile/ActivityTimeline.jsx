function ActivityTimeline({ profile }) {

    if (!profile) return null;

    return (

        <section className="activity-timeline">

            <h2>Recent Activity</h2>

            {profile.history?.length ? (

                profile.history.map((activity, index) => (

                    <div key={index}>

                        {activity}

                    </div>

                ))

            ) : (

                <p>No activity yet.</p>

            )}

        </section>

    );

}

export default ActivityTimeline;