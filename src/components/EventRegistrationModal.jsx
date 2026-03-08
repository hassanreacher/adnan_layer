import { useState } from 'react';
import Modal from 'react-modal';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import { X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const EventRegistrationModal = ({ isOpen, onClose, event, onSuccess }) => {
    const { t, language } = useLanguage();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        phone: '',
        is_attending: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('event_registrations')
                .insert([{
                    event_id: event.id,
                    name: formData.name,
                    age: formData.age ? parseInt(formData.age) : null,
                    email: formData.email,
                    phone: formData.phone,
                    is_attending: formData.is_attending
                }]);

            if (error) throw error;

            toast.success(language === 'ar' ? 'تم التسجيل بنجاح!' : 'Successfully registered!');
            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            console.error('Registration error:', error);
            toast.error(language === 'ar' ? 'فشل التسجيل. يرجى المحاولة مرة أخرى.' : 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="w-[90%] md:w-[600px] bg-white rounded-2xl shadow-xl outline-none max-h-[90vh] overflow-y-auto"
            overlayClassName="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
        >
            <div className="flex flex-col h-full" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 font-Playfair mb-1">
                            {t('registerForEvent')}
                        </h2>
                        <p className="text-blue-600 font-medium text-sm">{event?.title}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('fullName')}</label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('emailAddress')}</label>
                            <input
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('phoneNumber')}</label>
                            <input
                                required
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('age')}</label>
                        <input
                            required
                            type="number"
                            min="1"
                            max="120"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="pt-2">
                        <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                            <input
                                type="checkbox"
                                required
                                checked={formData.is_attending}
                                onChange={(e) => setFormData({ ...formData, is_attending: e.target.checked })}
                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="font-medium text-slate-700">{t('confirmAttendance')}</span>
                        </label>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={loading || !formData.is_attending}
                            className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                        >
                            {loading && <Loader2 size={18} className="animate-spin" />}
                            {t('submitRegistration')}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default EventRegistrationModal;
