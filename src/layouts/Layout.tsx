import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Camera,
    Leaf,
    Factory,
    Settings,
    Bell,
    User,
    LogOut,
    Award,
    BrainCircuit,
    Sun,
    Moon,
    Building2,
    ShieldCheck,
    Map
} from 'lucide-react';
import Footer from '../components/Footer';
import { useUserStore } from '../store/userStore';
import { useThemeStore } from '../store/themeStore';
import { Navigate } from 'react-router-dom';

const Layout = () => {
    const navigate = useNavigate();
    const user = useUserStore((state) => state.user);
    const role = useUserStore((state) => state.role);
    const logout = useUserStore((state) => state.logout);
    const { isDarkMode, toggleTheme } = useThemeStore();

    const userName = user?.displayName || user?.email?.split('@')[0] || "Guest";
    const userRoleText = role === 'industry' ? "Industry Admin" :
        role === 'government' ? "Municipal Authority" :
            "Citizen";

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    if (!role) return <Navigate to="/auth" />;

    const citizenItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Camera, label: 'AI Scanner', path: '/scanner' },
        { icon: Award, label: 'Rewards', path: '/rewards' },
        { icon: Bell, label: 'Contact', path: '/contact' },
    ];

    const industryItems = [
        { icon: Factory, label: 'Industry Hub', path: '/industry' },
        { icon: BrainCircuit, label: 'AI Insights', path: '/insights' },
        { icon: Settings, label: 'Setup Guide', path: '/setup' },
        { icon: Bell, label: 'Contact', path: '/contact' },
    ];

    const governmentItems = [
        { icon: Building2, label: 'Command Center', path: '/municipal' },
        { icon: ShieldCheck, label: 'AI Insights', path: '/insights' },
        { icon: Map, label: 'City Heatmap', path: '/municipal' },
        { icon: Bell, label: 'Citizen Tickets', path: '/contact' },
    ];

    const menuItems = role === 'industry' ? industryItems :
        role === 'government' ? governmentItems :
            citizenItems;

    return (
        <div className="flex h-screen bg-[var(--bg-main)] text-[var(--text-primary)]">
            <aside className="w-64 border-r border-[var(--border-color)] bg-[var(--bg-sidebar)] flex flex-col p-6">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-colors duration-500
                        ${role === 'citizen' ? 'bg-eco-600 shadow-eco-500/20' :
                            role === 'industry' ? 'bg-blue-600 shadow-blue-500/20' :
                                'bg-indigo-600 shadow-indigo-500/20'}`}>
                        {role === 'citizen' ? <Leaf className="w-6 h-6 text-white" /> :
                            role === 'industry' ? <Factory className="w-6 h-6 text-white" /> :
                                <Building2 className="w-6 h-6 text-white" />}
                    </div>
                    <span className="font-bold text-xl tracking-tight">EcoGuardian</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.label + item.path}
                            to={item.path}
                            className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive
                                    ? `bg-opacity-10 font-medium ${role === 'citizen' ? 'bg-eco-500 text-eco-500' : role === 'industry' ? 'bg-blue-500 text-blue-500' : 'bg-indigo-500 text-indigo-500'}`
                                    : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]'}
              `}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-auto space-y-4 pt-6 border-t border-[var(--border-color)]">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-3 px-4 py-3 text-[var(--text-secondary)] hover:text-eco-500 transition-colors w-full rounded-xl bg-white/5"
                    >
                        {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-blue-500" />}
                        <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>

                    <button
                        onClick={() => {
                            logout();
                            navigate('/auth');
                        }}
                        className="flex items-center gap-3 px-4 py-3 text-[var(--text-secondary)] hover:text-red-400 transition-colors w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-20 border-b border-[var(--border-color)] flex items-center justify-between px-8 bg-[var(--header-bg)] backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-semibold text-[var(--text-secondary)] uppercase tracking-wider text-[12px] font-bold">
                            {role === 'government' ? 'Government Surveillance Portal' : 'Madurai Smart City Portal'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--bg-main)]"></span>
                        </button>

                        <div className="flex items-center gap-3 pl-6 border-l border-[var(--border-color)] text-right">
                            <div>
                                <p className="text-sm font-semibold">{userName}</p>
                                <p className={`text-[10px] uppercase font-bold ${role === 'citizen' ? 'text-eco-500' : role === 'industry' ? 'text-blue-500' : 'text-indigo-500'}`}>
                                    {userRoleText}
                                </p>
                            </div>
                            <div className={`w-10 h-10 rounded-full border border-[var(--glass-border)] flex items-center justify-center overflow-hidden
                                ${role === 'citizen' ? 'bg-eco-500/10' : role === 'industry' ? 'bg-blue-500/10' : 'bg-indigo-500/10'}`}>
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-6 h-6 text-[var(--text-secondary)]" />
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 pb-0 custom-scrollbar bg-[var(--bg-main)] flex flex-col">
                    <div className="flex-1">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </main>
        </div>
    );
};

export default Layout;
