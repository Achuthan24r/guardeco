import { Leaf, Github, Twitter, Linkedin, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-20 border-t border-[var(--border-color)] pt-16 pb-12 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-eco-500/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-eco-500 to-eco-700 flex items-center justify-center shadow-2xl shadow-eco-500/40 transform hover:rotate-6 transition-transform duration-300">
                                <Leaf className="w-7 h-7 text-white" />
                            </div>
                            <span className="font-extrabold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)]">
                                EcoGuardian
                            </span>
                        </div>
                        <p className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
                            The future of urban sustainability. We use advanced AI to transform waste management into a clean, rewarding experience for everyone.
                        </p>
                        <div className="flex items-center gap-4">
                            {[
                                { Icon: Twitter, color: 'hover:text-[#1DA1F2]', href: '#' },
                                { Icon: Github, color: 'hover:text-[var(--text-primary)]', href: '#' },
                                { Icon: Linkedin, color: 'hover:text-[#0A66C2]', href: '#' }
                            ].map(({ Icon, color, href }, idx) => (
                                <a
                                    key={idx}
                                    href={href}
                                    className={`w-11 h-11 rounded-xl bg-[var(--bg-card)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-secondary)] ${color} hover:border-current hover:-translate-y-1 transition-all duration-300 group`}
                                >
                                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div className="lg:pl-8">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-[var(--text-primary)] mb-8 opacity-50">
                            Platform
                        </h4>
                        <ul className="space-y-5">
                            {[
                                { label: 'Dashboard', path: '/' },
                                { label: 'AI Scanner', path: '/scanner' },
                                { label: 'Rewards Hub', path: '/rewards' },
                                { label: 'Smart Insights', path: '/insights' }
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path} className="text-[var(--text-secondary)] hover:text-eco-500 transition-all duration-300 flex items-center gap-2 group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-eco-500 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                                        <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest text-[var(--text-primary)] mb-8 opacity-50">
                            Support
                        </h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 text-[var(--text-secondary)] group">
                                <div className="p-2 rounded-lg bg-eco-500/5 text-eco-500 group-hover:bg-eco-500 group-hover:text-white transition-colors duration-300">
                                    <MapPin className="w-4 h-4 shrink-0" />
                                </div>
                                <span className="text-sm">Smart City Hub, Collectorate Main Rd, Madurai, TN 625020</span>
                            </li>
                            <li className="flex items-center gap-4 text-[var(--text-secondary)] group">
                                <div className="p-2 rounded-lg bg-eco-500/5 text-eco-500 group-hover:bg-eco-500 group-hover:text-white transition-colors duration-300">
                                    <Phone className="w-4 h-4 shrink-0" />
                                </div>
                                <span className="text-sm">+91 452 123 4567</span>
                            </li>
                            <li className="flex items-center gap-4 text-[var(--text-secondary)] group">
                                <div className="p-2 rounded-lg bg-eco-500/5 text-eco-500 group-hover:bg-eco-500 group-hover:text-white transition-colors duration-300">
                                    <Mail className="w-4 h-4 shrink-0" />
                                </div>
                                <span className="text-sm">hello@ecoguardian.ai</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="bg-[var(--bg-card)] border border-[var(--glass-border)] p-8 rounded-3xl relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-eco-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <h4 className="font-bold text-lg mb-4 text-[var(--text-primary)] relative z-10">Stay Updated</h4>
                        <p className="text-sm text-[var(--text-secondary)] mb-6 relative z-10">
                            Get the latest updates on green initiatives and rewards.
                        </p>
                        <div className="relative z-10">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-[var(--bg-main)] border border-[var(--glass-border)] rounded-2xl px-5 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-eco-500/20 focus:border-eco-500 transition-all text-sm"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-eco-600 text-white px-4 rounded-xl hover:bg-eco-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-eco-500/20">
                                <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-sm text-[var(--text-secondary)] font-medium">
                        © {currentYear} <span className="text-[var(--text-primary)]">EcoGuardian</span>. Made with ❤️ in Madurai.
                    </p>
                    <div className="flex gap-10">
                        {['Privacy', 'Terms', 'Security'].map((item) => (
                            <a key={item} href="#" className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-eco-500 transition-all underline-offset-8 hover:underline decoration-eco-500/30">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
