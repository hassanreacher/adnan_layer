// import content
import { content as staticContent } from "../Content";
import { useContent } from "../context/ContentContext";
import { useLanguage } from "../context/LanguageContext";

const Hero = () => {
  const { content: dbContent, loading } = useContent();
  const { t } = useLanguage();

  if (loading) {
    return (
      <section id="home" className="overflow-hidden">
        <div className="min-h-screen relative flex md:flex-row flex-col-reverse md:items-end justify-center items-center px-6">
          <div className="w-full md:w-1/2 flex flex-col gap-4 animate-pulse pt-20">
            <div className="h-16 md:h-24 bg-slate-200 rounded-2xl w-3/4"></div>
            <div className="h-8 bg-slate-200 rounded-lg w-1/2"></div>
            <div className="h-12 bg-slate-200 rounded-xl w-40 self-end mt-4"></div>
            <div className="flex flex-col gap-8 mt-10">
              <div className="h-20 bg-slate-200 rounded-xl w-64"></div>
              <div className="h-20 bg-slate-200 rounded-xl w-64 self-end"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-96 md:h-[37rem] bg-slate-200 animate-pulse rounded-2xl md:ml-10 mt-20 md:mt-0"></div>
        </div>
      </section>
    );
  }

  const hero = dbContent?.hero || staticContent.hero;

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
            <a href="#contact" className="btn hover:bg-dark_primary hover:text-white transition-all duration-300">{hero.btnText || t('consultNow')}</a>
          </div>
          <div className="flex flex-col gap-10 mt-10">
            {hero.hero_content?.map((content, i) => (
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
          {/* fallback for image in case DB hero data doesn't provide an image yet */}
          <img
            src={hero.image || staticContent.hero.image}
            alt="Adnan Orabi - Attorney at Law"
            className="h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
