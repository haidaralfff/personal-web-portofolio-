import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600">
      <div className="mx-auto max-w-6xl px-6 py-12">

        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* Branding */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Haidar<span className="text-blue-500">.</span>
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed">
              Frontend Developer | Informatics Student at Universitas Putra Bangsa
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            <a
              href="https://github.com/haidaralfff"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-200 bg-white p-2 hover:text-blue-600 hover:border-blue-300 transition"
            >
              <Github size={18} />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-200 bg-white p-2 hover:text-blue-600 hover:border-blue-300 transition"
            >
              <Linkedin size={18} />
            </a>

            <a
              href="mailto:haidarhabibi178@gmail.com"
              className="rounded-lg border border-slate-200 bg-white p-2 hover:text-blue-600 hover:border-blue-300 transition"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-400">
          © {new Date().getFullYear()} Haidar Habibi. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
