'use client';
import Navbar from "../components/Navbar";
import "./globals.css";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function Home() {
  // Contact form state and validation
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validateField(name: string, value: string) {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required.";
      case "email":
        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ? "" : "Enter a valid email.";
      case "message":
        return value.trim().length >= 10 ? "" : "Message must be at least 10 characters.";
      default:
        return "";
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = {
      name: validateField("name", form.name),
      email: validateField("email", form.email),
      message: validateField("message", form.message),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  }

  return (
    <ParallaxProvider>
      <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden">
        <Navbar />
        {/* Main Section with Parallax Background */}
        <section className="relative flex flex-col items-center justify-center w-full min-h-screen pt-32 pb-16 overflow-hidden">
          <Parallax speed={-5} className="absolute inset-0 w-full h-full -z-10">
            <img
              src="/backgrond1.jpg"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-100 to-amber-50 dark:from-[#18181b] dark:via-[#1e293b] dark:to-[#0f172a] opacity-60" />
          </Parallax>
          <h1
            className="font-merriweather text-6xl sm:text-8xl md:text-9xl lg:text-[8rem] xl:text-[10rem] font-extrabold animated-gradient drop-shadow-2xl text-center select-none tracking-tight text-white"
          >
            Peith
          </h1>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl font-inter font-medium text-white text-center max-w-2xl drop-shadow-lg fade-in">
            Train with the Mind of a Million Debaters
          </p>
        </section>

        {/* Background for About and Register section */}
        <section className="relative w-full flex flex-col items-center justify-center py-24 px-2 bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-900 dark:from-[#18122B] dark:via-[#44318D] dark:to-[#6D28D9] overflow-hidden">
          {/* Abstract shapes */}
          <div className="pointer-events-none select-none absolute -top-32 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] max-w-4xl max-h-96 bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700 opacity-30 rounded-full blur-3xl z-0" />
          {/* The about section */}
          <section id="about" className="relative w-full max-w-3xl mx-auto bg-white/80 dark:bg-slate-900/80 rounded-3xl shadow-xl p-10 my-10 flex flex-col items-center z-10">
            <h2 className="font-merriweather text-3xl sm:text-4xl font-bold text-indigo-900 dark:text-indigo-200 mb-4">About Peith</h2>
            <div className="font-inter text-lg text-gray-700 dark:text-gray-200 text-center space-y-6">
              <p>
                Peith is an AI-powered debate simulation platform designed to sharpen your argumentation skills through realistic, full-length mock debates.
              </p>
              <p>Built for both aspiring and seasoned debaters, Peith lets you:</p>
              <ul className="space-y-3 text-left max-w-xl mx-auto list-none">
                <li className="flex items-start gap-2"><span className="text-2xl">💬</span><span>Practice against intelligent AI opponents</span></li>
                <li className="flex items-start gap-2"><span className="text-2xl">⚔️</span><span>Face spontaneous POIs during speeches</span></li>
                <li className="flex items-start gap-2"><span className="text-2xl">📊</span><span>Receive adjudicator-style scoring and feedback</span></li>
                <li className="flex items-start gap-2"><span className="text-2xl">🧠</span><span>Strategize with instant case prep suggestions</span></li>
              </ul>
              <p>
                From motion to podium, Peith replicates the full debate experience — powered by cutting-edge AI, backed by real-world debate formats, and built to help you grow.
              </p>
            </div>
          </section>
          {/* Register Now Button  Suggestions needed on the colour scheme of button*/}
          <div className="w-full flex justify-center mt-10 z-10">
            <button
              className="px-8 py-3 rounded-full font-playfair text-lg font-bold bg-black text-white shadow-xl ring-2 ring-black hover:ring-4 hover:scale-105 hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.37)] border border-white/20 backdrop-blur-xl transition-all duration-300 ease-in-out cursor-pointer relative"
              style={{ letterSpacing: "0.04em" }}
            >
              <span className="relative z-10 uppercase tracking-widest font-extrabold drop-shadow-lg text-xl md:text-2xl">
                Register Now
              </span>
            </button>
          </div>
        </section>

        {/* Contact Us Section REDISIGN IT ITS FUCKING UGLY , Redisgned and just add it to working directory*/}
        {/* Contact Section */}
      <section id="contact" className="relative w-full z-10 bg-gradient-to-br from-black/90 via-blue-950/80 to-purple-950/90 py-32 flex flex-col items-center border-t border-purple-900 overflow-x-hidden">
        <h2 className="text-5xl font-bold text-blue-200 mb-14 drop-shadow-glow">Contact Us</h2>
        <div className="relative w-full max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Glassmorphic Card with Info */}
          <div className="relative bg-white/10 border border-purple-400/30 rounded-3xl shadow-2xl p-10 w-full md:w-1/2 text-white/90 text-lg flex flex-col items-start backdrop-blur-md animate-contact-float overflow-hidden">
            {/* Animated Gradient Border */}
            <div className="absolute -inset-1 rounded-3xl pointer-events-none animate-contact-border z-0" style={{background: 'linear-gradient(120deg, #a78bfa88, #6366f1aa, #818cf8aa, #a78bfa88)'}}></div>
            <div className="relative z-10 w-full flex flex-col gap-8">
              {/* Abhay Singh */}
              <div className="flex items-center gap-4 mb-2">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 shadow-lg animate-contact-icon">
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#fff"/><path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" fill="#fff"/></svg>
                </span>
                <div>
                  <div className="text-xl font-bold text-purple-200">Abhay Singh</div>
                </div>
              </div>
              {/* Shivam Gyan */}
              <div className="flex items-center gap-4 mb-2">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 via-blue-400 to-purple-700 shadow-lg animate-contact-icon">
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#fff"/><path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" fill="#fff"/></svg>
                </span>
                <div>
                  <div className="text-xl font-bold text-purple-200">Shivam Gyan</div>
                </div>
              </div>
              {/* Saranash Mishra */}
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-purple-700 shadow-lg animate-contact-icon">
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#fff"/><path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" fill="#fff"/></svg>
                </span>
                <div>
                  <div className="text-xl font-bold text-purple-200">Saranash Mishra</div>
                </div>
              </div>
            </div>
          </div>
          {/* Modern Contact Form (enabled, animated) */}
          <form
            className="relative bg-white/10 border border-purple-400/30 rounded-3xl shadow-2xl p-10 w-full md:w-1/2 flex flex-col gap-6 backdrop-blur-md animate-contact-float overflow-hidden"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="absolute -inset-1 rounded-3xl pointer-events-none animate-contact-border z-0" style={{background: 'linear-gradient(120deg, #a78bfa88, #6366f1aa, #818cf8aa, #a78bfa88)'}}></div>
            <div className="relative z-10">
              <div className="mb-4">
                <label className="block text-purple-200 font-semibold mb-2" htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`w-full rounded-xl px-4 py-3 bg-black/40 border border-purple-400/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${errors.name ? 'ring-2 ring-red-400' : ''}`}
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  autoComplete="off"
                />
                {errors.name && (
                  <motion.div
                    className="text-red-400 text-sm mt-1"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    {errors.name}
                  </motion.div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-purple-200 font-semibold mb-2" htmlFor="email">Your Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`w-full rounded-xl px-4 py-3 bg-black/40 border border-purple-400/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${errors.email ? 'ring-2 ring-red-400' : ''}`}
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  autoComplete="off"
                />
                {errors.email && (
                  <motion.div
                    className="text-red-400 text-sm mt-1"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    {errors.email}
                  </motion.div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-purple-200 font-semibold mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className={`w-full rounded-xl px-4 py-3 bg-black/40 border border-purple-400/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none ${errors.message ? 'ring-2 ring-red-400' : ''}`}
                  rows={4}
                  placeholder="Type your message..."
                  value={form.message}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  autoComplete="off"
                />
                {errors.message && (
                  <motion.div
                    className="text-red-400 text-sm mt-1"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    {errors.message}
                  </motion.div>
                )}
              </div>
              <motion.button
                type="submit"
                className={`w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-purple-400 via-blue-400 to-purple-700 text-white font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden
                  ${status === 'loading' ? 'opacity-70 cursor-wait' : ''}
                  ${status === 'success' ? 'bg-gradient-to-r from-green-400 via-emerald-400 to-green-600 animate-glow' : ''}
                  ${status === 'error' ? 'bg-gradient-to-r from-red-400 via-pink-400 to-red-600 animate-glow' : ''}
                `}
                disabled={status === 'loading'}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: status === 'idle' ? 1.03 : 1 }}
              >
                {status === 'loading' && (
                  <motion.span
                    className="loader border-t-2 border-b-2 border-white rounded-full w-6 h-6 mr-2 inline-block animate-spin"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
                {status === 'success' ? (
                  <motion.span
                    className="flex items-center gap-2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                    Sent!
                  </motion.span>
                ) : status === 'error' ? (
                  <motion.span
                    className="flex items-center gap-2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    Failed
                  </motion.span>
                ) : (
                  <span>Send Message</span>
                )}
              </motion.button>
            </div>
          </form>
        </div>
        {/* Floating icons for extra beauty */}
        <span className="absolute left-12 top-16 animate-contact-float2 text-purple-400/60 text-5xl select-none pointer-events-none">✉️</span>
        <span className="absolute right-16 bottom-20 animate-contact-float2 text-blue-400/60 text-4xl select-none pointer-events-none">📞</span>
        <span className="absolute right-32 top-10 animate-contact-float2 text-purple-200/50 text-6xl select-none pointer-events-none">💬</span>
        <span className="absolute left-24 bottom-10 animate-contact-float2 text-blue-200/50 text-4xl select-none pointer-events-none">📧</span>
      </section>

      <style jsx global>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 16px #a78bfa) drop-shadow(0 0 32px #a78bfa44);
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 16px #a78bfa, 0 0 32px #a78bfa44; }
          50% { text-shadow: 0 0 32px #a78bfa, 0 0 64px #a78bfa88; }
        }
        .animate-glow {
          animation: glow 2.5s infinite alternate;
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 4s ease-in-out infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(18px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.2s infinite;
        }
        .neon-glow {
          text-shadow:
            0 0 24px #a78bfa,
            0 0 48px #6366f1,
            0 0 80px #818cf8;
          animation: neon-pulse 2.5s ease-in-out infinite alternate;
        }
        .drop-shadow-navbar-glow {
          text-shadow: 0 0 12px #a78bfa, 0 0 24px #6366f1;
        }
        @keyframes neon-pulse {
          0% {
            text-shadow:
              0 0 24px #a78bfa,
              0 0 48px #6366f1,
              0 0 80px #818cf8;
          }
          50% {
            text-shadow:
              0 0 40px #6366f1,
              0 0 80px #a78bfa,
              0 0 120px #818cf8;
          }
          100% {
            text-shadow:
              0 0 24px #a78bfa,
              0 0 48px #6366f1,
              0 0 80px #818cf8;
          }
        }
        .animate-navbar-glow {
          animation: neon-pulse 3s infinite alternate;
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.7) translateY(40px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-pop-in {
          animation: pop-in 0.4s cubic-bezier(0.4, 0.2, 0.2, 1.1);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 32s linear infinite;
        }
        .glow-company-name {
          text-shadow: 0 0 12px #a78bfa88, 0 0 24px #6366f144;
          letter-spacing: 0.18em;
        }
        @keyframes contact-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.04); }
        }
        .animate-contact-float {
          animation: contact-float 4s ease-in-out infinite;
        }
        @keyframes contact-float2 {
          0%, 100% { transform: translateY(0) scale(1) rotate(-6deg); }
          50% { transform: translateY(-18px) scale(1.08) rotate(6deg); }
        }
        .animate-contact-float2 {
          animation: contact-float2 6s ease-in-out infinite;
        }
        @keyframes contact-border {
          0% { filter: blur(8px) brightness(1.1); opacity: 0.7; }
          50% { filter: blur(12px) brightness(1.3); opacity: 1; }
          100% { filter: blur(8px) brightness(1.1); opacity: 0.7; }
        }
        .animate-contact-border {
          animation: contact-border 5s ease-in-out infinite;
        }
        .animate-contact-icon {
          animation: contact-float 3.2s ease-in-out infinite;
        }
        `}</style>
      </div>
    </ParallaxProvider>
  );
}
