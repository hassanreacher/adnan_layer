import { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
    LayoutDashboard,
    LogOut,
    Home,
    User,
    Settings,
    FolderKanban,
    Map,
    PhoneCall,
    Menu,
    X,
    Languages,
    CalendarDays
} from 'lucide-react';

const AdminLayout = () => {
    const { user, role, loading: authLoading, logout } = useAuth();
    const { language, toggleLanguage, t } = useLanguage();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (authLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    if (!user || role !== 'admin') {
        return <Navigate to="/admin/login" replace />;
    }

    const handleLogout = async () => {
        await logout();
    };

    const navItems = [
        { path: '/admin', label: t('dashboard'), icon: LayoutDashboard },
        { path: '/admin/hero', label: t('heroSection'), icon: Home },
        { path: '/admin/skills', label: t('skillsSection'), icon: User },
        { path: '/admin/services', label: t('servicesSection'), icon: Settings },
        { path: '/admin/projects', label: t('projectsSection'), icon: FolderKanban },
        { path: '/admin/events', label: t('eventsSection'), icon: CalendarDays },
        { path: '/admin/map', label: t('mapLocation'), icon: Map },
        { path: '/admin/contact', label: t('contactInfo'), icon: PhoneCall },
    ];

    const SidebarContent = () => (
        <>
            <div className="p-6">
                <h2 className="text-2xl font-bold text-white tracking-wider font-Playfair">
                    {t('adminPanel')}
                </h2>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-slate-400 text-sm">{t('managePortfolio')}</p>
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 text-blue-400 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-700 transition"
                    >
                        <Languages size={14} />
                        {language}
                    </button>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path || (location.pathname === '/admin/' && item.path === '/admin');
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                : 'text-white hover:bg-slate-800'
                                }`}
                        >
                            <Icon size={20} className="text-white" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto">
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 text-red-400 w-full px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">{t('logout')}</span>
                </button>
            </div>
        </>
    );

    return (
        <div className="flex h-screen bg-slate-50 font-sans" dir={language === 'ar' ? 'rtl' : 'ltr'}>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-20 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-slate-800 font-Playfair">{t('adminPanel')}</h2>
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center justify-center w-8 h-8 bg-slate-100 text-blue-600 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition"
                    >
                        {language}
                    </button>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar background overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static top-0 ${language === 'en' ? 'left-0' : 'right-0'} h-full bg-slate-900 w-72 flex flex-col z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : language === 'en' ? '-translate-x-full' : 'translate-x-full'
                }`}>
                <SidebarContent />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 h-full overflow-y-auto pt-16 lg:pt-0">
                <div className="p-4 md:p-8 max-w-7xl mx-auto w-full min-h-full">
                    {/* Dashboard Header Hint */}
                    <div className="mb-6 px-2 flex justify-between items-center bg-blue-50 text-blue-700 py-3 px-4 rounded-xl text-sm font-medium border border-blue-100">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                            </span>
                            {t('editingLanguage')} {language === 'en' ? 'English' : 'Arabic'}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 min-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-8rem)]">
                        <Outlet />
                    </div>
                </div>
            </main>

        </div>
    );
};

export default AdminLayout;
