import { useState } from 'react';
import { Shield, Leaf, Recycle, Factory, MapPin, ArrowRight, Chrome, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, googleProvider, signInWithPopup } from '../utils/firebase';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState('citizen');

    // Role-based theme mapping
    const theme = {
        citizen: {
            color: 'eco-600',
            glow: 'rgba(34, 197, 94, 0.4)',
            label: 'Citizen Portal',
            bg: 'bg-eco-600'
        },
        industry: {
            color: 'blue-600',
            glow: 'rgba(59, 130, 246, 0.4)',
            label: 'Industry Portal',
            bg: 'bg-blue-600'
        },
        government: {
            color: 'indigo-600',
            glow: 'rgba(79, 70, 229, 0.4)',
            label: 'Municipal Portal',
            bg: 'bg-indigo-600'
        }
    }[role as 'citizen' | 'industry' | 'government'];

    const handleGoogleLogin = async () => {
        const isConfigured = import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_API_KEY !== "YOUR_FIREBASE_API_KEY";

        if (!isConfigured) {
            setUser({
                displayName: `Guardian - ${role}`,
                email: "achuabi2419@gmail.com",
                photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`
            }, role as any);
            navigate('/');
            return;
        }

        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user, role as any);
            navigate('/');
        } catch (error) {
            alert("Authentication failed. Check your Firebase settings.");
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500">
            {/* Dynamic Background Orbs */}
            <AnimatePresence>
                <motion.div
                    key={role}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-700 ${role === 'citizen' ? 'bg-eco-500/10' : role === 'industry' ? 'bg-blue-500/10' : 'bg-indigo-500/10'}`} />
                    <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-colors duration-700 ${role === 'citizen' ? 'bg-blue-500/5' : role === 'industry' ? 'bg-eco-500/5' : 'bg-purple-500/10'}`} />
                </motion.div>
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg glass-card p-8 md:p-12 relative z-10 transition-all duration-300"
                style={{ borderColor: theme.glow }}
            >
                <div className="flex flex-col items-center mb-8">
                    <motion.div
                        animate={{ backgroundColor: role === 'citizen' ? '#16a34a' : role === 'industry' ? '#2563eb' : '#4f46e5' }}
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-black/20"
                    >
                        {role === 'citizen' ? <Leaf className="text-white w-8 h-8" /> :
                            role === 'industry' ? <Factory className="text-white w-8 h-8" /> :
                                <Building2 className="text-white w-8 h-8" />}
                    </motion.div>
                    <h1 className="text-3xl font-bold text-white mb-1 text-center">EcoGuardian AI</h1>
                    <p className={`text-xs font-black uppercase tracking-[0.2em] transition-colors ${role === 'citizen' ? 'text-eco-500' : role === 'industry' ? 'text-blue-500' : 'text-indigo-500'}`}>
                        {theme.label}
                    </p>
                </div>

                <div className="flex bg-white/5 p-1 rounded-xl mb-8">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${isLogin ? `${theme.bg} text-white shadow-lg` : 'text-slate-400 hover:text-white'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${!isLogin ? `${theme.bg} text-white shadow-lg` : 'text-eco-500 hover:text-eco-600'}`}
                    >
                        Sign Up
                    </button>
                </div>

                <form className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Role Type</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all appearance-none"
                            style={{ '--tw-ring-color': theme.glow } as any}
                        >
                            <option value="citizen" className="text-black">Citizen User</option>
                            <option value="industry" className="text-black">Industry Admin</option>
                            <option value="government" className="text-black">Municipal Authority</option>
                        </select>
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Age Verification</label>
                            <input
                                type="number"
                                placeholder="Enter your age"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-opacity-50"
                                style={{ '--tw-ring-color': theme.glow } as any}
                            />
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-opacity-50"
                                style={{ '--tw-ring-color': theme.glow } as any}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-opacity-50"
                                style={{ '--tw-ring-color': theme.glow } as any}
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setUser({ email: 'admin@maduraicorp.gov.in' }, role as any);
                            navigate('/');
                        }}
                        className={`w-full py-4 rounded-xl font-bold text-white shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 group ${theme.bg}`}
                    >
                        {isLogin ? 'Sign In to Portal' : 'Create Authorized Account'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                        <span className="bg-[#0b0c0d] px-3 text-slate-600">Secure SSO</span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full bg-white/5 border border-white/10 py-3 rounded-xl font-medium text-slate-200 hover:bg-white/10 transition-all flex items-center justify-center gap-3 border-b-2 border-b-white/5"
                >
                    <Chrome className={`w-5 h-5 ${role === 'citizen' ? 'text-eco-500' : role === 'industry' ? 'text-blue-500' : 'text-indigo-500'}`} />
                    Continue with Google
                </button>
            </motion.div>
        </div>
    );
};

export default Auth;
