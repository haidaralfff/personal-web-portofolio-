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
    <section className="min-h-screen bg-ivory-50 pt-28 pb-32 px-6 flex items-center relative">
      <motion.div 
        className="mx-auto w-full max-w-3xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="font-mono text-xs tracking-mega uppercase text-blue-400 mb-4">
            FAQ
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal text-ivory-800 leading-[0.95] tracking-tight">
            F.A.Q<span className="text-blue-500">.</span>
          </h1>
          <p className="mt-6 text-ivory-400 text-base max-w-md mx-auto">
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
                  isActive ? 'bg-white/80 border-blue-200 shadow-sm' : 'bg-ivory-100 border-ivory-200 hover:bg-ivory-200/50'
                } backdrop-blur-md overflow-hidden`}
              >
                <button
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-semibold text-ivory-800">{faq.question}</span>
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
                      <div className="px-6 pb-6 text-ivory-500 leading-relaxed">
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
