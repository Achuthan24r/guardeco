import React from 'react';
import { Award, Trophy, Gift, HeartPulse, ShieldCheck, ChevronRight, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const RewardSection = ({ title, icon: Icon, color, description, rewards }: any) => (
    <div className="glass-card p-8 border-l-4" style={{ borderColor: color }}>
        <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl" style={{ backgroundColor: `${color}20`, color: color }}>
                    <Icon className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-slate-400 text-sm">{description}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Perks</p>
                <p className="text-xl font-bold">{rewards.length}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.map((reward: any, index: number) => (
                <div key={index} className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/[0.07] transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="font-bold">{reward.name}</h4>
                        <span className="text-[10px] font-bold px-2 py-1 bg-white/10 rounded-full">{reward.cost} Eco Credits</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-4">{reward.description}</p>
                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full border-2 border-[#050505] bg-white/10 flex items-center justify-center">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                </div>
                            ))}
                        </div>
                        <button className="text-xs font-bold uppercase tracking-widest text-eco-500 group-hover:underline flex items-center gap-1">
                            Redeem <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Rewards = () => {
    const currentAge = 25; // Simulated age from auth
    const ecoCredits = 2450;

    return (
        <div className="space-y-12 pb-20">
            <div className="relative p-12 glass-card overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-eco-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-eco-500/10 text-eco-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                            <Trophy className="w-3 h-3" />
                            Level 12 Guardian
                        </div>
                        <h1 className="text-5xl font-bold mb-4">Your Eco Wallet</h1>
                        <p className="text-slate-400 max-w-md">You've saved 45kg of plastic and earned 2,450 credits. Keep clean, stay green!</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-4xl font-black text-eco-500">2,450</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase">Eco Credits</p>
                        </div>
                        <div className="w-px h-16 bg-white/10" />
                        <div className="text-center">
                            <p className="text-4xl font-black text-blue-500">#42</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase">City Rank</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <RewardSection
                    title="Child Rewards (U-15)"
                    icon={Gift}
                    color="#22c55e"
                    description="Special digital rewards and premium game unlocks for our young guardians."
                    rewards={[
                        { name: "Chess Premium", cost: 1000, description: "Unlock Chess.com Premium features for 1 month." },
                        { name: "Avatar Pack", cost: 500, description: "Exclusive 'Green Hero' avatar set for your profile." }
                    ]}
                />

                <RewardSection
                    title="Teenager Perks (15-20)"
                    icon={Award}
                    color="#3b82f6"
                    description="Verification badges and exclusive access to the youth leaderboard."
                    rewards={[
                        { name: "Verified Blue Tick", cost: 2000, description: "Get a verified badge on your profile and city leaderboard." },
                        { name: "Tournament Entry", cost: 800, description: "Free entry to the monthly Madura Eco-Chess tournament." }
                    ]}
                />

                <RewardSection
                    title="Adult Benefits (21-60)"
                    icon={Gift}
                    color="#eab308"
                    description="Redeemable municipal coupons and utility discounts."
                    rewards={[
                        { name: "Municipal Coupon", cost: 500, description: "₹100 discount coupon for local municipal services." },
                        { name: "Bus Pass Discount", cost: 1500, description: "Get 20% off on your monthly Madurai MTC bus pass." }
                    ]}
                />

                <RewardSection
                    title="Senior Citizen Perks (60+)"
                    icon={HeartPulse}
                    color="#ef4444"
                    description="Priority healthcare and essential service benefits for our elders."
                    rewards={[
                        { name: "Free Health Checkup", cost: 1000, description: "Book a comprehensive health screening at Apollo Madurai." },
                        { name: "Priority Service", cost: 500, description: "Fast-track access at municipal offices and public banks." }
                    ]}
                />
            </div>
        </div>
    );
};

export default Rewards;
