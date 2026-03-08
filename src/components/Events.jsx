import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react';
import EventRegistrationModal from './EventRegistrationModal';

const Events = () => {
    const { t, language } = useLanguage();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [registeredEventIds, setRegisteredEventIds] = useState([]);
    const [now, setNow] = useState(new Date());

    // Load registered events from local storage
    useEffect(() => {
        const stored = localStorage.getItem('registered_events');
        if (stored) {
            try {
                setRegisteredEventIds(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse registered_events", e);
            }
        }
    }, []);

    // Update current time every second for countdowns
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .order('date', { ascending: false });

                if (error) throw error;
                setEvents(data || []);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return (
        <section id="events" className="min-h-[50vh] flex items-center justify-center">
            <div className="animate-pulse flex items-center gap-2 text-slate-400">
                <Calendar className="animate-bounce" />
                <span>{t('loading')}</span>
            </div>
        </section>
    );

    if (events.length === 0) return null; // Don't show section if no events

    return (
        <section id="events" className="py-20 bg-slate-50 font-sans" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="md:container px-5 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-dark_primary font-Playfair" data-aos="fade-down">
                        {t('eventsSection')}
                    </h2>
                    <br />
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" data-aos="fade-up"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event, i) => (
                        <div
                            key={event.id}
                            data-aos="fade-up"
                            data-aos-delay={i * 100}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group border border-slate-100"
                        >
                            {event.image_url ? (
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={event.image_url}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <h3 className="text-xl font-bold font-Playfair line-clamp-2">{event.title}</h3>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 bg-slate-900 text-white rounded-t-2xl">
                                    <h3 className="text-xl font-bold font-Playfair line-clamp-2">{event.title}</h3>
                                </div>
                            )}

                            <div className="p-6 flex-1 flex flex-col">
                                {event.description && (
                                    <p className="text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                                        {event.description}
                                    </p>
                                )}

                                <div className="space-y-3 mt-auto mb-6">
                                    <div className="flex items-center gap-3 text-sm text-slate-700">
                                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                            <Calendar size={16} />
                                        </div>
                                        <span className="font-medium">
                                            {new Date(event.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>

                                    {event.location && (
                                        <div className="flex items-center gap-3 text-sm text-slate-700">
                                            <div className="p-2 bg-red-50 rounded-lg text-red-500">
                                                <MapPin size={16} />
                                            </div>
                                            <span className="font-medium line-clamp-1">{event.location}</span>
                                        </div>
                                    )}

                                    {event.meeting_link && (
                                        <div className="flex items-center gap-3 text-sm text-slate-700">
                                            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                                <LinkIcon size={16} />
                                            </div>
                                            <a
                                                href={event.meeting_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-medium text-blue-600 hover:underline line-clamp-1"
                                            >
                                                {event.meeting_link}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {registeredEventIds.includes(event.id) ? (
                                    (() => {
                                        const eventTime = new Date(event.date);
                                        const diffMs = eventTime - now;

                                        if (diffMs <= 0) {
                                            return (
                                                <div className="w-full py-3 bg-emerald-100 text-emerald-700 rounded-xl font-medium text-center border border-emerald-200">
                                                    {t('eventStarted')}
                                                </div>
                                            );
                                        }

                                        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                                        const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
                                        const mins = Math.floor((diffMs / 1000 / 60) % 60);
                                        const secs = Math.floor((diffMs / 1000) % 60);

                                        return (
                                            <div className="w-full py-2 bg-slate-800 text-white rounded-xl shadow-inner font-mono flex items-center justify-center gap-3">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-lg font-bold text-blue-400">{days}</span>
                                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">{t('days')}</span>
                                                </div>
                                                <span className="text-slate-500 font-bold -mt-2">:</span>
                                                <div className="flex flex-col items-center">
                                                    <span className="text-lg font-bold text-blue-400">{hours.toString().padStart(2, '0')}</span>
                                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">{t('hours')}</span>
                                                </div>
                                                <span className="text-slate-500 font-bold -mt-2">:</span>
                                                <div className="flex flex-col items-center">
                                                    <span className="text-lg font-bold text-blue-400">{mins.toString().padStart(2, '0')}</span>
                                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">{t('minutes')}</span>
                                                </div>
                                                <span className="text-slate-500 font-bold -mt-2">:</span>
                                                <div className="flex flex-col items-center">
                                                    <span className="text-lg font-bold text-blue-400">{secs.toString().padStart(2, '0')}</span>
                                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">{t('seconds')}</span>
                                                </div>
                                            </div>
                                        );
                                    })()
                                ) : (
                                    <button
                                        onClick={() => setSelectedEvent(event)}
                                        className="w-full py-3 bg-dark_primary text-white rounded-xl font-medium hover:bg-slate-800 transition active:scale-[0.98]"
                                    >
                                        {t('registerForEvent')}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedEvent && (
                <EventRegistrationModal
                    isOpen={!!selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    event={selectedEvent}
                    onSuccess={() => {
                        const newRegistered = [...registeredEventIds, selectedEvent.id];
                        setRegisteredEventIds(newRegistered);
                        localStorage.setItem('registered_events', JSON.stringify(newRegistered));
                    }}
                />
            )}
        </section>
    );
};

export default Events;
