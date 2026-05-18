import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-6xl px-6 py-12">

        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* Branding */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Haidar<span className="text-blue-500">.</span>
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed">
              Building clean, modern, and interactive web experiences.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            <a
              href="https://github.com/haidaralfff"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-zinc-800 p-2 hover:text-white hover:border-blue-500 transition"
            >
              <Github size={18} />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-zinc-800 p-2 hover:text-white hover:border-blue-500 transition"
            >
              <Linkedin size={18} />
            </a>

            <a
              href="mailto:haidarhabibi178@gmail.com"
              className="rounded-lg border border-zinc-800 p-2 hover:text-white hover:border-blue-500 transition"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs text-zinc-500">
          © {new Date().getFullYear()} Haidar Habibi. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
