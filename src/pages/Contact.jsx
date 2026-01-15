import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Instagram } from "lucide-react"

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
    value: "@username",
    href: "https://instagram.com/username",
    icon: Instagram,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
}

export default function Contact() {
  return (
    <section className="min-h-screen bg-zinc-950 text-white pt-24 pb-32 px-4 flex items-center">
      <div className="mx-auto w-full max-w-xl"> {/*di perkecil */}

        {/* Header */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            Contact<span className="text-blue-500">.</span>
          </motion.h1>

          <p className="mt-3 text-sm text-zinc-400">
            Let’s connect and build something meaningful
          </p>
        </div>

        {/* Card */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-12"
        >
          <motion.div
            variants={item}
            className="
              rounded-xl
              border border-zinc-800
              bg-zinc-900/60
              p-5
            "
          >
            <h2 className="text-base font-semibold mb-4">
              Get in touch
            </h2>

            {/* Contact List */}
            <div className="space-y-3">
              {contacts.map(({ label, value, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  variants={item}
                  whileHover={{ x: 4 }}
                  className="
                    flex items-center justify-between
                    rounded-lg
                    border border-zinc-800
                    bg-zinc-900/70
                    px-4 py-3
                    hover:border-blue-500
                    transition
                  "
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-zinc-400" />
                    <span className="text-xs text-zinc-400">
                      {label}
                    </span>
                  </div>

                  <span className="text-xs font-medium text-zinc-200">
                    {value}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-zinc-800" />

            {/* CTA */}
            <motion.a
              href="mailto:haidarhabibi178@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="
                flex items-center justify-center gap-2
                rounded-lg
                bg-blue-600
                px-5 py-2.5
                text-sm font-semibold
                hover:bg-blue-500
                transition
              "
            >
              <Mail size={16} />
              Send me an email
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
