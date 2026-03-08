import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

const EventRegistrations = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const [event, setEvent] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventAndRegistrations = async () => {
            try {
                setLoading(true);

                // Fetch Event Details
                const { data: eventData, error: eventError } = await supabase
                    .from('events')
                    .select('title')
                    .eq('id', id)
                    .single();

                if (eventError) throw eventError;
                setEvent(eventData);

                // Fetch Registrations
                const { data: regData, error: regError } = await supabase
                    .from('event_registrations')
                    .select('*')
                    .eq('event_id', id)
                    .order('created_at', { ascending: false });

                if (regError) throw regError;
                setRegistrations(regData || []);

            } catch (error) {
                console.error('Error fetching registrations:', error);
                toast.error('Failed to load registrations');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchEventAndRegistrations();
    }, [id]);

    if (loading) return <div className="p-8 text-slate-500 animate-pulse">{t('loading')}</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/admin/events')}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
                    title={t('backToEvents')}
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 font-Playfair">{t('registrationsFor')}</h2>
                    <p className="text-blue-600 font-medium text-lg">{event?.title}</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 uppercase font-medium">
                        <tr>
                            <th className="px-6 py-4 rounded-tl-xl">{t('attendeeName')}</th>
                            <th className="px-6 py-4">{t('attendeeEmail')}</th>
                            <th className="px-6 py-4">{t('attendeePhone')}</th>
                            <th className="px-6 py-4">{t('attendeeAge')}</th>
                            <th className="px-6 py-4 rounded-tr-xl">{t('attendeeStatus')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {registrations.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic">
                                    {t('noRegistrations')}
                                </td>
                            </tr>
                        ) : (
                            registrations.map((reg) => (
                                <tr key={reg.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-800">{reg.name}</td>
                                    <td className="px-6 py-4">{reg.email}</td>
                                    <td className="px-6 py-4">{reg.phone || '-'}</td>
                                    <td className="px-6 py-4">{reg.age || '-'}</td>
                                    <td className="px-6 py-4">
                                        {reg.is_attending ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                                                <Check size={12} />
                                                {t('attending')}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                                <X size={12} />
                                                {t('notAttending')}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EventRegistrations;
