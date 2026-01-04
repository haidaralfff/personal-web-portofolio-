import { motion } from "framer-motion";


const contacts = [
  {
    label: "Email",
    value: "haidarhabibi178@gmail.com",
    href: "mailto:youremail@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/haidaralfff",
    href: "https://github.com/haidaralfff",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/haidar-habibi",
    href: "https://www.linkedin.com/in/haidar-habibi-109a41372/",
  },
  {
    label: "Instagram",
    value: "@username",
    href: "https://instagram.com/username",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Contact() {
  return (
    <section className="min-h-screen bg-zinc-950 text-white pt-24 px-4 sm:px-6 flex items-center">
      <div className="mx-auto max-w-5xl w-full">
        {/* Header */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold"
          >
            Contact<span className="text-blue-500">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xs sm:text-sm text-zinc-400"
          >
            Let’s connect and build something meaningful
          </motion.p>
        </div>

        {/* Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* Left text */}
          <motion.div variants={item} className="text-center md:text-left">
            <h2 className="text-xl font-semibold">
              Ready to collaborate?
            </h2>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              I’m open to freelance work, collaborations, or just a friendly
              chat. If you have an idea or project in mind, don’t hesitate to
              reach out.
            </p>
          </motion.div>

          {/* Right links */}
          <motion.div
            variants={container}
            className="space-y-4"
          >
            {contacts.map(({ label, value, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                variants={item}
                whileHover={{ x: 6 }}
                className="
                  group block rounded-xl
                  border border-zinc-800
                  bg-zinc-900/60
                  px-6 py-4
                  transition-all
                  hover:border-blue-500
                "
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">{label}</span>
                  <span className="text-sm font-medium text-zinc-200 group-hover:text-white">
                    {value}
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <a
            href="mailto:youremail@gmail.com"
            className="
              inline-block rounded-full
              border border-zinc-700
              px-8 py-3
              text-sm font-medium
              hover:border-blue-500
              hover:text-blue-500
              transition
            "
          >
            Send me an email
          </a>
        </motion.div>
      </div>
    </section>

    
  );
}
