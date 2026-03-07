import { useState, useEffect } from "react";
import { content } from "../Content";
import { createElement } from "react";

const Navbar = () => {
  const { nav } = content;
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
