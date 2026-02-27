import { useState } from 'react';
import { Phone, MessageSquare, Mail, AlertTriangle, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const adminEmail = "guardeco4@gmail.com";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        // Simulate real mail sending logic
        setTimeout(() => {
            setIsSending(false);
            setIsSent(true);

            // Auto-reset after 5 seconds
            setTimeout(() => setIsSent(false), 5000);
        }, 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gradient mb-4">Support & Emergency</h1>
                <p className="text-slate-400">Directly connect with the EcoGuardian Authority at Madurai.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 glass-card p-8">
                    <h3 className="text-xl font-bold mb-8">Submit a Complaint</h3>

                    <AnimatePresence mode="wait">
                        {!isSent ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-eco-500 text-white"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Subject</label>
                                        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-eco-500 appearance-none text-white">
                                            <option>Waste Overflow</option>
                                            <option>Illegal Dumping</option>
                                            <option>Missed Pickup</option>
                                            <option>Industrial Leakage</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-eco-500 text-white"
                                        placeholder="Describe the issue in detail..."
                                    ></textarea>
                                </div>

                                <button
                                    disabled={isSending}
                                    type="submit"
                                    className="eco-gradient text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Routing to {adminEmail}...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Submit Ticket
                                        </>
                                    )}
                                </button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-[400px] flex flex-col items-center justify-center text-center space-y-4"
                            >
                                <div className="w-20 h-20 bg-eco-500/20 rounded-full flex items-center justify-center border border-eco-500/50">
                                    <CheckCircle2 className="w-10 h-10 text-eco-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Ticket Submitted Successfully!</h3>
                                <p className="text-slate-400 max-w-md">
                                    A copy of this report has been sent to <span className="text-eco-400 font-bold">{adminEmail}</span>.
                                    Our team will review it shortly.
                                </p>
                                <button
                                    onClick={() => setIsSent(false)}
                                    className="text-eco-500 font-bold text-sm hover:underline mt-4"
                                >
                                    Send another report
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-6 border-l-4 border-red-500 bg-red-500/5">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-red-500/20 rounded-xl text-red-500">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold">Emergency Hotline</h3>
                        </div>
                        <p className="text-2xl font-black text-white mb-2">1212 / 108</p>
                        <p className="text-xs text-slate-400">Available 24/7 for critical waste-related hazards or leaks.</p>
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="text-lg font-bold mb-6">EcoGuardian Contact</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="p-2 bg-white/5 rounded-lg h-fit">
                                    <Phone className="w-4 h-4 text-eco-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">Official Support</h4>
                                    <p className="text-xs text-slate-500">+91 452 253 0001</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-2 bg-white/5 rounded-lg h-fit">
                                    <MessageSquare className="w-4 h-4 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">WhatsApp Connect</h4>
                                    <p className="text-xs text-slate-500">+91 94440 54321</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-2 bg-white/5 rounded-lg h-fit">
                                    <Mail className="w-4 h-4 text-amber-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">Direct Admin Email</h4>
                                    <p className="text-xs text-slate-400 break-all">{adminEmail}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
