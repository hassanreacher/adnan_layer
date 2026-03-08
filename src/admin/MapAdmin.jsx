import { useState, useEffect } from 'react';
import { useAdminData } from '../hooks/useAdminData';
import { useLanguage } from '../context/LanguageContext';

const MapAdmin = () => {
    const { data, loading, saveData } = useAdminData('map');
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        mapUrl: '', // To store the Google Maps embed URL
    });

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title || '',
                subtitle: data.subtitle || '',
                mapUrl: data.mapUrl || '',
            });
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveData(formData);
    };

    if (loading) return <div>{t('loading')}</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-8 text-slate-800 font-Playfair">{t('mapLocationData')}</h2>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('title')}</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            value={formData.title}
                            placeholder="e.g. Our Office"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('subtitle')}</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            value={formData.subtitle}
                            placeholder="e.g. VISIT US FOR A CONSULTATION"
                            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('googleMapsEmbed')}</label>
                        <p className="text-xs text-slate-500 mb-2">
                            {t('mapHelperText')}
                        </p>
                        <textarea
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm"
                            rows="4"
                            value={formData.mapUrl}
                            placeholder="<iframe src='https://www.google.com/maps/embed?pb=...'..."
                            onChange={(e) => {
                                let val = e.target.value;
                                // Auto-extract src if they paste the full iframe HTML
                                const srcMatch = val.match(/src="([^"]+)"/);
                                if (srcMatch && srcMatch[1]) {
                                    val = srcMatch[1];
                                }
                                setFormData({ ...formData, mapUrl: val });
                            }}
                        />
                    </div>
                </div>

                {formData.mapUrl && (
                    <div className="mt-8">
                        <h3 className="text-sm font-medium text-slate-700 mb-4">{t('preview')}</h3>
                        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm h-64">
                            <iframe
                                src={formData.mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Office Location Preview"
                            ></iframe>
                        </div>
                    </div>
                )}

                <div className="pt-6 border-t border-slate-100">
                    <button
                        type="submit"
                        className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
                    >
                        {t('saveMapData')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MapAdmin;
