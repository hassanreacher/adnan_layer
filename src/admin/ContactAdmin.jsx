import { useState, useEffect } from 'react';
import { useAdminData } from '../hooks/useAdminData';
import { useLanguage } from '../context/LanguageContext';
import { GrMail } from 'react-icons/gr';
import { MdCall } from 'react-icons/md';
import { BsWhatsapp } from 'react-icons/bs';

const ContactAdmin = () => {
    const { data, loading, saveData } = useAdminData('contact');
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        email: '',
        phone: '',
        whatsapp: '',
    });

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title || '',
                subtitle: data.subtitle || '',
                email: data.social_media?.[0]?.text || '',
                phone: data.social_media?.[1]?.text || '',
                whatsapp: data.social_media?.[2]?.link?.replace('https://wa.me/', '') || '',
            });
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveData({
            title: formData.title,
            subtitle: formData.subtitle,
            social_media: [
                {
                    text: formData.email,
                    icon: 'GrMail', // Storing string representation, mapping back in frontend
                    link: `mailto:${formData.email}`,
                },
                {
                    text: formData.phone,
                    icon: 'MdCall',
                    link: `tel:${formData.phone.replace(/\s+/g, '')}`,
                },
                {
                    text: 'WhatsApp',
                    icon: 'BsWhatsapp',
                    link: `https://wa.me/${formData.whatsapp.replace(/\s+/g, '').replace('+', '')}`,
                },
            ]
        });
    };

    if (loading) return <div>{t('loading')}</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-8 text-slate-800 font-Playfair">{t('contactInfoData')}</h2>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('title')}</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            value={formData.title}
                            placeholder="e.g. Contact Me"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('subtitle')}</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            value={formData.subtitle}
                            placeholder="e.g. GET IN TOUCH"
                            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        />
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-8 mt-8">
                    <h3 className="text-lg font-medium text-slate-800 mb-6 font-Playfair">{t('contactMethods')}</h3>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div className="p-3 bg-white rounded-lg shadow-sm text-blue-600">
                                <GrMail size={24} />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={formData.email}
                                    placeholder="e.g. adnan.orabi@gmail.com"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div className="p-3 bg-white rounded-lg shadow-sm text-blue-600">
                                <MdCall size={24} />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={formData.phone}
                                    placeholder="e.g. +961 03 635 086"
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div className="p-3 bg-white rounded-lg shadow-sm text-green-600">
                                <BsWhatsapp size={24} />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t('whatsappNum')}</label>
                                <p className="text-xs text-slate-500 mb-2">{t('includeCountryCode')}</p>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={formData.whatsapp}
                                    placeholder="e.g. 96103635086"
                                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 mt-8">
                    <button
                        type="submit"
                        className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
                    >
                        {t('saveContactData')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactAdmin;
