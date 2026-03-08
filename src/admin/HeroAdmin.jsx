import { useState, useEffect } from 'react';
import { useAdminData } from '../hooks/useAdminData';
import { useLanguage } from '../context/LanguageContext';

const HeroAdmin = () => {
    const { data, loading, saveData } = useAdminData('hero');
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        title: '',
        firstName: '',
        LastName: '',
        btnText: '',
    });

    const [stats, setStats] = useState([]);

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title || '',
                firstName: data.firstName || '',
                LastName: data.LastName || '',
                btnText: data.btnText || '',
            });
            setStats(data.hero_content || []);
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveData({
            ...formData,
            hero_content: stats
        });
    };

    const updateStat = (index, field, value) => {
        const newStats = [...stats];
        newStats[index][field] = value;
        setStats(newStats);
    };

    const addStat = () => {
        setStats([...stats, { count: '', text: '' }]);
    };

    const removeStat = (index) => {
        setStats(stats.filter((_, i) => i !== index));
    };

    if (loading) return <div className="p-8 text-slate-500 animate-pulse">{t('loading')}</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-8 text-slate-800 font-Playfair">{t('heroSection')}</h2>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('firstName')}</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('lastName')}</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            value={formData.LastName}
                            onChange={(e) => setFormData({ ...formData, LastName: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('title')}</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('btnText')}</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={formData.btnText}
                        onChange={(e) => setFormData({ ...formData, btnText: e.target.value })}
                    />
                </div>

                <div className="border-t border-slate-200 pt-8 mt-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-slate-800 font-Playfair">{t('statsCounters')}</h3>
                        <button
                            type="button"
                            onClick={addStat}
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-lg text-sm font-medium transition-all shadow-sm shadow-emerald-500/20"
                        >
                            {t('addStat')}
                        </button>
                    </div>

                    <div className="space-y-4">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row gap-4 items-start bg-slate-50 p-5 rounded-xl border border-slate-100">
                                <div className="flex-1 w-full space-y-3">
                                    <input
                                        type="text"
                                        placeholder={t('countPlaceholder')}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        value={stat.count}
                                        onChange={(e) => updateStat(idx, 'count', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder={t('descPlaceholder')}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        value={stat.text}
                                        onChange={(e) => updateStat(idx, 'text', e.target.value)}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeStat(idx)}
                                    className="w-full md:w-auto px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition-colors"
                                >
                                    {t('remove')}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 mt-8">
                    <button
                        type="submit"
                        className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
                    >
                        {t('saveHeroData')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HeroAdmin;
