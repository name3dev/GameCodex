import { useState, useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, X } from 'lucide-react';
import { getProfile, updateProfile } from "./services/profile";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { DATABASE } from "./components/explore/GameCard";
import './App.css';
import Logo from './components/logo/logo.jsx';
import Home from './pages/Home';
import Arcade from './pages/Arcade';
import Explore from './pages/Explore';
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";


function XpProgressBar({ currentXp, targetXp, level }) {
  const percentage = Math.min(Math.max((currentXp / targetXp) * 100, 0), 100);
  return (
    <div className="xp-container">
      <div className="xp-text">
        <span className="xp-lvl">LVL {level}</span>
        <span className="xp-numbers">{currentXp}/{targetXp} XP</span>
      </div>
      <div className="xp-bar-bg">
        <motion.div
          className="xp-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function App() {

  const { user, loading, logout } = useAuth();

  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [profile, setProfile] = useState(null);
  const SEARCH_DATABASE = Object.entries(DATABASE).flatMap(
    ([genre, branches]) =>
      Object.entries(branches).flatMap(
        ([category, games]) =>
          games.map((game) => ({
            ...game,
            genre,
            category
          }))
      )
  );

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResults = SEARCH_DATABASE.filter((game) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return false;

    return [
      game.name,
      game.year,
      game.desc,
      game.genre,
      game.category
    ]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [eraIndex, setEraIndex] = useState(3);
  const navigate = useNavigate();

  const targetXp = level * 100;

  const stylesMap = ['era-8bit', 'era-16bit', 'era-3d', 'era-modern'];
  const currentClassName = stylesMap[eraIndex] || 'era-modern';


  useEffect(() => {

    if (!user) return;

    async function loadProfile() {

      try {

        console.log("USER ID:", user.id);

        const data = await getProfile(user.id);

        console.log("PROFILE:", data);

        if (!data) {
          console.log("Профиль не найден!");
          return;
        }

        setProfile(data);
        setXp(data.xp);
        setLevel(data.level);

      } catch (err) {

        console.error("LOAD PROFILE ERROR:", err);

      }

    }

    loadProfile();

  }, [user]);

  useEffect(() => {

    if (user && window.location.pathname === "/auth") {
      navigate("/");
    }

  }, [user]);


  if (loading) {
    return <div className="loading-screen">
      <img src="../../../src/assets/dev_icon.png" alt="GameCodex Logo" className="loading-logo" />
      <p className="loading-text">Loading...</p>
    </div>;
  }

  // if (!user) {
  //   return <Auth />;
  // }


  const handleGainXp = async (amount) => {

    if (!user) return;

    let newXp = xp + amount;
    let currentLevel = level;
    let currentTarget = currentLevel * 100;

    while (newXp >= currentTarget) {
      newXp -= currentTarget;
      currentLevel += 1;
      currentTarget = currentLevel * 100;
    }

    setXp(newXp);
    setLevel(currentLevel);

    try {
      console.log("Saving...", {
        xp: newXp,
        level: currentLevel,
      });

      await updateProfile(user.id, {
        xp: newXp,
        level: currentLevel,
      });

      setProfile(prev => ({
        ...prev,
        xp: newXp,
        level: currentLevel,
      }));

    } catch (err) {

      console.error("XP SAVE ERROR:", err);

    }

  };

  return (
    <div className={`container ${currentClassName}`}>
      <div className="crt-scanlines"></div>

      <header className="header">
        <Link to="/" className="logo-section" onClick={() => { handleGainXp(5); setIsProfileOpen(false); }}>
          <Logo />
          <span className="logo-text">GameCodex</span>
        </Link>

        <nav className="main-nav">
          <Link to="/" className="nav-link" onClick={() => { handleGainXp(5); setIsProfileOpen(false); }}>Timeline</Link>
          <Link to="/arcade" className="nav-link" onClick={() => { handleGainXp(10); setIsProfileOpen(false); }}>Arcade</Link>
          <Link to="/explore" className="nav-link" onClick={() => { handleGainXp(10); setIsProfileOpen(false); }}>Explore</Link>
        </nav>

        <div className="header-actions">
          <button className="search-btn" onClick={() => setIsSearchOpen(true)}>
            <Search className="icon-sm" />
            <span>Search...</span>
          </button>

          <div className="profile-section">
            <XpProgressBar
              currentXp={xp}
              targetXp={targetXp}
              level={level}
            />

            <div
              className="avatar-wrapper"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="avatar-inner">
                <User className="icon-sm" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isSearchOpen && (
          <div
            className="modal-overlay"
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
          >
            <motion.div
              className="search-modal"
              initial={{ opacity: 0, y: -40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="search-modal-header">
                <Search
                  className="search-modal-icon"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Search games, genres, categories..."
                  className="search-modal-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />

                <button
                  className="close-modal-btn"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="search-modal-results">

                {!searchQuery.trim() ? (
                  <div className="search-placeholder-text">
                    Search games, genres, categories or years...
                  </div>
                ) : filteredResults.length > 0 ? (

                  <div className="search-results-list">
                    {filteredResults.map((result) => (
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={`${result.genre}-${result.category}-${result.name}`}
                        className="search-result-item"
                      >
                        <div className="upper-search-item-case">

                          <div className="search-item-title">
                            {result.name}
                          </div>

                          <div className="upper-search-item-min-case">

                            <div className="search-item-genre-category">
                              {result.genre}
                            </div>

                            <div className="search-item-genre-category">
                              {result.category}
                            </div>

                            <div className="search-item-genre-category">
                              {result.year}
                            </div>

                          </div>
                        </div>

                        <div className="search-item-desc">
                          {result.desc}
                        </div>
                      </a>
                    ))}
                  </div>

                ) : (

                  <div className="search-no-results">
                    No results found for "{searchQuery}"
                  </div>

                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProfileOpen && (
          <div className="dropdown-overlay" onClick={() => setIsProfileOpen(false)}>
            <motion.div
              className="profile-dropdown"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              onClick={(e) => e.stopPropagation()}
            >

              <div className="profile-top">

                <div className="profile-avatar-large">
                  <User size={46} />
                </div>

                <h3>
                  {profile?.display_name || profile?.username}
                </h3>

                <span>
                  @{profile?.username}
                </span>

              </div>

              <div className="profile-level">

                <span>
                  Level {level}
                </span>

                <div className="dropdown-xp">

                  <div
                    className="dropdown-xp-fill"
                    style={{
                      width: `${(xp / targetXp) * 100}%`
                    }}
                  />

                </div>

                <small>
                  {xp} / {targetXp} XP
                </small>

              </div>

              <div className="dropdown-divider"></div>

              <button
                className="dropdown-item"
                onClick={() => {
                  navigate(`/profile/${profile.username}`);
                  setIsProfileOpen(false);
                }}
              >
                Profile
              </button>

              <div className="dropdown-divider"></div>

              <button
                className="dropdown-item logout"
                onClick={async () => {
                  await logout();
                  setIsProfileOpen(false);
                  navigate("/auth");
                }}
              >
                Logout
              </button>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home eraIndex={eraIndex} setEraIndex={setEraIndex} />} />
          <Route path="/arcade" element={<Arcade eraIndex={eraIndex} />} />
          <Route path="/explore" element={<Explore eraIndex={eraIndex} />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/profile/:username"
            element={<Profile />}
          />
        </Routes>
      </main>

      <footer className="footer">
        <p>© 2026 GameCodex. All rights reserved.</p>
        <p> Site deployed by name3dev, main programmer.</p>
      </footer>

    </div>
  );
}

export default App;
