import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [localError, setLocalError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    if (!form.email || !form.password)
      return setLocalError("All fields are required");
    const result = await login(form.email, form.password);
    if (result.ok) {
      navigate("/dashboard");
    } else {
      setLocalError(result.msg);
    }
  };

  const error = localError;

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row border border-[#E8EAED]">
        {/* Left — form */}
        <div className="flex-1 p-8 lg:p-12">
          <div className="text-2xl font-extrabold text-[#111827] tracking-tight mb-8">
            done<span className="text-[#059669]">.</span>
          </div>

          <h1 className="font-serif italic text-3xl text-[#111827] leading-tight mb-1">
            Good to see <em className="text-[#059669]">you again.</em>
          </h1>
          <p className="text-sm text-[#9CA3AF] mb-8">
            Sign in and get back to what matters.
          </p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-5 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5 tracking-wide">
                Email address
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-[#F4F6F9] border-2 border-[#E8EAED] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#059669] focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5 tracking-wide">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-[#F4F6F9] border-2 border-[#E8EAED] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#059669] focus:bg-white transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#059669] hover:bg-[#047857] disabled:bg-[#6EE7B7] text-white font-bold py-3.5 rounded-xl text-sm transition mt-2"
            >
              {loading ? "Signing in..." : "Continue →"}
            </button>
          </form>

          <p className="text-center text-sm text-[#9CA3AF] mt-5">
            New here?{" "}
            <Link
              to="/register"
              className="text-[#059669] font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Right — image panel */}
        <div className="hidden lg:block w-72 shrink-0 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"
            alt="Productive workspace"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#059669]/60" />

          {/* Text on top of image */}
          <div className="absolute inset-0 flex flex-col justify-between p-8">
            <div />
            <div>
              <h2 className="font-serif italic text-3xl text-white leading-snug mb-3">
                Get things <em>done.</em>
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Manage your tasks, track your progress, and stay on top of
                everything that matters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
