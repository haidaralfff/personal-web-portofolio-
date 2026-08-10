import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-ivory-200 dark:border-ivory-700 bg-ivory-50 dark:bg-ivory-900 text-ivory-400 dark:text-ivory-500 transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-6 py-12">

        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* Branding */}
          <div>
            <h3 className="font-display text-lg font-normal text-ivory-800 dark:text-ivory-100 transition-colors duration-500">
              Haidar<span className="text-blue-500">.</span>
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed">
             Informatics Student at Universitas Putra Bangsa
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            <a
              href="https://github.com/haidaralfff"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-ivory-200 dark:border-ivory-700 bg-white/60 dark:bg-ivory-800/60 p-2 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition"
            >
              <Github size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/haidar-habibi-109a41372/"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-ivory-200 dark:border-ivory-700 bg-white/60 dark:bg-ivory-800/60 p-2 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition"
            >
              <Linkedin size={18} />
            </a>

            <a
              href="mailto:haidarhabibi178@gmail.com"
              className="rounded-lg border border-ivory-200 dark:border-ivory-700 bg-white/60 dark:bg-ivory-800/60 p-2 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs text-ivory-300 dark:text-ivory-600">
          © {new Date().getFullYear()} Haidar Habibi Al Farisi.
        </div>

      </div>
    </footer>
  );
}
