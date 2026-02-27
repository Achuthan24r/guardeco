import { useState, useEffect } from 'react';
import {
    Users,
    AlertTriangle,
    CheckCircle2,
    Map as MapIcon,
    Activity,
    TrendingUp,
    ShieldCheck,
    ArrowUpRight,
    Truck,
    Building2,
    Calendar,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    Cell
} from 'recharts';

const ticketData = [
    { zone: 'North', pending: 12, resolved: 45 },
    { zone: 'South', pending: 25, resolved: 38 },
    { zone: 'East', pending: 8, resolved: 52 },
    { zone: 'West', pending: 18, resolved: 31 },
];

const efficiencyHistory = [
    { day: 'Mon', efficiency: 65 },
    { day: 'Tue', efficiency: 72 },
    { day: 'Wed', efficiency: 68 },
    { day: 'Thu', efficiency: 85 },
    { day: 'Fri', efficiency: 92 },
    { day: 'Sat', efficiency: 88 },
    { day: 'Sun', efficiency: 95 },
];

const MunicipalDashboard = () => {
    const [stats, setStats] = useState({
        totalTickets: 1420,
        resolvedToday: 42,
        activeTrucks: 85,
        cityScore: 78
    });

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gradient">Municipal Command Center</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
                        <p className="text-slate-400 text-sm font-medium">Madurai Municipal Corporation • Live Oversight</p>
                    </div>
                </div>
                <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1">
                    <button className="px-4 py-2 text-xs font-bold text-indigo-500 bg-indigo-500/10 rounded-xl">CITY VIEW</button>
                    <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-white transition-all">ZONE ANALYTICS</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Citizen Reports', value: stats.totalTickets, sub: '+24 This Hour', icon: AlertTriangle, color: 'orange' },
                    { label: 'Resolved Tickets', value: stats.resolvedToday, sub: 'Efficiency: 92%', icon: CheckCircle2, color: 'eco' },
                    { label: 'Fleet Status', value: stats.activeTrucks, sub: 'Units Operational', icon: Truck, color: 'blue' },
                    { label: 'City Cleanliness', value: `${stats.cityScore}%`, sub: 'Above Average', icon: ShieldCheck, color: 'indigo' }
                ].map((card, i) => (
                    <div key={i} className="glass-card p-6 border border-white/5 hover:border-indigo-500/30 transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl bg-${card.color === 'eco' ? 'eco-500' : card.color === 'indigo' ? 'indigo-500' : card.color + '-500'}/10 text-${card.color === 'eco' ? 'eco-500' : card.color === 'indigo' ? 'indigo-500' : card.color + '-500'}`}>
                                <card.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{card.label}</p>
                        <h3 className="text-3xl font-black mt-1">{card.value}</h3>
                        <p className="text-[10px] text-slate-400 mt-2 font-medium">{card.sub}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card p-8">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Activity className="w-5 h-5 text-indigo-500" />
                            Weekly Cleanliness Efficiency
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <div className="w-3 h-3 rounded-full bg-indigo-500/20 border border-indigo-500" /> Average
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={efficiencyHistory}>
                                <defs>
                                    <linearGradient id="colorGov" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#1c1c1e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                />
                                <Area type="monotone" dataKey="efficiency" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorGov)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card p-8">
                    <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-amber-500" />
                        Zone Distribution
                    </h3>
                    <div className="space-y-6">
                        {ticketData.map((item) => (
                            <div key={item.zone} className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                                    <span>{item.zone} Madurai</span>
                                    <span className="text-indigo-500">{item.resolved}/{item.pending + item.resolved} Resolved</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-indigo-500" style={{ width: `${(item.resolved / (item.pending + item.resolved)) * 100}%` }} />
                                    <div className="h-full bg-orange-500/50" style={{ width: `${(item.pending / (item.pending + item.resolved)) * 100}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                        <div className="flex items-center gap-2 text-indigo-500 mb-2">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase">Authority Note</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed italic">
                            "South Zone requires 2 additional collection units by tomorrow 08:00 AM due to the Chithirai Festival event backlog."
                        </p>
                    </div>
                </div>
            </div>

            <div className="glass-card p-8 border-l-4 border-eco-500">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-eco-500/10 rounded-3xl flex items-center justify-center">
                            <MapIcon className="w-8 h-8 text-eco-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Interactive Cleanliness Heatmap</h3>
                            <p className="text-sm text-slate-400">Live surveillance and AI-detected dirty patches across the city coordinates.</p>
                        </div>
                    </div>
                    <button className="bg-eco-600 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:opacity-90 flex items-center gap-2">
                        Open Map Interface <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MunicipalDashboard;
