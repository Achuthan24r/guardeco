import { useState, useEffect } from 'react';
import {
    Activity,
    BrainCircuit,
    Map as MapIcon,
    Truck,
    AlertTriangle,
    TrendingUp,
    BarChart3,
    Zap,
    Sparkles,
    Timer,
    Navigation2
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    AreaChart,
    Area
} from 'recharts';

const predictionData = [
    { time: '08:00', level: 20, predicted: 25 },
    { time: '10:00', level: 45, predicted: 48 },
    { time: '12:00', level: 75, predicted: 82 },
    { time: '14:00', level: 60, predicted: 95 }, // Peak predicted
    { time: '16:00', level: 40, predicted: 55 },
    { time: '18:00', level: 30, predicted: 40 },
];

const collectionEfficiency = [
    { zone: 'North', efficiency: 92 },
    { zone: 'South', efficiency: 78 },
    { zone: 'East', efficiency: 85 },
    { zone: 'West', efficiency: 64 },
    { zone: 'City Center', efficiency: 95 },
];

const Insights = () => {
    return (
        <div className="space-y-8 pb-20">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold text-gradient">AI City Insights</h1>
                    <p className="text-slate-400">Predictive analysis and route optimization for Madurai Metropolitan.</p>
                </div>
                <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                    <button className="px-4 py-2 text-xs font-bold text-eco-500 bg-eco-500/10 rounded-lg">LIVE PREDICTIONS</button>
                    <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-white transition-colors">HISTORICAL</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* AI Route Optimizer */}
                <div className="lg:col-span-2 glass-card p-8 border-l-4 border-blue-500">
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-500">
                                <Navigation2 className="w-6 h-6 animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">AI Collection Route Optimizer</h3>
                                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Zone: Madurai South</p>
                            </div>
                        </div>
                        <button className="bg-blue-600 text-white text-xs font-black px-6 py-3 rounded-xl shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all">GENERATE OPTIMAL ROUTE</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-2 mb-2 text-blue-500">
                                <Truck className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Fleet Active</span>
                            </div>
                            <p className="text-2xl font-black">12 / 15</p>
                            <p className="text-[10px] text-slate-500 mt-1 uppercase">Vehicles In Transit</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-2 mb-2 text-eco-500">
                                <Zap className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Fuel Savings</span>
                            </div>
                            <p className="text-2xl font-black">24.5%</p>
                            <p className="text-[10px] text-slate-500 mt-1 uppercase">Reduced Carbon Cost</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-2 mb-2 text-orange-500">
                                <Timer className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Est. Collection</span>
                            </div>
                            <p className="text-2xl font-black">42 Mins</p>
                            <p className="text-[10px] text-slate-500 mt-1 uppercase">Time to Completion</p>
                        </div>
                    </div>

                    <div className="h-[250px] w-full bg-white/5 rounded-3xl border border-white/10 relative overflow-hidden flex items-center justify-center group">
                        <MapIcon className="w-16 h-16 text-white/5 group-hover:text-blue-500/10 transition-all duration-700 group-hover:scale-150" />
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase mb-4 animate-bounce">
                                    <Sparkles className="w-3 h-3" /> AI Route Loading
                                </div>
                                <p className="text-slate-500 text-sm max-w-xs">AI is calculating traffic patterns, current bin levels, and fuel efficiency to generate the fastest route.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Waste Overflow Prediction */}
                <div className="glass-card p-8 border-l-4 border-orange-500 flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-500">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Overflow Forecast</h3>
                            <p className="text-[10px] text-orange-500 font-bold uppercase">Critical Zones Detected</p>
                        </div>
                    </div>

                    <div className="flex-1 h-[200px] w-full mb-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={predictionData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#1c1c1e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                />
                                <Line type="monotone" dataKey="level" stroke="rgba(255,255,255,0.2)" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="predicted" stroke="#f97316" strokeWidth={3} dot={{ fill: '#f97316' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
                            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-1">AI Recommendation</p>
                            <p className="text-xs text-slate-300">Predicting overflow at <strong>Meenakshi Bazaar</strong> in 22 mins. Deploy Vehicle #04 immediately.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Smart Bin Connectivity', value: '98%', icon: Activity, color: 'eco' },
                    { label: 'AI Prediction Accuracy', value: '94.2%', icon: BrainCircuit, color: 'blue' },
                    { label: 'Carbon Saved Today', value: '420 kg', icon: Zap, color: 'amber' },
                    { label: 'Operational Uptime', value: '24/7', icon: BarChart3, color: 'purple' }
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-${stat.color === 'eco' ? 'eco-500' : stat.color + '-500'}/10 text-${stat.color === 'eco' ? 'eco-500' : stat.color + '-500'}`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{stat.label}</p>
                            <p className="text-xl font-black">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Insights;
