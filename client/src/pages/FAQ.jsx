import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What primary programming languages do you use?",
    answer: "I am highly proficient in JavaScript and the React.js ecosystem, paired with Tailwind CSS for modern Front-end development. I am also continuously learning Back-end technologies like Node.js and Express to build Full-stack applications."
  },
  {
    question: "Are you open for freelance projects?",
    answer: "Yes, absolutely! I am very open to discussing freelance opportunities, whether it's building a company profile, a landing page, or a custom web app. Feel free to reach out via the Contact section."
  },
  {
    question: "What is your typical workflow for building a website?",
    answer: "I usually start by discussing the client's needs, then I create a rough design (wireframe/UI) in Figma. Once approved, I move into the coding phase using React and Tailwind, followed by testing and deployment."
  },
  {
    question: "What do you do outside of programming?",
    answer: "Besides coding, I am passionate about videography and video editing. I often create digital content that blends visual aesthetics with editing techniques, which also helps improve my 'sense of design' when crafting UI/UX."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="faq" className="min-h-screen text-slate-900 pt-28 pb-32 px-6 flex items-center relative">
      <motion.div 
        className="mx-auto w-full max-w-3xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl font-bold md:text-5xl">
            F.A.Q<span className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">.</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base max-w-md mx-auto">
            Frequently Asked Questions
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div 
                variants={itemVariants}
                key={index} 
                className={`rounded-2xl border transition-all duration-300 ${
                  isActive ? 'bg-white border-blue-200 shadow-sm' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                } backdrop-blur-md overflow-hidden`}
              >
                <button
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-semibold text-slate-800">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDown className="text-blue-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-slate-600 leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}
