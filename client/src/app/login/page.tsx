"use client";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validateField(name: string, value: string) {
    switch (name) {
      case "email":
        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ? "" : "Enter a valid email.";
      case "password":
        return value.length >= 6 ? "" : "Password must be at least 6 characters.";
      default:
        return "";
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = {
      email: validateField("email", form.email),
      password: validateField("password", form.password),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
      setForm({ email: "", password: "" });
    }, 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-900 dark:from-[#18122B] dark:via-[#44318D] dark:to-[#6D28D9] relative overflow-hidden">
      {/* Abstract background shape */}
      <div className="pointer-events-none select-none absolute -top-32 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] max-w-4xl max-h-96 bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700 opacity-30 rounded-full blur-3xl z-0" />
      <form
        className="relative z-10 w-full max-w-md mx-auto bg-white/80 dark:bg-slate-900/80 rounded-3xl shadow-2xl px-8 py-4 flex flex-col gap-6 backdrop-blur-xl border border-white/20 animate-fade-in"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-200 mb-2 text-center font-merriweather">Login</h2>
        <div className="flex flex-col gap-2">
          <label className="text-indigo-900 dark:text-indigo-200 font-semibold" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={`rounded-xl px-4 py-3 bg-black/40 border border-purple-400/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${errors.email ? 'ring-2 ring-red-400' : ''}`}
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            disabled={status === 'loading'}
            autoComplete="off"
          />
          {errors.email && <div className="text-red-400 text-sm mt-1">{errors.email}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-indigo-900 dark:text-indigo-200 font-semibold" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className={`rounded-xl px-4 py-3 bg-black/40 border border-purple-400/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${errors.password ? 'ring-2 ring-red-400' : ''}`}
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            disabled={status === 'loading'}
            autoComplete="off"
          />
          {errors.password && <div className="text-red-400 text-sm mt-1">{errors.password}</div>}
        </div>
        <button
          type="submit"
          className="mt-4 w-full py-3 rounded-full font-bold bg-black text-white shadow-xl ring-2 ring-black hover:ring-4 hover:scale-105 hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.37)] border border-white/20 backdrop-blur-xl transition-all duration-300 ease-in-out cursor-pointer text-lg tracking-widest"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
        {status === 'success' && <div className="text-green-500 text-center mt-2">Login successful!</div>}
      </form>
    </div>
  );
}
