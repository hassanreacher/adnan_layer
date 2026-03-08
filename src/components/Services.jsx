import { content as staticContent } from "../Content";
import { useContent } from "../context/ContentContext";

const Services = () => {
  const { content: dbContent, loading } = useContent();

  if (loading) {
    return (
      <section id="services">
        <div className="md:container px-5 py-14 animate-pulse">
          <div className="h-10 bg-slate-200 rounded-lg w-40 mx-auto md:mx-0 mb-4"></div>
          <div className="h-6 bg-slate-200 rounded-lg w-1/3 mx-auto md:mx-0 mb-10"></div>
          <div className="flex gap-5 justify-between flex-wrap">
            {[1, 2, 3].map(i => (
              <div key={i} className="min-w-[14rem] flex-1 h-64 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const services = dbContent?.services || staticContent.services;

  return (
    <section id="services">
      <div className="md:container px-5 py-14">
        <h2 className="title" data-aos="fade-up" data-aos-duration="800">
          {services.title}
        </h2>
        <h4 className="subtitle" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
          {services.subtitle}
        </h4>
        <br />
        <div className="flex gap-5 justify-between flex-wrap group">
          {services.service_content?.map((content, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={i * 200}
              className="min-w-[14rem] duration-300 cursor-pointer border-2 border-slate-200 rounded-xl text-center bg-bg_light_primary p-6 flex-1 
              hover:shadow-xl hover:-translate-y-2 hover:border-blue-400 transition-all"
            >
              <img src={content.logo} alt="..." className="mx-auto" />
              <h6 className="my-3">{content.title}</h6>
              <p className="leading-7">{content.para}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
