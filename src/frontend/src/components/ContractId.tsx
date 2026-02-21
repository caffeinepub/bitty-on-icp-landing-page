import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function ContractId() {
    const [copied, setCopied] = useState(false);
    const contractId = 'qroj6-lyaaa-aaaam-qeqta-cai';

    const handleCopyContractId = async () => {
        try {
            await navigator.clipboard.writeText(contractId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <section className="relative py-12 px-4 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-48 h-48 bg-neon-orange rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-neon-cyan rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Contract ID Display */}
                <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
                    <div className="flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-2xl px-8 py-6 border-4 border-white/40 shadow-neon-white-intense group hover:border-neon-orange transition-all duration-300">
                        <span 
                            className="text-white font-mono font-black text-lg sm:text-xl md:text-2xl break-all"
                            style={{
                                textShadow: '0 0 30px rgba(255, 255, 255, 0.9), 0 0 60px rgba(255, 255, 255, 0.7), 0 0 90px rgba(255, 255, 255, 0.5)'
                            }}
                        >
                            {contractId}
                        </span>
                        <button
                            onClick={handleCopyContractId}
                            className="relative flex items-center gap-2 bg-neon-orange/30 hover:bg-neon-orange/50 text-white font-black px-5 py-3 rounded-xl border-3 border-neon-orange hover:border-neon-orange transition-all duration-300 shadow-neon-orange-intense group/btn"
                            aria-label="Copy Contract ID"
                        >
                            <div className="absolute inset-0 rounded-xl bg-neon-orange opacity-0 group-hover/btn:opacity-40 blur-2xl transition-opacity duration-300" />
                            {copied ? (
                                <>
                                    <Check className="h-5 w-5 relative z-10" />
                                    <span className="relative z-10 text-base whitespace-nowrap drop-shadow-glow-orange-intense">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="h-5 w-5 relative z-10" />
                                    <span className="relative z-10 text-base whitespace-nowrap drop-shadow-glow-orange-intense">Copy</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
