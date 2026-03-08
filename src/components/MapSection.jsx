import { useContent } from "../context/ContentContext";
import { useLanguage } from "../context/LanguageContext";

const MapSection = () => {
    const { content: dbContent, loading } = useContent();
    const { t } = useLanguage();
    const mapData = dbContent?.map || {
        title: "Our Office",
        subtitle: "VISIT US FOR A CONSULTATION",
        mapUrl: "https://www.google.com/maps/embed?pb=!3m2!1sar!2slb!4v1772921111289!5m2!1sar!2slb!6m8!1m7!1sTEIVRZRTMx4Rzc8DukYiNw!2m2!1d34.43360987709278!2d35.83591870832389!3f183.62143297314998!4f6.659629086330426!5f0.7820865974627469"
    };

    return (
        <section className="bg-bg_light_primary" id="location">
            <div className="md:container px-5 py-14">
                <h2 className="title" data-aos="fade-up" data-aos-duration="800">
                    {mapData.title}
                </h2>
                <h4 className="subtitle" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
                    {mapData.subtitle}
                </h4>
                <br />
                <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="200"
                    className="rounded-2xl overflow-hidden shadow-lg border-2 border-slate-200 h-[450px]"
                >
                    {mapData.mapUrl ? (
                        <iframe
                            src={mapData.mapUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; geolocation"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={mapData.title}
                            className="w-full h-full"
                        ></iframe>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                            {t('mapNotSet')}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MapSection;
