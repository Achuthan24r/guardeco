import { useState } from 'react';
import { Building2, Shield, ArrowRight, Chrome, Lock, Mail, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import { auth, googleProvider, signInWithPopup } from '../utils/firebase';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

const MunicipalAuth = () => {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);
    const [secretCode, setSecretCode] = useState('');

    const handleGoogleLogin = async () => {
        const isConfigured = import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_API_KEY !== "YOUR_FIREBASE_API_KEY";

        if (!isConfigured) {
            setUser({
                displayName: "Municipal Commissioner",
                email: "achuabi2419@gmail.com",
                photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gov"
            }, 'government');
            navigate('/');
            return;
        }

        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user, 'government');
            navigate('/');
        } catch (error) {
            alert("Auth failed. Check Firebase settings.");
        }
    };

    return (
        <div className="min-h-screen bg-[#05050a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Government Seal Background */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#6366f1 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
            <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl glass-card border border-indigo-500/20 p-8 md:p-16 relative z-10"
            >
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/40">
                        <Building2 className="text-white w-12 h-12" />
                    </div>
                    <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Municipal Command</h1>
                    <p className="text-indigo-400 font-bold text-xs uppercase tracking-[0.4em]">Government Authority Portal</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="email"
                                placeholder="Government ID / Email"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="password"
                                placeholder="Security PIN"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                            />
                        </div>

                        <div className="relative">
                            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500" />
                            <input
                                type="password"
                                value={secretCode}
                                onChange={(e) => setSecretCode(e.target.value)}
                                placeholder="Verification Authority Code"
                                className="w-full bg-indigo-500/5 border border-indigo-500/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-bold"
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setUser({ email: 'commissioner@tn.gov.in' }, 'government');
                            navigate('/');
                        }}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 py-5 rounded-2xl font-black text-white shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                    >
                        Access Surveillance Dashboard
                        <ArrowRight className="w-5 h-5" />
                    </button>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                            <span className="bg-[#0b0c0d] px-4 text-slate-600">Secure Government Auth</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full bg-white/5 border border-white/10 hover:bg-white/10 py-4 rounded-2xl font-bold text-slate-300 transition-all flex items-center justify-center gap-4 border-b-2 border-b-indigo-500/50"
                    >
                        <Chrome className="w-5 h-5 text-indigo-500" />
                        Sign in with G-Suite Work
                    </button>

                    <div className="pt-8 flex items-center justify-center gap-8 border-t border-white/5 mt-8">
                        <div className="flex items-center gap-2 text-slate-600">
                            <Map className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Regional Node</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <Shield className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Classified Access</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-25 transition-opacity hover:opacity-100 cursor-pointer" onClick={() => navigate('/auth')}>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Switch to Public Portal</p>
            </div>
        </div>
    );
};

export default MunicipalAuth;
