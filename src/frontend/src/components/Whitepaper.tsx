import { FileText, Rocket } from 'lucide-react';

export default function Whitepaper() {
    return (
        <section
            id="whitepaper"
            className="relative py-20 px-4 overflow-hidden"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-neon-pink rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-neon-cyan rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 text-neon-orange drop-shadow-glow-orange animate-pulse-slow">
                        ROADMAP
                    </h2>
                </div>

                {/* Content Container */}
                <div className="relative group">
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-pink via-neon-orange to-neon-cyan rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                    
                    {/* Main content box */}
                    <div className="relative bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 md:p-16 border-4 border-neon-cyan shadow-2xl">
                        {/* Icon decoration */}
                        <div className="flex justify-center gap-8 mb-8">
                            <FileText className="w-16 h-16 text-neon-orange drop-shadow-glow-orange animate-pulse-slow" />
                            <Rocket className="w-16 h-16 text-neon-cyan drop-shadow-glow-cyan animate-pulse-slow animation-delay-1000" />
                        </div>

                        {/* THE JOURNEY Tab - Clickable with ID for scrolling */}
                        <div id="the-journey" className="text-center">
                            <a
                                href="https://bittyicproadmap-3fj.caffeine.xyz/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-gradient-to-r from-purple-800 to-indigo-800 rounded-2xl px-12 py-6 border-4 border-neon-orange shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                            >
                                <p className="text-4xl sm:text-5xl md:text-6xl font-black animate-flash-orange-white">
                                    THE JOURNEY
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
