import { Gamepad2 } from "lucide-react";

export default function Games() {
  return (
    <section id="games" className="relative py-20 px-4 mb-20 overflow-hidden">
      {/* Background Image - Bitcoin Miner Arcade Machine */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/assets/generated/IMG_3988.jpeg)" }}
      />

      {/* Gradient Overlay for better text visibility and neon blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 via-purple-800/60 to-purple-900/70" />

      {/* Animated Blobs for neon aesthetic */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-neon-pink/15 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-neon-cyan/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-orange/15 rounded-full blur-3xl animate-blob animation-delay-4000" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-orange to-neon-cyan drop-shadow-glow-cyan mb-4 animate-pulse-slow">
            GAMES
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Gamepad2 className="h-12 w-12 text-neon-cyan drop-shadow-glow-cyan animate-bounce" />
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-neon-orange drop-shadow-glow-orange">
              LEVEL UP WITH BITTY
            </p>
            <Gamepad2 className="h-12 w-12 text-neon-pink drop-shadow-glow-pink animate-bounce animation-delay-1000" />
          </div>
        </div>

        {/* Game Links Container */}
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* BITTY DUCK BLAST Game Link */}
          <div className="bg-gradient-to-br from-purple-800/70 to-purple-900/70 backdrop-blur-md border-4 border-neon-cyan/50 rounded-3xl p-8 shadow-2xl hover:border-neon-pink/70 transition-all duration-300">
            <a
              href="https://bittyduckblast-m2n.caffeine.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <p className="arcade-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-neon-orange leading-relaxed group-hover:scale-105 transition-transform duration-300">
                BITTY DUCK BLAST
              </p>
            </a>
          </div>

          {/* FLY BITTY FLY Game Link */}
          <div className="bg-gradient-to-br from-purple-800/70 to-purple-900/70 backdrop-blur-md border-4 border-neon-cyan/50 rounded-3xl p-8 shadow-2xl hover:border-neon-pink/70 transition-all duration-300">
            <a
              href="https://flybittyfly-qkh.caffeine.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <p className="arcade-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-neon-orange leading-relaxed group-hover:scale-105 transition-transform duration-300">
                FLY BITTY FLY
              </p>
            </a>
          </div>

          {/* BITTY BUILDER Game Link */}
          <div className="bg-gradient-to-br from-purple-800/70 to-purple-900/70 backdrop-blur-md border-4 border-neon-cyan/50 rounded-3xl p-8 shadow-2xl hover:border-neon-pink/70 transition-all duration-300">
            <a
              href="https://bitty-builder-i3o.caffeine.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <p className="arcade-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-neon-orange leading-relaxed group-hover:scale-105 transition-transform duration-300">
                BITTY BUILDER
              </p>
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center gap-4">
          <div className="w-3 h-3 bg-neon-pink rounded-full animate-ping" />
          <div className="w-3 h-3 bg-neon-orange rounded-full animate-ping animation-delay-1000" />
          <div className="w-3 h-3 bg-neon-cyan rounded-full animate-ping animation-delay-2000" />
        </div>
      </div>
    </section>
  );
}
