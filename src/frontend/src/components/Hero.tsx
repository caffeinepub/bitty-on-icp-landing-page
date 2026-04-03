import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import BankModal from "./BankModal";
import ComingSoonModal from "./ComingSoonModal";
import FireworksTitle from "./FireworksTitle";

export default function Hero() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showBank, setShowBank] = useState(false);

  const handleNewToICP = () => {
    window.open(
      "https://internetcomputer.org/nns",
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleTokenDashboardClick = () => {
    const tokenDashboardSection = document.getElementById("token-dashboard");
    if (tokenDashboardSection) {
      tokenDashboardSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleGamesClick = () => {
    const gamesSection = document.getElementById("games");
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDrawsClick = () => {
    window.open(
      "https://bitty-on-icp-giveaways-fef.caffeine.xyz/#/",
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleRoadmapClick = () => {
    const theJourneySection = document.getElementById("the-journey");
    if (theJourneySection) {
      theJourneySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBlingClick = () => {
    setShowComingSoon(true);
  };

  const handleBankClick = () => {
    setShowBank(true);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      <FireworksTitle />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-pink rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-neon-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-neon-cyan rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-pink via-neon-blue to-neon-cyan rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
          <div className="relative bg-gradient-to-br from-purple-800 to-purple-900 rounded-3xl p-4 border-4 border-neon-blue shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
            <img
              src="/assets/IMG_3987.jpeg"
              alt="Bitty - The Original Crypto Mascot"
              className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* HODLING SLOGAN - above NEW TO ICP button, baby blue glow */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
            <span
              className="block animate-pulse-slow"
              style={{
                fontFamily: "'Press Start 2P', cursive",
                letterSpacing: "0.05em",
                lineHeight: "1.6",
                color: "#FFFFFF",
                textShadow:
                  "0 0 20px #1E95CC, 0 0 40px #1E95CC, 0 0 60px #1E95CC",
              }}
            >
              WHEN YOU&apos;RE HODLING BITTY, YOUR HODLING HISTORY
            </span>
          </h2>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={handleBankClick}
            size="lg"
            className="bg-neon-blue hover:bg-neon-blue/80 text-white font-black text-xl px-12 py-8 rounded-full shadow-neon-blue-intense transform hover:scale-110 transition-all duration-300 border-4 border-purple-500 hover:border-purple-300 group relative"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300" />
            <Sparkles className="mr-2 h-6 w-6 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
            <span
              className="relative z-10"
              style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
            >
              BITTY ICP BANK
            </span>
            <Sparkles className="ml-2 h-6 w-6 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
          </Button>

          <Button
            onClick={handleNewToICP}
            size="lg"
            className="bg-neon-blue hover:bg-neon-blue/80 text-white font-black text-xl px-12 py-8 rounded-full shadow-neon-blue-intense transform hover:scale-110 transition-all duration-300 border-4 border-purple-500 hover:border-purple-300 group relative"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300" />
            <Sparkles className="mr-2 h-6 w-6 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
            <span
              className="relative z-10"
              style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
            >
              NEW TO ICP?
            </span>
            <Sparkles className="ml-2 h-6 w-6 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
          </Button>

          <Button
            onClick={handleTokenDashboardClick}
            size="lg"
            className="bg-neon-blue hover:bg-neon-blue/80 text-white font-black text-xl px-12 py-8 rounded-full shadow-neon-blue-intense transform hover:scale-110 transition-all duration-300 border-4 border-purple-500 hover:border-purple-300 group relative"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300" />
            <Sparkles className="mr-2 h-6 w-6 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
            <span
              className="relative z-10"
              style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
            >
              TOKEN DASHBOARD
            </span>
            <Sparkles className="ml-2 h-6 w-6 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
          </Button>

          <Button
            onClick={handleGamesClick}
            size="lg"
            className="bg-neon-blue hover:bg-neon-blue/80 text-white font-black text-xl px-12 py-8 rounded-full shadow-neon-blue-intense transform hover:scale-110 transition-all duration-300 border-4 border-purple-500 hover:border-purple-300 group relative"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300" />
            <Sparkles className="mr-2 h-6 w-6 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
            <span
              className="relative z-10"
              style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
            >
              GAMES
            </span>
            <Sparkles className="ml-2 h-6 w-6 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
          </Button>

          <Button
            onClick={handleDrawsClick}
            size="lg"
            className="bg-neon-blue hover:bg-neon-blue/80 text-white font-black text-xl px-12 py-8 rounded-full shadow-neon-blue-intense transform hover:scale-110 transition-all duration-300 border-4 border-purple-500 hover:border-purple-300 group relative"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300" />
            <Sparkles className="mr-2 h-6 w-6 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
            <span
              className="relative z-10"
              style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
            >
              BITTY ON ICP DRAWS
            </span>
            <Sparkles className="ml-2 h-6 w-6 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
          </Button>

          <Button
            onClick={handleRoadmapClick}
            size="lg"
            className="bg-neon-blue hover:bg-neon-blue/80 text-white font-black text-xl px-12 py-8 rounded-full shadow-neon-blue-intense transform hover:scale-110 transition-all duration-300 border-4 border-purple-500 hover:border-purple-300 group relative"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300" />
            <Sparkles className="mr-2 h-6 w-6 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
            <span
              className="relative z-10"
              style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
            >
              ROADMAP
            </span>
            <Sparkles className="ml-2 h-6 w-6 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
          </Button>

          <Button
            onClick={handleBlingClick}
            size="lg"
            className="bg-neon-blue hover:bg-neon-blue/80 text-white font-black text-xl px-12 py-8 rounded-full shadow-neon-blue-intense transform hover:scale-110 transition-all duration-300 border-4 border-purple-500 hover:border-purple-300 group relative"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300" />
            <Sparkles className="mr-2 h-6 w-6 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
            <span
              className="relative z-10"
              style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
            >
              BITTYICP BLING
            </span>
            <Sparkles className="ml-2 h-6 w-6 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
          </Button>
        </div>
      </div>

      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
      />

      <BankModal isOpen={showBank} onClose={() => setShowBank(false)} />
    </section>
  );
}
