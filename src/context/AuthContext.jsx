import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [projectId, setProjectId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) fetchUserRole(session.user.id);
            else setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchUserRole(session.user.id);
            } else {
                setRole(null);
                setProjectId(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchUserRole = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('user_roles')
                .select('role, project_id')
                .eq('user_id', userId)
                .single();

            if (data) {
                setRole(data.role);
                setProjectId(data.project_id);
            }
        } catch (err) {
            console.error('Error fetching role:', err);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        return supabase.auth.signInWithPassword({ email, password });
    };

    const logout = async () => {
        return supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ session, user, role, projectId, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
