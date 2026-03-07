import { content } from "../Content";

const Services = () => {
  const { services } = content;
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
          {services.service_content.map((content, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={i * 200}
              className="min-w-[14rem] duration-300 cursor-pointer border-2 border-slate-200 rounded-xl text-center bg-bg_light_primary p-6 flex-1 group-hover:blur-sm 
              hover:!blur-none hover:shadow-lg hover:-translate-y-1 transition-all"
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
