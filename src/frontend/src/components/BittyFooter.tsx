export default function BittyFooter() {
    return (
        <section className="relative w-full overflow-hidden">
            {/* Animated background glow effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-orange rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-neon-cyan rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            </div>

            {/* Image Container */}
            <div className="relative z-10 w-full">
                <div className="relative">
                    {/* Main Image with Enhanced Pulsing Animation */}
                    <img
                        src="/assets/generated/bitty-theme-music.mp3"
                        alt="Bitty - The OG Crypto Mascot"
                        className="w-full h-auto object-cover animate-bitty-pulse-ultra"
                        loading="lazy"
                    />
                </div>
            </div>

            {/* Bottom gradient fade effect */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900 to-transparent pointer-events-none" />
        </section>
    );
}
