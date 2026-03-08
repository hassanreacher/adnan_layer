import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

export const useAdminData = (baseSectionName) => {
    const { projectId, user } = useAuth();
    const { language } = useLanguage();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const sectionName = `${baseSectionName}_${language}`;

    useEffect(() => {
        if (projectId && sectionName) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [projectId, sectionName]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data: sectionData, error } = await supabase
                .from('portfolio_sections')
                .select('content')
                .eq('project_id', projectId)
                .eq('section_name', sectionName)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 is 'not found'
                throw error;
            }

            if (sectionData) {
                setData(sectionData.content);
            } else {
                setData(null);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            toast.error(`Failed to load ${language.toUpperCase()} data`);
        } finally {
            setLoading(false);
        }
    };

    const saveData = async (newContent) => {
        try {
            const { error } = await supabase
                .from('portfolio_sections')
                .upsert({
                    project_id: projectId,
                    section_name: sectionName,
                    content: newContent,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'project_id, section_name' });

            if (error) throw error;
            setData(newContent);
            toast.success(`${language.toUpperCase()} Section updated successfully`);
        } catch (err) {
            console.error('Error saving data:', err);
            toast.error(`Failed to save ${language.toUpperCase()} data`);
        }
    };

    return { data, loading, saveData };
};
