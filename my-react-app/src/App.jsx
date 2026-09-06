import { useState, useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Gamepad2, User, X } from 'lucide-react';
import { getProfile, updateProfile } from "./services/profile";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import './App.css';
import Logo from './components/logo/logo.jsx';
import Home from './pages/Home';
import Arcade from './pages/Arcade';
import Explore from './pages/Explore';
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
const GAMES_DATABASE = [
  { name: 'Super Mario Bros', description: 'The legendary 8-bit platformer that saved the gaming industry in 1985.', link: '/arcade', genre: 'Platformer', category: 'Action' },
  { name: 'Doom (1993)', description: 'Revolutionary first-person shooter that defined the 3D action genre.', link: '/arcade', genre: 'FPS', category: 'Action' },
  { name: 'Pac-Man', description: 'Classic arcade game from 1980. Eat dots and avoid ghosts.', link: '/arcade', genre: 'Maze Chase', category: 'Casual' },
  { name: 'Tetris', description: 'The puzzle masterpiece created by Alexey Pajitnov in 1984.', link: '/explore', genre: 'Puzzle', category: 'Casual' },
  { name: 'RPG History', description: 'Deep dive into the roots of role-playing games from Ultima to Baldur\'s Gate.', link: '/explore' }
];

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
  const [searchQuery, setSearchQuery] = useState('');

  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    return<div className="loading-screen">
            <img src="../../../src/assets/dev_icon.png" alt="GameCodex Logo" className="loading-logo" />
            <p className="loading-text">Loading...</p>
          </div>;
  }

  if (!user) {
    return <Auth />;
  }


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

  const filteredResults = GAMES_DATABASE.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.genre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
            <motion.div
              className="search-modal"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="search-modal-header">
                <Search className="search-modal-icon" />
                <input
                  type="text"
                  placeholder="Search games, consoles, eras..."
                  className="search-modal-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button className="close-modal-btn" onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}>
                  <X size={18} />
                </button>
              </div>

              <div className="search-modal-results">
                {searchQuery ? (
                  filteredResults.length > 0 ? (
                    <div className="search-results-list">
                      {filteredResults.map((result, index) => (
                        <Link
                          to={result.link}
                          key={index}
                          className="search-result-item"
                          onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                        >
                          <div className="upper-search-item-case">
                            <div className="search-item-title">{result.name}</div>
                            <div className="upper-search-item-min-case">
                              {result.genre && (
                                <div className="search-item-genre-category">
                                  {result.genre}
                                </div>
                              )}

                              {result.category && (
                                <div className="search-item-genre-category">
                                  {result.category}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="search-item-desc">{result.description}</div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="search-no-results">No history found for "{searchQuery}"</div>
                  )
                ) : (
                  <div className="search-placeholder-text">Type something to search the retro archive...</div>
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

              <button className="dropdown-item">
                Favorite Games
              </button>

              <button className="dropdown-item">
                Achievements
              </button>

              <button className="dropdown-item">
                Timeline
              </button>

              <button className="dropdown-item">
                Settings
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
