import { useState, useEffect } from 'react';
import { useAdminData } from '../hooks/useAdminData';
import { useLanguage } from '../context/LanguageContext';

const SkillsAdmin = () => {
    const { data, loading, saveData } = useAdminData('skills');
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
    });

    const [skills, setSkills] = useState([]);

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title || '',
                subtitle: data.subtitle || '',
            });
            setSkills(data.skills_content || []);
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveData({
            ...formData,
            skills_content: skills
        });
    };

    const updateSkill = (index, field, value) => {
        const newSkills = [...skills];
        newSkills[index][field] = value;
        setSkills(newSkills);
    };

    const addSkill = () => {
        setSkills([...skills, { name: '', para: '', logo: '' }]);
    };

    const removeSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    if (loading) return <div className="p-8 text-slate-500 animate-pulse">{t('loading')}</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-8 text-slate-800 font-Playfair">{t('skillsData')}</h2>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                <div className="space-y-4">
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
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('subtitle')}</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            value={formData.subtitle}
                            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        />
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-8 mt-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-slate-800 font-Playfair">{t('skillsList')}</h3>
                        <button
                            type="button"
                            onClick={addSkill}
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-lg text-sm font-medium transition-all shadow-sm shadow-emerald-500/20"
                        >
                            {t('addSkill')}
                        </button>
                    </div>

                    <div className="space-y-4">
                        {skills.map((skill, idx) => (
                            <div key={idx} className="flex flex-col gap-4 bg-slate-50 p-5 rounded-xl border border-slate-100 relative group">
                                <button
                                    type="button"
                                    onClick={() => removeSkill(idx)}
                                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                                    title="Remove Skill"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <div className="w-full space-y-3 pr-8">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 mb-1">{t('skillName')}</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Civil Law"
                                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            value={skill.name}
                                            onChange={(e) => updateSkill(idx, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 mb-1">{t('description')}</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Comprehensive civil litigation..."
                                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            value={skill.para}
                                            onChange={(e) => updateSkill(idx, 'para', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 mb-1">{t('logoUrl')}</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. services_logo1 or URL"
                                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            value={skill.logo}
                                            onChange={(e) => updateSkill(idx, 'logo', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {skills.length === 0 && (
                            <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                                {t('noSkillsAdded')}
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 mt-8">
                    <button
                        type="submit"
                        className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
                    >
                        {t('saveSkillsData')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SkillsAdmin;
