import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  {
    id: 1,
    src: "/photos/me.png",
    alt: "Haidar at tech event with colleagues",
    caption: "Panitia Codex-2 2026 Day-1",
  },
  {
    id: 2,
    src: "/photos/me2.png",
    alt: "Haidar candid shot",
    caption: "Panitia Codex-2 2026 Day-2",
  },
  {
    id: 3,
    src: "/photos/me3.png",
    alt: "Haidar portrait",
    caption: "Me in Real Life",
  },
];

export default function Photos() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".photo-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".photo-item", {
        scrollTrigger: {
          trigger: ".photo-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPhoto]);

  return (
    <section
      ref={containerRef}
      className="bg-ivory-50 dark:bg-ivory-900 pt-24 pb-20 px-4 sm:px-6 relative transition-colors duration-500"
    >
      <div className="mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="photo-header mb-16 md:mb-24">
          <p className="font-mono text-xs tracking-mega uppercase text-blue-400 mb-4">
            Gallery
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal text-ivory-800 dark:text-ivory-100 leading-[0.95] tracking-tight">
            Personal<span className="text-blue-500">.</span>
          </h1>
          <div className="w-12 h-[2px] bg-blue-500 mt-6" />
          <p className="mt-6 text-ivory-400 dark:text-ivory-500 text-base max-w-lg">
            A collection of portraits and moments that capture a little more of who I am.
          </p>
        </div>

        {/* Grid */}
        <div className="photo-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="photo-item cursor-pointer group relative rounded-2xl overflow-hidden border border-ivory-200 dark:border-ivory-700 bg-ivory-100 dark:bg-ivory-800 aspect-[4/5]"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ivory-900/80 via-ivory-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                <p className="text-ivory-50 font-mono text-sm tracking-wide">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute inset-0 bg-ivory-900/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 max-w-5xl w-full mx-4"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 p-2 text-ivory-400 hover:text-ivory-100 transition-colors"
              >
                <X size={24} />
              </button>
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
              <p className="text-center text-ivory-400 font-mono text-sm mt-4">
                {selectedPhoto.caption}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
