// import images
import Hero_person from "./assets/images/Hero/person.png";

import services_logo1 from "./assets/images/Services/logo1.png";
import services_logo2 from "./assets/images/Services/logo2.png";
import services_logo3 from "./assets/images/Services/logo3.png";

// import icons from react-icons
import { GrMail } from "react-icons/gr";
import { MdArrowForward, MdCall } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { TbSmartHome } from "react-icons/tb";
import { BiUser } from "react-icons/bi";
import { RiServiceLine } from "react-icons/ri";
import { MdOutlinePermContactCalendar, MdLocationOn } from "react-icons/md";
import { SlEvent } from "react-icons/sl";

export const content = {
  nav: [
    {
      link: "#home",
      icon: TbSmartHome,
    },
    {
      link: "#skills",
      icon: BiUser,
    },
    {
      link: "#services",
      icon: RiServiceLine,
    },
    {
      link: "#events",
      icon: SlEvent,
    },
    {
      link: "#location",
      icon: MdLocationOn,
    },
    {
      link: "#contact",
      icon: MdOutlinePermContactCalendar,
    },
  ],
  hero: {
    title: "Attorney at Law",
    firstName: "ADNAN",
    LastName: "ORABI",
    btnText: "Consult Now",
    image: Hero_person,
    hero_content: [
      {
        count: "15+",
        text: "Years of Experience in Legal Practice",
      },
      {
        count: "500+",
        text: "Cases Successfully Resolved",
      },
    ],
  },
  skills: {
    title: "Expertise",
    subtitle: "AREAS OF LEGAL EXPERTISE",
    skills_content: [
      {
        name: "Civil Law",
        para: "Comprehensive civil litigation & dispute resolution",
        logo: services_logo1,
      },
      {
        name: "Criminal Defense",
        para: "Strong defense strategies for criminal cases",
        logo: services_logo2,
      },
      {
        name: "Corporate Law",
        para: "Business formation, contracts & compliance",
        logo: services_logo3,
      },
      {
        name: "Family Law",
        para: "Divorce, custody & family dispute mediation",
        logo: services_logo1,
      },
      {
        name: "Real Estate Law",
        para: "Property transactions & real estate disputes",
        logo: services_logo2,
      },
      {
        name: "Labor Law",
        para: "Employment rights & workplace dispute resolution",
        logo: services_logo3,
      },
    ],
    icon: MdArrowForward,
  },
  services: {
    title: "Services",
    subtitle: "WHAT I OFFER",
    service_content: [
      {
        title: "Legal Consultation",
        para: "Professional legal advice tailored to your specific needs. I provide thorough analysis of your case and guide you through every step of the legal process with clarity and confidence.",
        logo: services_logo1,
      },
      {
        title: "Court Representation",
        para: "Dedicated courtroom advocacy with years of litigation experience. I fight relentlessly for my clients' rights and interests in all levels of courts and tribunals.",
        logo: services_logo2,
      },
      {
        title: "Contract Drafting & Review",
        para: "Meticulous drafting and review of all types of legal documents, contracts, and agreements. Ensuring your interests are protected with airtight legal language.",
        logo: services_logo3,
      },
    ],
  },
  Contact: {
    title: "Contact Me",
    subtitle: "GET IN TOUCH",
    social_media: [
      {
        text: "adnan.orabi@gmail.com",
        icon: GrMail,
        link: "mailto:adnan.orabi@gmail.com",
      },
      {
        text: "+961 03 635 086",
        icon: MdCall,
        link: "tel:+96103635086",
      },
      {
        text: "WhatsApp",
        icon: BsWhatsapp,
        link: "https://wa.me/96103635086",
      },
    ],
  },
  Footer: {
    text: "All © Copy Right Reserved 2026",
  },
};
