import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import { Plus, Edit2, Trash2, Calendar, MapPin, Link as LinkIcon, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import EventForm from './EventForm';

const EventsAdmin = () => {
    const { t } = useLanguage();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;
            setEvents(data || []);
        } catch (error) {
            console.error('Error fetching events:', error);
            toast.error('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;

        try {
            const { error } = await supabase
                .from('events')
                .delete()
                .eq('id', id);

            if (error) throw error;
            toast.success('Event deleted successfully');
            fetchEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error('Failed to delete event');
        }
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setEditingEvent(null);
        fetchEvents();
    };

    if (loading) return <div className="p-8 text-slate-500 animate-pulse">{t('loading')}</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 font-Playfair">{t('eventsSection')}</h2>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm shadow-blue-500/20"
                >
                    <Plus size={18} />
                    {t('addEvent')}
                </button>
            </div>

            {events.length === 0 ? (
                <div className="text-center py-12 text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                    {t('noEvents')}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event.id} className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition group flex flex-col">
                            {event.image_url ? (
                                <img src={event.image_url} alt={event.title} className="w-full h-48 object-cover" />
                            ) : (
                                <div className="w-full h-48 bg-slate-200 flex items-center justify-center text-slate-400">
                                    No Image
                                </div>
                            )}
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-1">{event.title}</h3>

                                <div className="space-y-2 mb-4 mt-auto">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Calendar size={14} className="text-blue-500" />
                                        <span>{new Date(event.date).toLocaleDateString()}</span>
                                    </div>
                                    {event.location && (
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <MapPin size={14} className="text-red-400" />
                                            <span className="line-clamp-1">{event.location}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-auto">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => { setEditingEvent(event); setIsFormOpen(true); }}
                                            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                            title={t('editEvent')}
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event.id)}
                                            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                            title={t('deleteEvent')}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <button
                                        className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg transition"
                                        onClick={() => window.location.href = `/admin/events/${event.id}/registrations`}
                                    >
                                        <Users size={16} />
                                        {t('viewRegistrations')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isFormOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <EventForm
                            event={editingEvent}
                            onClose={handleFormClose}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventsAdmin;
