import React from 'react';
import {
    Wrench,
    Cpu,
    Layers,
    Settings as SettingsIcon,
    CheckCircle,
    FileText,
    AlertCircle,
    Info
} from 'lucide-react';

const Installation = () => {
    const steps = [
        {
            title: 'Sensor Mounting',
            description: 'Install CO₂ and O₂ sensors at 1.5m height from the floor for optimal gas detection.',
            status: 'complete'
        },
        {
            title: 'Cyclone Setup',
            description: 'Connect the vacuum collection chamber to the plastic separator unit.',
            status: 'pending'
        },
        {
            title: 'Solar Integration',
            description: 'Mount solar panels on the rooftop and connect to the smart inverter system.',
            status: 'progress'
        },
        {
            title: 'Biogas Connection',
            description: 'Attach the organic waste inlet to the biogas digester unit.',
            status: 'pending'
        }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="flex-1">
                    <h1 className="text-4xl font-bold text-gradient mb-4">Hardware Installation Guide</h1>
                    <p className="text-slate-400">Step-by-step instructions for setting up your Industrial EcoGuardian system.</p>
                </div>
                <div className="glass-card px-6 py-4 flex items-center gap-4 bg-orange-500/10 border-orange-500/20">
                    <AlertCircle className="text-orange-500 w-6 h-6" />
                    <div>
                        <p className="text-sm font-bold">Estimated Cost</p>
                        <p className="text-xl font-bold text-orange-500">₹45,000 - ₹60,000</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Progress Sidebar */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Setup Progress</h3>
                    {steps.map((step, index) => (
                        <div key={index} className={`glass-card p-4 flex items-center gap-4 border-l-4 transition-all ${step.status === 'complete' ? 'border-eco-500 opacity-60' : step.status === 'progress' ? 'border-blue-500 animate-pulse' : 'border-white/5'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step.status === 'complete' ? 'bg-eco-500/20 text-eco-500' : 'bg-white/5 text-slate-500'}`}>
                                {index + 1}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">{step.title}</h4>
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{step.status}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Guide */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card p-8 bg-white/[0.01]">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Cpu className="w-6 h-6 text-eco-500" />
                            Required Components
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                'ESP32 DevKit V1',
                                'MQ-135 CO₂ Sensor',
                                'MQ-4 Biogas Sensor',
                                'Ultrasonic Sink Sensor',
                                '100W Solar Panel',
                                'DC Vacuum Pump',
                                'Cyclone Chamber',
                                'Relay Module (4-Ch)',
                                '12V Li-ion Battery'
                            ].map(item => (
                                <div key={item} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center gap-2">
                                    <CheckCircle className="w-3 h-3 text-eco-500" />
                                    <span className="text-[11px] font-medium text-slate-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card p-8">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Layers className="w-6 h-6 text-blue-500" />
                            Wiring Diagram
                        </h3>
                        <div className="aspect-video bg-white/5 rounded-2xl flex flex-col items-center justify-center border border-white/10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-eco-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <FileText className="w-12 h-12 text-slate-500 mb-2" />
                            <p className="text-sm font-semibold text-slate-400">Schematic_v2.1_Digital.pdf</p>
                            <button className="mt-4 bg-eco-600 px-6 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-all">Preview Schematic</button>
                        </div>
                    </div>

                    <div className="glass-card p-8 border-l-4 border-blue-500">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5 text-blue-500" />
                            Maintenance Instructions
                        </h3>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex gap-3">
                                <span className="text-blue-500 font-bold">•</span>
                                <span>Clean the MQ-sensor filters every 15 days with compressed air.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500 font-bold">•</span>
                                <span>Check the cyclone vacuum seals for cracks every month.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500 font-bold">•</span>
                                <span>Wipe solar panels with distilled water to maintain &gt;90% efficiency.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Installation;
