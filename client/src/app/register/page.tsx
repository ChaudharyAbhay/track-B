"use client";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validateField(name: string, value: string) {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required.";
      case "email":
        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ? "" : "Enter a valid email.";
      case "password":
        return value.length >= 6 ? "" : "Password must be at least 6 characters.";
      case "confirmPassword":
        return value === form.password ? "" : "Passwords do not match.";
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
      name: validateField("name", form.name),
      email: validateField("email", form.email),
      password: validateField("password", form.password),
      confirmPassword: validateField("confirmPassword", form.confirmPassword),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
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
        <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-200 mb-2 text-center font-merriweather">Create Account</h2>
        <div className="flex flex-col gap-2">
          <label className="text-indigo-900 dark:text-indigo-200 font-semibold" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className={`rounded-xl px-4 py-3 bg-black/40 border border-purple-400/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${errors.name ? 'ring-2 ring-red-400' : ''}`}
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            disabled={status === 'loading'}
            autoComplete="off"
          />
          {errors.name && <div className="text-red-400 text-sm mt-1">{errors.name}</div>}
        </div>
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
        <div className="flex flex-col gap-2">
          <label className="text-indigo-900 dark:text-indigo-200 font-semibold" htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className={`rounded-xl px-4 py-3 bg-black/40 border border-purple-400/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${errors.confirmPassword ? 'ring-2 ring-red-400' : ''}`}
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            disabled={status === 'loading'}
            autoComplete="off"
          />
          {errors.confirmPassword && <div className="text-red-400 text-sm mt-1">{errors.confirmPassword}</div>}
        </div>
        <button
          type="submit"
          className="mt-4 w-full py-3 rounded-full font-bold bg-black text-white shadow-xl ring-2 ring-black hover:ring-4 hover:scale-105 hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.37)] border border-white/20 backdrop-blur-xl transition-all duration-300 ease-in-out cursor-pointer text-lg tracking-widest"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Registering...' : 'Register'}
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-700 dark:text-gray-300">Already a user? </span>
          <Link
            href="./login"
            className="text-indigo-700 dark:text-indigo-300 font-extrabold text-xl md:text-2xl hover:underline ml-1 transition-all duration-200"
          >
            LOGIN
          </Link>
        </div>
        {status === 'success' && <div className="text-green-500 text-center mt-2">Registration successful!</div>}
      </form>
    </div>
  );
} 