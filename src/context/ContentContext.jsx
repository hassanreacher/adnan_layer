import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from './LanguageContext';

const ContentContext = createContext({});

// Using the project ID we set up in the DB script for the public frontend:
const PUBLIC_PROJECT_ID = '11111111-1111-1111-1111-111111111111';

export const ContentProvider = ({ children }) => {
    const { language } = useLanguage();
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, [language]);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('portfolio_sections')
                .select('section_name, content')
                .eq('project_id', PUBLIC_PROJECT_ID);

            if (error) throw error;

            // Group by the base section name
            // Data looks like: [{ section_name: 'hero_en', content: {...} }, ...]
            const formattedContent = {};
            const langSuffix = `_${language}`;

            if (data) {
                data.forEach(item => {
                    if (item.section_name.endsWith(langSuffix)) {
                        const baseName = item.section_name.replace(langSuffix, '');
                        formattedContent[baseName] = item.content;
                    }
                });
            }

            setContent(formattedContent);
        } catch (err) {
            console.error('Error fetching public content:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ContentContext.Provider value={{ content, loading, refetch: fetchContent }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => useContext(ContentContext);
