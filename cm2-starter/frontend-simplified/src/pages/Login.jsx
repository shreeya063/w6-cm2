import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        // credentials: "include", // enable if your backend sets cookies
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const message = data?.message || "Login failed";
        throw new Error(message);
      }
      sessionStorage.setItem("user", JSON.stringify(data));
      setIsAuthenticated(true);

      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Log in</h1>
        <p>Login using email</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
