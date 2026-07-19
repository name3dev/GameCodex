function FavoriteGames({ profile }) {

    if (!profile) return null;

    return (

        <section className="favorite-games">

            <h2>Favorite Games</h2>

            {profile.favorites?.length ? (

                profile.favorites.map((game) => (

                    <div key={game}>

                        {game}

                    </div>

                ))

            ) : (

                <p>No favorite games.</p>

            )}

        </section>

    );

}

export default FavoriteGames;