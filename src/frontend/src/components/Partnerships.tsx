export default function Partnerships() {
    return (
        <section id="partnerships" className="relative w-full py-16 px-4 border-t border-white/10">
            {/* Background glow effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section Title - Pure White with Neon Glow - Increased font size */}
                <h2 
                    className="text-5xl md:text-6xl font-bold text-center mb-8"
                    style={{
                        color: '#FFFFFF',
                        textShadow: '0 0 20px var(--neon-orange), 0 0 40px var(--neon-orange)'
                    }}
                >
                    PARTNERSHIPS
                </h2>

                {/* Description Text - Increased font size */}
                <p 
                    className="text-center text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
                    style={{
                        color: 'oklch(0.85 0.05 280)',
                        textShadow: '0 0 8px rgba(255, 165, 0, 0.3)'
                    }}
                >
                    Thank you to the ongoing support and work together on the Internet Computer Protocol. 
                    Working alongside other Projects, Decentralized exchanges, and Wallets to ensure a brighter future on ICP.
                </p>

                {/* Partnership Links - Increased font size */}
                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                    <a
                        href="https://oisy.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl md:text-2xl font-semibold transition-all duration-300 hover:scale-110"
                        style={{
                            color: 'var(--neon-white)',
                            textShadow: '0 0 10px var(--neon-white), 0 0 20px var(--neon-white)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--neon-orange)';
                            e.currentTarget.style.textShadow = '0 0 15px var(--neon-orange), 0 0 30px var(--neon-orange)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--neon-white)';
                            e.currentTarget.style.textShadow = '0 0 10px var(--neon-white), 0 0 20px var(--neon-white)';
                        }}
                    >
                        Oisy.com
                    </a>

                    <a
                        href="https://plugwallet.ooo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl md:text-2xl font-semibold transition-all duration-300 hover:scale-110"
                        style={{
                            color: 'var(--neon-white)',
                            textShadow: '0 0 10px var(--neon-white), 0 0 20px var(--neon-white)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--neon-orange)';
                            e.currentTarget.style.textShadow = '0 0 15px var(--neon-orange), 0 0 30px var(--neon-orange)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--neon-white)';
                            e.currentTarget.style.textShadow = '0 0 10px var(--neon-white), 0 0 20px var(--neon-white)';
                        }}
                    >
                        plugwallet.ooo
                    </a>

                    <a
                        href="https://icpswap.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl md:text-2xl font-semibold transition-all duration-300 hover:scale-110"
                        style={{
                            color: 'var(--neon-white)',
                            textShadow: '0 0 10px var(--neon-white), 0 0 20px var(--neon-white)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--neon-orange)';
                            e.currentTarget.style.textShadow = '0 0 15px var(--neon-orange), 0 0 30px var(--neon-orange)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--neon-white)';
                            e.currentTarget.style.textShadow = '0 0 10px var(--neon-white), 0 0 20px var(--neon-white)';
                        }}
                    >
                        ICPSWAP.com
                    </a>

                    <a
                        href="https://icptokens.net"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl md:text-2xl font-semibold transition-all duration-300 hover:scale-110"
                        style={{
                            color: 'var(--neon-white)',
                            textShadow: '0 0 10px var(--neon-white), 0 0 20px var(--neon-white)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--neon-orange)';
                            e.currentTarget.style.textShadow = '0 0 15px var(--neon-orange), 0 0 30px var(--neon-orange)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--neon-white)';
                            e.currentTarget.style.textShadow = '0 0 10px var(--neon-white), 0 0 20px var(--neon-white)';
                        }}
                    >
                        icptokens.net
                    </a>

                    <a
                        href="https://caffeine.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl md:text-2xl font-semibold transition-all duration-300 hover:scale-110"
                        style={{
                            color: 'var(--neon-white)',
                            textShadow: '0 0 10px var(--neon-white), 0 0 20px var(--neon-white)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--neon-orange)';
                            e.currentTarget.style.textShadow = '0 0 15px var(--neon-orange), 0 0 30px var(--neon-orange)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--neon-white)';
                            e.currentTarget.style.textShadow = '0 0 10px var(--neon-white), 0 0 20px var(--neon-white)';
                        }}
                    >
                        CAFFEINE.AI
                    </a>
                </div>
            </div>
        </section>
    );
}
