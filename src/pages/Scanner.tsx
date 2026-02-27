import { useState, useRef } from 'react';
import { Camera, Zap, Info, Recycle, Leaf, Loader2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeWasteImage } from '../utils/gemini';

const Scanner = () => {
    const [image, setImage] = useState<string | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
                startAnalysis(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const startAnalysis = async (imageData?: string) => {
        const dataToAnalyze = imageData || image;
        if (!dataToAnalyze) return;

        setAnalyzing(true);
        setResult(null);

        try {
            // Check if API key is configured
            if (import.meta.env.VITE_GEMINI_API_KEY === "YOUR_GOOGLE_AI_STUDIO_API_KEY") {
                // Fallback to simulation if no key
                setTimeout(() => {
                    setAnalyzing(false);
                    setResult({
                        efficiency: 78,
                        type: 'Mixed (Recyclable + Organic)',
                        composition: { plastic: 45, organic: 55 },
                        suggestion: 'Better segregation needed. Remove the plastic wraps from organic waste before disposal.',
                        credits: 1
                    });
                }, 3000);
                return;
            }

            const aiResult = await analyzeWasteImage(dataToAnalyze);
            setResult({
                ...aiResult,
                credits: aiResult.efficiency > 60 ? 1 : 0
            });
        } catch (error) {
            console.error("AI Analysis failed, falling back to simulation:", error);
            setResult({
                efficiency: 0,
                type: 'Error in Analysis',
                composition: { plastic: 0, organic: 0 },
                suggestion: 'Please check your Google AI Studio API key in the .env file.',
                credits: 0
            });
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gradient">AI Waste Analyzer</h1>
                <p className="text-slate-400">Powered by Google Gemini AI Studio</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: Upload/Camera */}
                <div className="space-y-6">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square glass-card border-2 border-dashed border-white/10 hover:border-eco-500/50 transition-all flex flex-col items-center justify-center gap-4 cursor-pointer relative overflow-hidden group"
                    >
                        {image ? (
                            <img src={image} className="w-full h-full object-cover" alt="Waste" />
                        ) : (
                            <>
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Camera className="w-8 h-8 text-slate-400" />
                                </div>
                                <div className="text-center px-4">
                                    <p className="font-semibold">Take Photo or Upload</p>
                                    <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, WEBP</p>
                                </div>
                            </>
                        )}

                        {analyzing && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-20">
                                <Loader2 className="w-12 h-12 text-eco-500 animate-spin" />
                                <p className="text-eco-500 font-bold tracking-widest uppercase text-xs">Gemini is Analyzing...</p>
                            </div>
                        )}

                        {image && !analyzing && (
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <p className="text-white text-sm font-bold">Replace Image</p>
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleUpload}
                    />

                    <button
                        disabled={!image || analyzing}
                        onClick={() => startAnalysis()}
                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all 
              ${!image || analyzing ? 'bg-white/5 text-slate-500' : 'eco-gradient text-white shadow-lg shadow-eco-600/20 hover:opacity-90'}`}
                    >
                        <Zap className="w-5 h-5" />
                        {(import.meta.env.VITE_GEMINI_API_KEY && import.meta.env.VITE_GEMINI_API_KEY !== "YOUR_GOOGLE_AI_STUDIO_API_KEY")
                            ? 'Analyze with Gemini'
                            : 'Run AI Simulation'}
                    </button>
                </div>

                {/* Right Side: Results */}
                <div className="space-y-6">
                    {!result && !analyzing && (
                        <div className="glass-card p-8 h-full flex flex-col items-center justify-center text-center opacity-50 grayscale">
                            <ShieldCheck className="w-16 h-16 text-slate-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Ready for Scan</h3>
                            <p className="text-sm text-slate-400">Real-time analysis results will appear here after you upload an image.</p>
                        </div>
                    )}

                    <AnimatePresence>
                        {result && !analyzing && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <div className="glass-card p-6 border-l-4 border-eco-500">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <p className="text-[10px] text-eco-500 font-bold uppercase tracking-widest mb-1">Efficiency Score</p>
                                            <h2 className="text-4xl font-bold">{result.efficiency}%</h2>
                                        </div>
                                        <div className="w-12 h-12 eco-gradient rounded-xl flex items-center justify-center text-white font-bold">
                                            +{result.credits}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-400">Waste Category</span>
                                            <span className="font-semibold text-eco-200">{result.type}</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
                                            <div className="h-full bg-blue-500" style={{ width: `${result.composition.plastic}%` }} title="Plastic" />
                                            <div className="h-full bg-eco-500" style={{ width: `${result.composition.organic}%` }} title="Organic" />
                                        </div>
                                        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                                <span className="text-slate-400">Plastic {result.composition.plastic}%</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-eco-500" />
                                                <span className="text-slate-400">Organic {result.composition.organic}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card p-6 bg-blue-500/[0.03] border-blue-500/10">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-blue-500/20 rounded-lg">
                                            <Info className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm mb-1">AI Improvement Suggestion</h4>
                                            <p className="text-sm text-slate-400 italic">"{result.suggestion}"</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="glass-card p-4 flex flex-col gap-2">
                                        <Recycle className="text-blue-500 w-5 h-5" />
                                        <p className="text-[10px] text-slate-500 font-bold uppercase">Reward Credits</p>
                                        <p className="font-bold">{result.efficiency > 60 ? '1 Eco Credit' : 'No Credits'}</p>
                                    </div>
                                    <div className="glass-card p-4 flex flex-col gap-2">
                                        <Leaf className="text-eco-500 w-5 h-5" />
                                        <p className="text-[10px] text-slate-500 font-bold uppercase">Status</p>
                                        <p className="font-bold text-eco-500">{result.efficiency > 60 ? 'ELIGIBLE' : 'POOR'}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Scanner;
