import { useState } from 'react';
import { Factory, Shield, ArrowRight, Chrome, Lock, Mail, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { auth, googleProvider, signInWithPopup } from '../utils/firebase';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

const IndustryAuth = () => {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);
    const [isLogin, setIsLogin] = useState(true);
    const [secretCode, setSecretCode] = useState('');

    const handleGoogleLogin = async () => {
        // Simulation for Demo
        const isConfigured = import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_API_KEY !== "YOUR_FIREBASE_API_KEY";

        if (!isConfigured) {
            setUser({
                displayName: "Industrial Admin",
                email: "achuabi2419@gmail.com",
                photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Industry"
            }, 'industry');
            navigate('/');
            return;
        }

        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user, 'industry');
            navigate('/');
        } catch (error) {
            alert("Auth failed. Check Firebase settings.");
        }
    };

    return (
        <div className="min-h-screen bg-[#02040a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Industrial Background Grid */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl glass-card border border-blue-500/20 p-8 md:p-16 relative z-10"
            >
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-blue-500/40">
                        <Factory className="text-white w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Industry Logistics Portal</h1>
                    <p className="text-blue-400 font-bold text-xs uppercase tracking-[0.3em]">Authorized Personnel Only</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="email"
                                placeholder="Corporate Email"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="password"
                                placeholder="Portal Password"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                            />
                        </div>

                        <div className="relative">
                            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                            <input
                                type="password"
                                value={secretCode}
                                onChange={(e) => setSecretCode(e.target.value)}
                                placeholder="Dumping System Secret Code"
                                className="w-full bg-blue-500/5 border border-blue-500/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold"
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setUser({ email: 'admin@industry.com' }, 'industry');
                            navigate('/');
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black text-white shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                    >
                        Enter Command Center
                        <ArrowRight className="w-5 h-5" />
                    </button>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                            <span className="bg-[#0b0c0d] px-4 text-slate-500">Corporate SSO</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full bg-white/5 border border-white/10 hover:bg-white/10 py-4 rounded-2xl font-bold text-slate-300 transition-all flex items-center justify-center gap-4 border-b-2 border-b-blue-500/50"
                    >
                        <Chrome className="w-5 h-5 text-blue-500" />
                        Sign in with Google Business
                    </button>

                    <div className="pt-8 flex items-center justify-center gap-8 border-t border-white/5 mt-8">
                        <div className="flex items-center gap-2 text-slate-500">
                            <Building2 className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Enterprise</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <Shield className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Footer Watermark */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-20 transition-opacity hover:opacity-100 cursor-pointer" onClick={() => navigate('/auth')}>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Switch to Citizen Portal</p>
            </div>
        </div>
    );
};

export default IndustryAuth;
