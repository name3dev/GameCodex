import { useState } from "react";
import { login, register } from "../auth/auth";
import { useNavigate } from "react-router-dom";
function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();

        if (!isLogin) {
            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }
        }

        try {
            setLoading(true);

            if (isLogin) {
                await login(email, password);
                navigate("/");
            } else {
                await register(email, password, username);
                alert("Account created successfully!");
                setIsLogin(true);
            }

        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">

            <form className="auth-card" onSubmit={handleSubmit}>

                <h1>{isLogin ? "Sign In" : "Create Account"}</h1>

                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {!isLogin && (
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                )}

                <button type="submit" disabled={loading}>
                    {loading
                        ? "Loading..."
                        : isLogin
                            ? "Login"
                            : "Register"}
                </button>

                <p style={{ marginTop: 20 }}>

                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}

                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        style={{
                            marginLeft: 8,
                            background: "none",
                            border: "none",
                            color: "#4da3ff",
                            cursor: "pointer"
                        }}
                    >
                        {isLogin ? "Register" : "Login"}
                    </button>

                </p>

            </form>

        </div>
    );
}

export default Auth;