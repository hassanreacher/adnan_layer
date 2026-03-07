// import content
import { content } from "../Content";
const Hero = () => {
  const { hero } = content;

  return (
    <section id="home" className="overflow-hidden">
      <div className="min-h-screen relative flex md:flex-row flex-col-reverse md:items-end justify-center items-center">
        <div
          data-aos="fade-left"
          data-aos-duration="1400"
          className="absolute h-full md:w-4/12 w-8/12 top-0 right-0 bg-primaryLinear bottom-0 -z-10 overflow-hidden"
        >
          {/* Desktop: rotated name behind image */}
          <h1 className="rotate-90 absolute top-[30%] right-0 text-[#EAF2FA] whitespace-nowrap hidden md:block">
            {hero.firstName}{" "}
            <span className="text-dark_primary">{hero.LastName}</span>
          </h1>
        </div>

        {/* first col */}
        <div className="pb-16 px-6 pt-5">
          {/* Mobile: prominent name */}
          <h1
            data-aos="fade-up"
            data-aos-duration="1000"
            className="lg:text-6xl text-4xl font-extrabold font-Playfair leading-tight md:hidden"
          >
            {hero.firstName}{" "}
            <span className="text-dark_primary">{hero.LastName}</span>
          </h1>
          <h2 data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200" className="mt-2">{hero.title}</h2>
          <br />
          <div className="flex justify-end" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
            <a href="#contact" className="btn hover:bg-dark_primary hover:text-white transition-all duration-300">{hero.btnText}</a>
          </div>
          <div className="flex flex-col gap-10 mt-10">
            {hero.hero_content.map((content, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={400 + i * 200}
                className={`flex items-center max-w-[20rem] w-full gap-5
            ${i === 1 && " flex-row-reverse text-right"}  `}
              >
                <h3>{content.count}</h3>
                <p>{content.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* sec col */}
        <div className="md:h-[37rem] h-96" data-aos="fade-up" data-aos-duration="1400">
          <img
            src={hero.image}
            alt="Adnan Orabi - Attorney at Law"
            className="h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
