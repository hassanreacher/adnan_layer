import { createElement, useRef, useState } from "react";
import { content } from "../Content";

const Contact = () => {
  const { Contact } = content;
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Send to WhatsApp
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, date, message } = formData;
    const text = `*New Consultation Request*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Preferred Date:* ${encodeURIComponent(date)}%0A*Message:* ${encodeURIComponent(message)}`;
    const whatsappUrl = `https://wa.me/96103635086?text=${text}`;
    window.open(whatsappUrl, "_blank");
  };

  // Get tomorrow's date for min attribute
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <section className="bg-dark_primary text-white" id="contact">
      <div className="md:container px-5 py-14">
        <h2 className="title !text-white" data-aos="fade-up" data-aos-duration="800">
          {Contact.title}
        </h2>
        <h4 className="subtitle" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
          {Contact.subtitle}
        </h4>
        <br />
        <div className="flex gap-10 md:flex-row flex-col">
          <form
            ref={form}
            onSubmit={handleSubmit}
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
            className="flex-1 flex flex-col gap-4"
          >
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name *"
                required
                className="w-full border border-slate-500 p-3.5 rounded-lg text-white placeholder:text-slate-400 focus:border-white focus:ring-1 focus:ring-white transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                placeholder="Email Address *"
                required
                className="w-full border border-slate-500 p-3.5 rounded-lg text-white placeholder:text-slate-400 focus:border-white focus:ring-1 focus:ring-white transition-all duration-300"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number *"
                required
                className="w-full border border-slate-500 p-3.5 rounded-lg text-white placeholder:text-slate-400 focus:border-white focus:ring-1 focus:ring-white transition-all duration-300"
              />
            </div>

            {/* Date Picker */}
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={getTomorrow()}
                required
                className="w-full border border-slate-500 p-3.5 rounded-lg text-white placeholder:text-slate-400 focus:border-white focus:ring-1 focus:ring-white transition-all duration-300 [color-scheme:dark]"
              />
              <label className="absolute -top-2.5 left-3 px-1 text-xs text-slate-400 bg-dark_primary">
                Preferred Consultation Date *
              </label>
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your legal matter *"
                className="w-full border border-slate-500 p-3.5 rounded-lg h-36 text-white placeholder:text-slate-400 focus:border-white focus:ring-1 focus:ring-white transition-all duration-300 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn self-start bg-white !text-dark_primary hover:bg-dark_primary hover:!text-white hover:border-white transition-all duration-300 flex items-center gap-2 font-semibold"
            >
              Send via WhatsApp
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </button>
          </form>

          <div
            className="flex-1 flex flex-col gap-6 justify-center"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            {Contact.social_media.map((content, i) => (
              <a
                key={i}
                href={content.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-600 hover:border-white hover:bg-white/5 transition-all duration-300 group"
              >
                <span className="text-2xl text-white group-hover:scale-110 transition-transform duration-300">
                  {createElement(content.icon)}
                </span>
                <span className="font-Inter text-white/90 group-hover:text-white transition-colors duration-300">
                  {content.text}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
