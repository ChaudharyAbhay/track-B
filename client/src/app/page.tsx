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
        {/* Hero Section with Parallax Background */}
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

        {/* Cool background for About and Register section */}
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

        {/* Contact Us Section (Redesigned) */}
        <section className="relative w-full flex flex-col items-center justify-center py-24 px-2 bg-gradient-to-br from-[#18122B] via-[#44318D] to-[#6D28D9] overflow-hidden">
          {/* Animated background shape */}
          <motion.div className="pointer-events-none select-none absolute -top-40 left-1/2 -translate-x-1/2 w-[90vw] h-[40vw] max-w-5xl max-h-[400px] bg-gradient-to-r from-pink-500 via-violet-500 to-indigo-500 opacity-20 rounded-full blur-3xl z-0" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div
            className="relative w-full max-w-2xl mx-auto rounded-3xl shadow-2xl p-1 z-10 bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-700 animate-border-glow"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="bg-white/10 dark:bg-white/5 rounded-3xl p-10 flex flex-col items-center backdrop-blur-xl border border-violet-400/30">
              <motion.h2
                className="font-merriweather text-4xl sm:text-5xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-indigo-400 bg-clip-text text-transparent mb-10 text-center drop-shadow-lg tracking-tight"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Contact Us
              </motion.h2>
              <form className="w-full max-w-lg mx-auto space-y-8" onSubmit={handleSubmit} autoComplete="off">
                <div className="flex flex-col sm:flex-row gap-8">
                  {/* Name Field with Floating Label */}
                  <div className="flex-1 relative group">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`peer px-6 py-4 rounded-xl bg-white/80 dark:bg-slate-900/80 text-lg text-gray-900 dark:text-white border-2 ${errors.name ? 'border-pink-400' : 'border-violet-300'} focus:border-pink-400 focus:ring-2 focus:ring-pink-300 outline-none transition-all w-full placeholder-transparent`}
                      placeholder="Your Name"
                      id="contact-name"
                    />
                    <label htmlFor="contact-name" className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none transition-all duration-200 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-pink-500 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-pink-500 bg-white/80 dark:bg-slate-900/80 px-1 rounded">
                      Your Name
                    </label>
                    {errors.name && <motion.span className="text-pink-500 text-sm mt-1 block" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.name}</motion.span>}
                  </div>
                  {/* Email Field with Floating Label */}
                  <div className="flex-1 relative group">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`peer px-6 py-4 rounded-xl bg-white/80 dark:bg-slate-900/80 text-lg text-gray-900 dark:text-white border-2 ${errors.email ? 'border-pink-400' : 'border-violet-300'} focus:border-pink-400 focus:ring-2 focus:ring-pink-300 outline-none transition-all w-full placeholder-transparent`}
                      placeholder="Your Email"
                      id="contact-email"
                    />
                    <label htmlFor="contact-email" className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none transition-all duration-200 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-pink-500 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-pink-500 bg-white/80 dark:bg-slate-900/80 px-1 rounded">
                      Your Email
                    </label>
                    {errors.email && <motion.span className="text-pink-500 text-sm mt-1 block" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.email}</motion.span>}
                  </div>
                </div>
                {/* Message Field with Floating Label */}
                <div className="relative group">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={`peer w-full px-6 py-4 rounded-xl bg-white/80 dark:bg-slate-900/80 text-lg text-gray-900 dark:text-white border-2 ${errors.message ? 'border-pink-400' : 'border-violet-300'} focus:border-pink-400 focus:ring-2 focus:ring-pink-300 outline-none transition-all resize-none placeholder-transparent`}
                    placeholder="Your Message"
                    id="contact-message"
                    rows={4}
                  />
                  <label htmlFor="contact-message" className="absolute left-6 top-6 text-gray-500 dark:text-gray-400 pointer-events-none transition-all duration-200 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-pink-500 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-pink-500 bg-white/80 dark:bg-slate-900/80 px-1 rounded">
                    Your Message
                  </label>
                  {errors.message && <motion.span className="text-pink-500 text-sm mt-1 block" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.message}</motion.span>}
                </div>
                <div className="w-full flex justify-center">
                  <motion.button
                    type="submit"
                    className={`px-10 py-4 rounded-full font-playfair text-lg font-bold bg-gradient-to-r from-pink-500 via-violet-500 to-indigo-500 text-white shadow-xl ring-2 ring-pink-300 hover:ring-4 hover:scale-105 hover:shadow-[0_4px_16px_0_rgba(236,72,153,0.37)] border border-white/20 backdrop-blur-xl transition-all duration-300 ease-in-out cursor-pointer uppercase tracking-widest flex items-center gap-2 ${status === 'loading' ? 'opacity-70 pointer-events-none' : ''}`}
                    whileTap={{ scale: 0.95 }}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <svg className="animate-spin w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                    ) : (
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' /></svg>
                    )}
                    {status === 'success' ? (
                      <span className="text-green-400">Message Sent!</span>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </section>
      </div>
    </ParallaxProvider>
  );
}
