import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Cloud, ShoppingCart, Server, Globe, ChevronDown, Copy, Check, Download } from "lucide-react";
import { prdPrompts } from "../data/prdPrompts";

const iconMap = {
  Smartphone,
  Cloud,
  ShoppingCart,
  Server,
  Globe,
};

function PromptCard({ prompt }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const Icon = iconMap[prompt.icon];

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = prompt.prompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadMd = (e) => {
    e.stopPropagation();
    const blob = new Blob([prompt.prompt], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${prompt.title.replace(/[^a-zA-Z0-9]/g, "_")}_PRD.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-ivory-200 bg-white/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-blue-200">
      {/* Header — always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-6 text-left focus:outline-none"
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
          <Icon size={22} className="text-blue-500" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-normal text-ivory-800">
            {prompt.title}
          </h3>
          <p className="text-sm text-ivory-400 mt-0.5 truncate">
            {prompt.description}
          </p>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-ivory-400"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      {/* Expandable prompt body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6">
              {/* Action buttons */}
              <div className="flex justify-end gap-2 mb-3">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium bg-ivory-100 border border-ivory-200 text-ivory-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200"
                >
                  {copied ? (
                    <>
                      <Check size={14} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy Prompt
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownloadMd}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium bg-ivory-100 border border-ivory-200 text-ivory-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200"
                >
                  <Download size={14} />
                  Download .md
                </button>
              </div>

              {/* Prompt text */}
              <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-ivory-600 bg-ivory-50 border border-ivory-200 rounded-xl p-5 max-h-[400px] overflow-y-auto">
                {prompt.prompt}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Prompts() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-ivory-50 pt-24 pb-20 px-4 sm:px-6">
      <motion.div
        className="mx-auto max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Header */}
        <motion.p
          variants={itemVariants}
          className="font-mono text-xs tracking-mega uppercase text-blue-400 mb-4"
        >
          Prompts
        </motion.p>

        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal text-ivory-800 leading-[0.95] tracking-tight">
            PRD Templates
          </h2>
          <div className="w-12 h-[2px] bg-blue-500 mt-6" />
          <p className="mt-6 text-ivory-400 text-base max-w-lg">
            Ready-to-use prompts for generating Product Requirements Documents. Copy a template, fill in the brackets, and paste into ChatGPT or Claude.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div variants={itemVariants} className="space-y-4">
          {prdPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
