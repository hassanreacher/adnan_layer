// import content
import { createElement, useState } from "react";
import { content } from "../Content";
// import modal package
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "23rem",
    width: "90%",
    borderRadius: "1rem",
    border: "none",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
  overlay: {
    padding: "2rem",
    backgroundColor: "rgba(6, 34, 63, 0.6)",
    backdropFilter: "blur(4px)",
  },
};
Modal.setAppElement("#root");

const Skills = () => {
  const { skills } = content;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectSkill, setSelectSkill] = useState(null);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <section className="min-h-fit bg-bg_light_primary" id="skills">
      {/* modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="flex items-center gap-3">
          <img className="h-10" src={selectSkill?.logo} alt="..." />
          <h6 className="text-lg">{selectSkill?.name}</h6>
        </div>
        <br />
        <ul className="list-decimal px-4 font-Inter sm:text-sm text-xs !leading-7">
          <li>Thorough case analysis and legal research</li>
          <li>Strategic litigation planning and execution</li>
          <li>Client-centered approach with clear communication</li>
          <li>
            Experienced negotiation and settlement expertise
          </li>
          <li>
            Proven track record of successful outcomes in complex legal matters
          </li>
        </ul>
        <br />
        <div className="flex justify-end">
          <button onClick={closeModal} className="btn hover:bg-dark_primary hover:text-white transition-all duration-300">
            Close
          </button>
        </div>
      </Modal>

      {/* content */}
      <div className="md:container px-5 py-14">
        <h2 className="title" data-aos="fade-up" data-aos-duration="800">
          {skills.title}
        </h2>
        <h4 className="subtitle" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
          {skills.subtitle}
        </h4>
        <br />
        <div className="flex flex-wrap gap-4 justify-center">
          {skills.skills_content.map((skill, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={i * 150}
              className="bg-white sm:cursor-pointer 
               relative group w-full flex items-center
                gap-5 p-5 max-w-sm rounded-xl border-2 border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <img
                  src={skill.logo}
                  alt="..."
                  className="w-10 group-hover:scale-110 duration-300"
                />
              </div>
              <div>
                <h6>{skill.name}</h6>
                <p className="italic text-sm">{skill.para}</p>
                <div
                  onClick={() => {
                    setSelectSkill(skill);
                    openModal();
                  }}
                  className="text-xl absolute top-3 right-3 hover:scale-125 transition-transform duration-300"
                >
                  {createElement(skills.icon)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
