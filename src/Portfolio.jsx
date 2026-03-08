import Hero from "./components/Hero";
import Navbar from "./Layouts/Navbar";
import Skills from "./components/Skills";
import Service from "./components/Services";
import Events from "./components/Events";
import MapSection from "./components/MapSection";
import Contact from "./components/Contact";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Portfolio = () => {
    useEffect(() => {
        Aos.init({
            duration: 1000,
            offset: 80,
            easing: "ease-out-cubic",
            once: true,
        });
    }, []);
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <Hero />
            <Skills />
            <Service />
            <Events />
            <MapSection />
            <Contact />
            <footer className="p-6 text-center bg-dark_primary">
                <h6 className="mb-2 !text-white font-Playfair tracking-wide">ADNAN ORABI</h6>
                <p className="!text-gray text-sm">© All Rights Reserved 2026 | Attorney at Law</p>
            </footer>
        </div>
    );
};

export default Portfolio;
