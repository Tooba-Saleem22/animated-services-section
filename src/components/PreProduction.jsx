import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar, FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { id: 1, src: "/images/Project1.png" },
  { id: 2, src: "/images/project2.png" },
  { id: 3, src: "/images/project3.png" },
  { id: 4, src: "/images/project4.png" },
  { id: 5, src: "/images/project5.png" },
  { id: 6, src: "/images/project6.png" },
];

const cards = [
  {
    title: "Concept Development",
    description:
      "We transform initial ideas into clear concepts through research, planning, creative direction, and strategic thinking.",
  },
  {
    title: "Creative Planning",
    description:
      "Every successful project starts with a plan. We organize ideas, define objectives, and establish a clear direction.",
  },
  {
    title: "UI/UX Design",
    description:
      "We design intuitive, accessible, and engaging digital experiences focused on usability and visual consistency.",
  },
  {
    title: "Web Development",
    description:
      "We build responsive, modern websites with clean code, smooth interactions, and reliable performance.",
  },
  {
    title: "Visual Design",
    description:
      "We create cohesive visual experiences using thoughtful layouts, typography, imagery, and creative details.",
  },
  {
    title: "Final Review",
    description:
      "We review layouts, test responsiveness, refine details, and prepare the final experience for launch.",
  },
];

const PreProduction = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("services-theme") || "dark",
  );

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem("services-theme", nextTheme);
      return nextTheme;
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.innerWidth > 768 && titleRef.current) {
        gsap.to(titleRef.current, {
          y: window.innerHeight * 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=500",
            scrub: 2,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleHover = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      rotation: -1,
      x: 2,
      y: 2,
      duration: 0.3,
      ease: "power2.out",
    });

    const icon = card.querySelector(".icon");
    const title = card.querySelector("h2");

    if (icon) {
      gsap.to(icon, {
        rotation: "+=360",
        duration: 0.8,
        ease: "power2.out",
      });
    }

    if (title) {
      gsap.to(title, {
        color: "#f97316",
        duration: 0.2,
      });
    }
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      rotation: 0,
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    const icon = card.querySelector(".icon");
    const title = card.querySelector("h2");

    if (icon) {
      gsap.to(icon, {
        rotation: 0,
        duration: 0.5,
      });
    }

    if (title) {
      gsap.to(title, {
        color: isDark ? "#ffffff" : "#171717",
        duration: 0.2,
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen overflow-hidden px-4 py-8 transition-colors duration-500 sm:px-6 md:px-10 md:py-12 ${
        isDark ? "bg-black text-white" : "bg-[#F5F5F2] text-[#171717]"
      }`}
    >
      {/* Top bar and theme toggle */}
      <div className="mx-auto mb-6 flex max-w-[1600px] items-center justify-between">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.25em] ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Creative Studio
          </p>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          title={`Switch to ${isDark ? "light" : "dark"} theme`}
          className={`group flex items-center gap-3 rounded-full border px-4 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            isDark
              ? "border-white/20 bg-white/5 text-white hover:bg-white/10"
              : "border-black/10 bg-white text-gray-900 shadow-sm hover:bg-gray-100"
          }`}
        >
          {isDark ? (
            <FaSun className="text-orange-400 transition-transform duration-500 group-hover:rotate-45" />
          ) : (
            <FaMoon className="text-indigo-600 transition-transform duration-500 group-hover:-rotate-12" />
          )}

          <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>

      {/* Main services panel */}
      <div
        className={`services-panel relative mx-auto max-w-[1600px] overflow-hidden rounded-[30px] border p-5 transition-colors duration-500 sm:p-8 md:rounded-[50px] md:p-10 ${
          isDark ? "border-white/30 bg-black" : "border-black/15 bg-[#F5F5F2]"
        }`}
      >
        {/* Background grid lines */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className={`absolute inset-y-0 w-px bg-gradient-to-b ${
                isDark
                  ? "from-transparent via-white/20 to-transparent"
                  : "from-transparent via-black/10 to-transparent"
              }`}
              style={{ left: `${(index + 1) * 10}%` }}
            />
          ))}
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* Left content */}
          <div className="relative flex min-w-0 flex-col">
            <div ref={titleRef} className="relative z-10">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">
                Our Creative Process
              </p>

              <h1 className="font-syne text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                Pre-Production
              </h1>

              <p
                className={`mt-5 max-w-xl text-base font-light leading-8 transition-colors duration-500 md:text-lg ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Before the final experience comes to life, every great project
                begins with a clear vision. We shape ideas, plan details, and
                create a strong foundation for creative success.
              </p>

              <h2 className="mt-8 max-w-2xl font-syne text-2xl leading-snug sm:text-3xl md:text-4xl">
                <span className={isDark ? "text-gray-500" : "text-gray-400"}>
                  Great projects
                </span>{" "}
                start with thoughtful planning and a clear creative direction.
              </h2>
            </div>

            {/* Animated image slider */}
            <div className="relative mt-10 h-[260px] overflow-hidden rounded-2xl sm:h-[340px] lg:mt-auto lg:pt-10">
              <motion.div
                className="flex h-full gap-4"
                animate={{ x: ["0%", "-204%"] }}
                transition={{
                  duration: 24,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                {[...images, ...images].map((image, index) => (
                  <div
                    key={`${image.id}-${index}`}
                    className={`h-full w-[85%] flex-shrink-0 overflow-hidden rounded-2xl border sm:w-[75%] ${
                      isDark ? "border-white/10" : "border-black/10"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={`Creative project ${image.id}`}
                      className="h-full w-full object-cover"
                      loading={index > 1 ? "lazy" : "eager"}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right service cards */}
          <div className="relative z-10">
            {cards.map((card, index) => (
              <article
                key={card.title}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className={`service-card relative mb-3 rounded-2xl border p-4 transition-colors duration-500 sm:p-5 ${
                  isDark
                    ? "border-white/10 hover:border-orange-500/40"
                    : "border-black/10 hover:border-orange-500/50"
                }`}
              >
                <div className="relative z-10">
                  <div className="mb-3 flex items-center gap-4">
                    <FaStar className="icon flex-shrink-0 text-lg text-orange-500" />

                    <h2 className="font-syne text-lg font-semibold sm:text-xl">
                      {card.title}
                    </h2>
                  </div>

                  <p
                    className={`pl-8 text-sm font-light leading-7 transition-colors duration-500 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <p
        className={`mt-5 text-center text-xs ${
          isDark ? "text-gray-500" : "text-gray-400"
        }`}
      >
        Thoughtful ideas. Meaningful digital experiences.
      </p>
    </section>
  );
};

export default PreProduction;
