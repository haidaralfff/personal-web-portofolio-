import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { messageService } from "../services/api";

const contacts = [
  {
    label: "Email",
    value: "haidarhabibi178@gmail.com",
    href: "mailto:haidarhabibi178@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/haidaralfff",
    href: "https://github.com/haidaralfff",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/haidar-habibi",
    href: "https://www.linkedin.com/in/haidar-habibi-109a41372/",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    value: "@dryoshen",
    href: "https://www.instagram.com/dryoshen/",
    icon: Instagram,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    setIsSubmitting(true);
    try {
      await messageService.create(form.name, form.email, form.subject, form.message);
      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-zinc-950 text-white pt-28 pb-32 px-6 flex items-center">
      <div className="mx-auto w-full max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold md:text-5xl"
          >
            Contact<span className="text-blue-500">.</span>
          </motion.h1>
          <p className="mt-4 text-zinc-400 text-base max-w-md mx-auto">
            Have a project in mind, want to collaborate, or just say hello? Drop me a message!
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Social Links */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-5 space-y-6"
          >
            <motion.div variants={item} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
              <h2 className="text-xl font-bold mb-4 text-white">Get in touch</h2>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                Connect with me on social platforms or send an email directly. I usually respond within 24 hours.
              </p>
              
              <div className="space-y-3">
                {contacts.map(({ label, value, href, icon: Icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    variants={item}
                    whileHover={{ x: 6 }}
                    className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 hover:border-blue-500 hover:bg-zinc-900/80 transition duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-blue-400" />
                      <span className="text-sm font-medium text-zinc-300">{label}</span>
                    </div>
                    <span className="text-xs text-zinc-400 font-mono">{value}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6 text-white">Send Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Alert Status */}
                {status.message && (
                  <div
                    className={`p-4 rounded-lg border flex gap-3 ${
                      status.type === "success"
                        ? "bg-green-500/10 border-green-500/30 text-green-400"
                        : "bg-red-500/10 border-red-500/30 text-red-400"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm font-medium">{status.message}</p>
                  </div>
                )}

                {/* Name & Email Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Name <span className="text-blue-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Email <span className="text-blue-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Feedback / Collaboration / Hello"
                    className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition duration-300"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Message <span className="text-blue-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell me more about your thoughts..."
                    className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition duration-300 resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed transition duration-300 shadow-lg shadow-blue-500/20"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
