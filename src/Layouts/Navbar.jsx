import { useState, useEffect, createElement } from "react";
import { content } from "../Content";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const { nav } = content;
  const { language, toggleLanguage } = useLanguage();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sectionIds = nav.map((item) => item.link.replace("#", ""));

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActive(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [nav]);

  return (
    <div className="w-full flex justify-center">
      {/* Language Switcher Floating Top Button */}
      <button
        onClick={toggleLanguage}
        className="fixed top-5 right-5 md:top-8 md:right-8 z-[999] flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-dark_primary font-bold hover:bg-dark_primary hover:text-white transition-all duration-300 border border-slate-200"
      >
        {language === 'en' ? 'AR' : 'EN'}
      </button>

      <nav
        className="fixed bottom-10 z-[999] flex items-center gap-5 bg-slate-200/60 px-6 py-3 backdrop-blur-md rounded-full text-dark_primary duration-300"
      >
        {nav.map((item, i) => (
          <a
            key={i}
            href={item.link}
            onClick={() => setActive(i)}
            className={`text-xl p-2.5 rounded-full sm:cursor-pointer duration-300
     ${i === active ? "bg-dark_primary text-white" : ""} `}
          >
            {createElement(item.icon)}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
