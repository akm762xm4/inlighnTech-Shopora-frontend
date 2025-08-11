import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../api/serverApi";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const LoginPage = () => {
  const [loginUser] = useLoginUserMutation();
  const [registerUser] = useRegisterUserMutation();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { user } = useAuth();

  if (user) {
    navigate("/"); // Redirect to home if user is already logged in
  }

  // Shared fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register-specific
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
    setError("");
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const user = await loginUser({ email, password }).unwrap();
        login(user);
        navigate("/"); // Redirect to home after login
      } catch (err) {
        toast.error("Login failed! Please check your credentials.");
      }
    } else {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (!name || !email || !password) {
        setError("All fields are required");
        return;
      }

      try {
        const user = await registerUser({ name, email, password }).unwrap();
        login(user);
        navigate("/"); // Redirect to home after registration
      } catch (err) {
        toast.error("Registration failed! Try a different email.");
      }
    }
  };

  return (
    <div className="md:min-h-screen flex p-[8%]">
      {/* Left Panel - Login/Register Form */}
      <div className="w-full md:w-1/2 flex flex-col md:justify-center  md:px-10 px-6 md:py-12 py-8 bg-highlight/50 md:rounded-l-3xl rounded-3xl shadow-md">
        <div className="max-w-md mx-auto">
          <h2 className="md:text-3xl text-xl font-bold text-secondary mb-2">
            {isLogin ? "Hello, Welcome Back" : "Create Your Account"}
          </h2>
          <p className="md:text-base text-sm text-muted mb-6">
            {isLogin
              ? "Hey, welcome back to your special place"
              : "Join us and explore the best deals"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="md:text-base text-xs w-full px-4 py-2  border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-primary text-secondary"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="md:text-base text-xs w-full px-4 py-2  border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-primary text-secondary"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="md:text-base text-xs w-full px-4 py-2  border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-primary text-secondary"
            />

            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="md:text-base text-xs w-full px-4 py-2  border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-primary text-secondary"
              />
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="md:text-base text-xs w-full bg-accent text-secondary py-2 rounded-md hover:opacity-90 transition"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-muted text-center mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={toggleForm}
              className="text-accent font-medium hover:underline ml-1"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Panel - Illustration */}
      <div className="hidden md:block md:w-1/2 relative shadow-md rounded-r-3xl">
        <img
          src="/auth-illustration.webp"
          alt="Login Illustration"
          className="absolute inset-0 w-full h-full object-cover rounded-r-3xl"
        />
      </div>
    </div>
  );
};

export default LoginPage;
