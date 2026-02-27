import { useState, useEffect } from 'react';
import { Camera, Award, AlertTriangle, TrendingUp, Users, Leaf, ArrowUpRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const Home = () => {
    const navigate = useNavigate();
    const user = useUserStore((state) => state.user);
    const role = useUserStore((state) => state.role);
    const userName = user?.displayName || user?.email?.split('@')[0] || "Guardian";

    // Dynamic stats state
    const [stats, setStats] = useState({
        plastic: 1.25,
        organic: 852.4,
        guardians: 14205,
        revenue: 2450000,
        industrialProfit: 86420
    });

    // Real-time update simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                plastic: prev.plastic + Number((Math.random() * 0.001).toFixed(3)),
                organic: prev.organic + Number((Math.random() * 0.1).toFixed(1)),
                guardians: prev.guardians + (Math.random() > 0.95 ? 1 : 0),
                revenue: prev.revenue + Math.floor(Math.random() * 10),
                industrialProfit: prev.industrialProfit + Math.floor(Math.random() * 5)
            }));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-10 pb-20">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-5xl font-extrabold text-gradient mb-4">Welcome Back, {userName}</h1>
                    <p className="text-[var(--text-secondary)] text-lg max-w-2xl">
                        You're making Madurai cleaner. Your current segregation efficiency is <span className="text-eco-500 font-bold">82%</span>. Keep it up!
                    </p>
                </div>
                <div className="bg-eco-600/10 px-8 py-5 rounded-[2rem] border border-eco-500/20 text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-eco-500/20 blur-2xl -mr-8 -mt-8 group-hover:bg-eco-500/40 transition-all" />
                    <p className="text-[10px] text-eco-500 font-bold uppercase tracking-[0.3em] mb-1">Eco Wallet Balance</p>
                    <div className="flex items-center gap-2 justify-center">
                        <Leaf className="w-5 h-5 text-eco-500" />
                        <p className="text-3xl font-black">2,450</p>
                    </div>
                </div>
            </div>

            {/* Main Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: Camera, label: 'AI Waste Scanner', desc: 'Scan your waste to earn eco-credits.', color: 'blue', link: '/scanner' },
                    { icon: Award, label: 'Redeem Rewards', desc: 'Convert credits to perks or coupons.', color: 'eco', link: '/rewards' },
                    { icon: AlertTriangle, label: 'Report Issues', desc: 'Notify authorities of dirty zones.', color: 'amber', link: '/contact' }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -8 }}
                        onClick={() => navigate(item.link)}
                        className="glass-card p-8 flex flex-col gap-6 group cursor-pointer border border-white/5 hover:border-white/10 transition-all"
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${item.color === 'eco' ? 'eco-500' : item.color + '-500'}/20`}>
                            <item.icon className={`text-${item.color === 'eco' ? 'eco-500' : item.color + '-500'} w-7 h-7`} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-eco-400 transition-colors uppercase tracking-tight">
                                {item.label}
                            </h3>
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                            <span className="text-xs font-bold text-eco-500">GET STARTED</span>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(`https://www.google.com/search?q=${encodeURIComponent(item.label + ' smart urban cleanliness')}`, '_blank');
                                }}
                                className="flex items-center text-[10px] font-bold text-[var(--text-secondary)] hover:text-eco-400 transition-colors bg-white/5 px-3 py-1 rounded-full border border-white/5"
                            >
                                LEARN MORE <ArrowUpRight className="w-3 h-3 ml-1" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Stats Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-8">
                        <h3 className="text-xl font-bold">Community Impact</h3>
                        <TrendingUp className="text-eco-500 w-6 h-6" />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-1">
                            <p className="text-4xl font-black">{stats.plastic.toFixed(2)}T</p>
                            <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">Plastic Diverted</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-4xl font-black">{stats.organic.toFixed(1)}kg</p>
                            <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">Organic Recycled</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-4xl font-black">{(stats.guardians / 1000).toFixed(1)}k</p>
                            <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">Active Guardians</p>
                        </div>
                        {role === 'industry' ? (
                            <div className="space-y-1">
                                <p className="text-4xl font-black text-eco-500">₹{(stats.industrialProfit / 1000).toFixed(1)}k</p>
                                <p className="text-[10px] text-eco-500 font-bold uppercase tracking-widest flex items-center gap-1">
                                    <Activity className="w-3 h-3" />
                                    Live Industrial Profit
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <p className="text-4xl font-black">₹{(stats.revenue / 1000000).toFixed(1)}M</p>
                                <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">Total Revenue Gen.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="glass-card p-8 bg-blue-500/[0.02]">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <Users className="text-blue-500 w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Top Guardians Today</h3>
                            <p className="text-xs text-[var(--text-secondary)] uppercase font-bold tracking-widest">Madurai South Zone</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: "Priya K.", points: 1450, rank: 1 },
                            { name: "Rahul S.", points: 1220, rank: 2 },
                            { name: "Arjun M.", points: 980, rank: 3 }
                        ].map((user, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-[var(--border-color)] rounded-2xl border border-[var(--glass-border)] hover:border-eco-500/30 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-eco-500/20 to-blue-500/20 flex items-center justify-center text-xs font-bold border border-[var(--glass-border)]">
                                        {user.rank}
                                    </div>
                                    <span className="font-semibold text-sm">{user.name}</span>
                                </div>
                                <span className="text-eco-500 font-bold text-sm">+{user.points} pts</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
