import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.from(".contact-header", {
        opacity: 0,
        y: -20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      })
      .from(".contact-left", {
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3")
      .from(".contact-item", {
        opacity: 0,
        x: -20,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4")
      .from(".contact-right", {
        opacity: 0,
        x: 30,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.6");
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    // Rate limiting (60 minutes) to prevent spam
    const lastSent = localStorage.getItem("lastEmailSent");
    if (lastSent) {
      const now = new Date().getTime();
      const diffInMinutes = (now - parseInt(lastSent)) / (1000 * 60);
      if (diffInMinutes < 60) {
        setStatus({ type: "error", message: `Please wait ${Math.ceil(60 - diffInMinutes)} minutes before sending another message.` });
        return;
      }
    }

    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    setIsSubmitting(true);
    try {
      // ⚠️ IMPORTANT: Replace these strings with your actual EmailJS credentials
      await emailjs.send(
        "YOUR_SERVICE_ID", // Example: "service_1234abc"
        "YOUR_TEMPLATE_ID", // Example: "template_xyz789"
        {
          from_name: form.name,
          to_name: "Haidar",
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "YOUR_PUBLIC_KEY" // Example: "public_key_abc123"
      );
      
      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
      localStorage.setItem("lastEmailSent", new Date().getTime().toString());
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={containerRef} className="min-h-screen bg-ivory-50 pt-28 pb-32 px-6 flex items-center relative">
      <div className="mx-auto w-full max-w-5xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="contact-header font-mono text-xs tracking-mega uppercase text-blue-400 mb-4">
            Contact
          </p>
          <h1 className="contact-header font-display text-5xl sm:text-6xl md:text-7xl font-normal text-ivory-800 leading-[0.95] tracking-tight">
            Get in Touch<span className="text-blue-500">.</span>
          </h1>
          <p className="contact-header mt-6 text-ivory-400 text-base max-w-md mx-auto">
            Have a project in mind, want to collaborate, or just say hello? Drop me a message!
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Social Links */}
          <div className="contact-left lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-ivory-200 bg-white/60 backdrop-blur-md p-6">
              <h2 className="font-display text-2xl font-normal text-ivory-800 mb-4">Get in touch</h2>
              <p className="text-ivory-400 text-sm mb-6 leading-relaxed">
                Connect with me on social platforms or send an email directly. I usually respond within 24 hours.
              </p>
              
              <div className="space-y-3">
                {contacts.map(({ label, value, href, icon: Icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 6 }}
                    className="contact-item flex items-center justify-between rounded-xl border border-ivory-200 bg-ivory-100/50 px-4 py-3 hover:border-blue-200 hover:bg-ivory-100 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-blue-500" />
                      <span className="text-sm font-medium text-ivory-700">{label}</span>
                    </div>
                    <span className="text-xs text-ivory-400 font-mono">{value}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-right lg:col-span-7">
            <div className="rounded-2xl border border-ivory-200 bg-white/60 backdrop-blur-xl p-6 md:p-8">
              <h2 className="font-display text-2xl font-normal text-ivory-800 mb-6">Send Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Alert Status */}
                {status.message && (
                  <div
                    className={`p-4 rounded-xl border backdrop-blur-md flex gap-3 ${
                      status.type === "success"
                        ? "bg-green-500/10 border-green-500/20 text-green-700"
                        : "bg-red-500/10 border-red-500/20 text-red-700"
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
                    <label className="block font-mono text-xs tracking-wider text-ivory-400 uppercase mb-2">
                      Name <span className="text-blue-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-ivory-100/50 border border-ivory-200 rounded-xl text-sm text-ivory-800 placeholder-ivory-300 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:bg-white/80 transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs tracking-wider text-ivory-400 uppercase mb-2">
                      Email <span className="text-blue-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 bg-ivory-100/50 border border-ivory-200 rounded-xl text-sm text-ivory-800 placeholder-ivory-300 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:bg-white/80 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block font-mono text-xs tracking-wider text-ivory-400 uppercase mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Feedback / Collaboration / Hello"
                    className="w-full px-4 py-3 bg-ivory-100/50 border border-ivory-200 rounded-xl text-sm text-ivory-800 placeholder-ivory-300 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:bg-white/80 transition-all duration-300"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono text-xs tracking-wider text-ivory-400 uppercase mb-2">
                    Message <span className="text-blue-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell me more about your thoughts..."
                    className="w-full px-4 py-3 bg-ivory-100/50 border border-ivory-200 rounded-xl text-sm text-ivory-800 placeholder-ivory-300 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:bg-white/80 transition-all duration-300 resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-3.5 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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
          </div>

        </div>
      </div>
    </section>
  );
}
