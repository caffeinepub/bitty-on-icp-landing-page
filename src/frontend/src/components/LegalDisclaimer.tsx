export default function LegalDisclaimer() {
    return (
        <section className="relative w-full py-12 px-4 border-t border-white/10">
            {/* Subtle background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
            </div>

            {/* Disclaimer Text */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <p className="text-sm text-white/60 leading-relaxed" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}>
                    <strong>Legal Disclaimer:</strong> $BITTYICP is a meme coin with no intrinsic value or expectation of financial return. 
                    $BITTYICP is for entertainment purposes only. When you purchase $BITTYICP, you are agreeing that you have seen this disclaimer.
                </p>
            </div>
        </section>
    );
}

