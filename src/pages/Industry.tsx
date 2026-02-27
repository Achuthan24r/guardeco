import { useState, useEffect } from 'react';
import {
    Activity,
    Wind,
    Droplets,
    Sun,
    Flame,
    Zap,
    TrendingUp,
    PieChart as PieChartIcon,
    AlertCircle,
    Settings,
    Power,
    Coins,
    Fuel,
    CircleSlash,
    BrainCircuit,
    ShieldCheck
} from 'lucide-react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const revenueData = [
    { name: 'Jan', plastic: 4000, solar: 2400, biogas: 2400 },
    { name: 'Feb', plastic: 3000, solar: 1398, biogas: 2210 },
    { name: 'Mar', plastic: 2000, solar: 9800, biogas: 2290 },
    { name: 'Apr', plastic: 2780, solar: 3908, biogas: 2000 },
    { name: 'May', plastic: 1890, solar: 4800, biogas: 2181 },
    { name: 'Jun', plastic: 2390, solar: 3800, biogas: 2500 },
];

const wasteDistribution = [
    { name: 'Plastic', value: 400, color: '#3b82f6' },
    { name: 'Organic', value: 300, color: '#22c55e' },
    { name: 'Paper', value: 300, color: '#eab308' },
];

const SensorCard = ({ icon: Icon, label, value, unit, status, trend, subValue }: any) => (
    <div className="glass-card p-6 border border-white/10 hover:border-eco-500/30 transition-all duration-300 group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-white/2 rounded-full -mr-8 -mt-8" />
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${status === 'critical' ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-slate-400 group-hover:bg-eco-500/10 group-hover:text-eco-500'} transition-all`}>
                <Icon className="w-6 h-6" />
            </div>
            {trend && (
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
            )}
        </div>
        <p className="text-slate-400 text-sm font-medium">{label}</p>
        <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-2xl font-bold">{value}</h3>
            <span className="text-slate-500 text-xs">{unit}</span>
        </div>
        {subValue && (
            <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-widest">{subValue}</p>
        )}
    </div>
);

const Industry = () => {
    const [isPlantActive, setIsPlantActive] = useState(true);
    const [co2, setCo2] = useState(412);
    const [o2Produced, setO2Produced] = useState(0);
    const [profit, setProfit] = useState(12450);
    const [fuelSaved, setFuelSaved] = useState(120);

    // Simulation effect
    useEffect(() => {
        let interval: any;
        if (isPlantActive) {
            interval = setInterval(() => {
                setCo2(prev => Math.max(380, prev + (Math.random() > 0.5 ? -1 : 1)));
                // AI Logic: O2 outcome is a factor of CO2 processing
                setO2Produced(prev => prev + Number((Math.random() * 0.5).toFixed(2)));
                setProfit(prev => prev + Math.floor(Math.random() * 10));
                setFuelSaved(prev => prev + 0.1);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isPlantActive]);

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gradient">Industry Command Center</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${isPlantActive ? 'bg-eco-500 animate-pulse' : 'bg-red-500'} shadow-[0_0_8px_rgba(34,197,94,0.5)]`} />
                        <p className="text-slate-400 text-sm font-medium">TVS Unit-4 • {isPlantActive ? 'System Live' : 'Plant Suspended'}</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setIsPlantActive(!isPlantActive)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-xl
                        ${isPlantActive ? 'bg-red-600/20 text-red-500 border border-red-500/30' : 'bg-eco-600/20 text-eco-500 border border-eco-500/30'}
                        hover:scale-105 active:scale-95`}
                    >
                        <Power className="w-4 h-4" />
                        {isPlantActive ? 'SHUTDOWN PLANT' : 'START OPERATIONS'}
                    </button>
                    <button className="bg-white/5 px-4 py-3 rounded-xl text-xs font-bold border border-white/10 hover:bg-white/10 transition-all uppercase tracking-widest">Maintenance</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SensorCard
                    icon={Wind}
                    label="CO₂ Levels"
                    value={co2}
                    unit="ppm"
                    trend={isPlantActive ? -4 : 0}
                    subValue="Air Quality: Good"
                />
                <SensorCard
                    icon={ShieldCheck}
                    label="AI O₂ Outcome"
                    value={o2Produced.toFixed(1)}
                    unit="m³"
                    trend={isPlantActive ? 15 : 0}
                    status={isPlantActive ? 'active' : 'idle'}
                    subValue="Converted from CO₂"
                />
                <SensorCard
                    icon={Coins}
                    label="Current Profit"
                    value={profit.toLocaleString()}
                    unit="INR"
                    trend={8}
                    subValue="Calculated by AI"
                />
                <SensorCard
                    icon={Fuel}
                    label="Fuel Oil Savings"
                    value={fuelSaved.toFixed(1)}
                    unit="Ltr"
                    status={fuelSaved > 200 ? 'critical' : 'normal'}
                    subValue="Bio-Alternative"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* AI Profit Forecast */}
                <div className="glass-card p-8 bg-gradient-to-br from-eco-600/10 to-transparent border-eco-500/20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-eco-600/20 rounded-2xl flex items-center justify-center">
                            <BrainCircuit className="text-eco-500 w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">AI Financial Insight</h3>
                            <p className="text-[10px] text-eco-500 font-bold uppercase tracking-widest">Next 24h Prediction</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-slate-400 text-xs mb-1">Expected Revenue Growth</p>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-black text-white">₹42,850</span>
                                <span className="text-eco-500 text-xs font-bold bg-eco-500/10 px-2 py-1 rounded-lg">+12.4%</span>
                            </div>
                        </div>

                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-slate-400 text-xs mb-1">Fuel Oil Replacement Potential</p>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-black text-white">1,420 L</span>
                                <span className="text-blue-500 text-xs font-bold bg-blue-500/10 px-2 py-1 rounded-lg">High</span>
                            </div>
                        </div>

                        <div className="pt-4">
                            <p className="text-sm text-slate-400 italic">
                                "Based on current data, your plant can save ₹8,400 in fuel costs by increasing Biogas injection in the next cycle."
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 glass-card p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-eco-500" />
                            Revenue vs Sustainability
                        </h3>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorPlastic" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorBiogas" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#1c1c1e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ fontSize: '12px' }}
                                />
                                <Area type="monotone" dataKey="plastic" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPlastic)" />
                                <Area type="monotone" dataKey="biogas" stroke="#22c55e" fillOpacity={1} fill="url(#colorBiogas)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AnimatePresence>
                    {isPlantActive ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="glass-card p-6 border-l-4 border-eco-500 bg-eco-500/[0.02]"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-eco-500/20 rounded-2xl flex items-center justify-center">
                                        <Activity className="text-eco-500 w-6 h-6 animate-pulse" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">EcoGuardian AI Monitoring</h3>
                                        <p className="text-xs text-eco-500 font-bold uppercase">Optimal Efficiency</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-eco-500/20 text-eco-500 text-[10px] font-black rounded-lg">LIVE</div>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 italic text-sm text-slate-300 relative">
                                "AI Analysis complete: System is converting CO₂ to O₂ at a rate of 1.4 m³/hr. Fuel oil consumption is down by 18% today. Operation is profitable."
                                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-[#0d0d0e] rotate-45 border-r border-b border-white/5" />
                            </div>
                            <div className="mt-6 flex gap-3">
                                <button className="bg-eco-600 text-white text-xs font-bold px-4 py-3 rounded-lg hover:opacity-90 transition-all">Optimize Flow</button>
                                <button className="bg-white/5 text-slate-400 text-xs font-bold px-4 py-3 rounded-lg hover:bg-white/10 transition-all">View Analytics</button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="glass-card p-8 flex flex-col items-center justify-center text-center space-y-4 border-l-4 border-red-500 bg-red-500/[0.02]"
                        >
                            <CircleSlash className="w-12 h-12 text-red-500 opacity-50" />
                            <div>
                                <h3 className="text-xl font-bold">Plant Stopped</h3>
                                <p className="text-slate-500 text-sm">Waiting for operator signal to restart processing.</p>
                            </div>
                            <button
                                onClick={() => setIsPlantActive(true)}
                                className="eco-gradient text-white px-8 py-3 rounded-xl font-bold shadow-xl"
                            >
                                RESTART ENGINE
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="glass-card p-6">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        Critical Safety Check
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${isPlantActive ? 'bg-eco-500' : 'bg-slate-500'}`} />
                                <span className="text-sm">Environmental Compliance</span>
                            </div>
                            <span className="text-[10px] font-black uppercase text-eco-500 tracking-widest">Passed</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${isPlantActive ? 'bg-orange-500 animate-pulse' : 'bg-slate-500'}`} />
                                <span className="text-sm">AI Waste Prediction</span>
                            </div>
                            <span className="text-[10px] font-black uppercase text-orange-500 tracking-widest">Processing...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Industry;
