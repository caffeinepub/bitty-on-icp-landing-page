import { Check, ChevronDown, Copy } from "lucide-react";
import { useState } from "react";
import ComingSoonModal from "./ComingSoonModal";

export default function TopNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [copied, setCopied] = useState(false);
  const contractId = "qroj6-lyaaa-aaaam-qeqta-cai";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  const openComingSoon = () => {
    setShowComingSoon(true);
    setIsOpen(false);
  };

  const handleCopyContractId = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(contractId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const menuItems = [
    { label: "GAMES", sectionId: "games", type: "scroll" as const },
    { label: "ROADMAP", sectionId: "the-journey", type: "scroll" as const },
    {
      label: "TOKEN DASHBOARD",
      sectionId: "token-dashboard",
      type: "scroll" as const,
    },
    { label: "BITTYICP BLING", type: "comingSoon" as const },
    { label: "CONTRACT ID", type: "contractId" as const },
  ];

  const handleMenuItemClick = (item: (typeof menuItems)[0]) => {
    if (item.type === "scroll") {
      scrollToSection(item.sectionId!);
    } else if (item.type === "comingSoon") {
      openComingSoon();
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 via-purple-800/95 to-indigo-900/95 backdrop-blur-md border-b-4 border-neon-orange shadow-neon-orange-intense">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16 sm:h-20">
            {/* A BITTY MORE Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-neon-orange hover:bg-neon-orange/90 text-white font-black text-base sm:text-lg md:text-xl rounded-full shadow-neon-orange-intense transform hover:scale-110 transition-all duration-300 border-4 border-white/30"
              >
                <span className="drop-shadow-glow-orange-intense relative z-10">
                  A BITTY MORE
                </span>
                <ChevronDown
                  className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 relative z-10 ${isOpen ? "rotate-180" : ""}`}
                />
                <div className="absolute inset-0 rounded-full bg-neon-orange opacity-0 group-hover:opacity-80 blur-2xl transition-opacity duration-300" />
              </button>

              {/* Dropdown */}
              {isOpen && (
                <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-[90vw] sm:w-[400px] md:w-[450px] bg-gradient-to-br from-purple-900/98 via-indigo-900/98 to-purple-800/98 backdrop-blur-xl rounded-3xl border-4 border-neon-orange shadow-neon-orange-intense p-4 sm:p-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  {/* Close overlay */}
                  <div
                    className="fixed inset-0 -z-10"
                    onClick={() => setIsOpen(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setIsOpen(false);
                    }}
                    role="presentation"
                  />

                  {/* Menu Items */}
                  <div className="space-y-2">
                    {menuItems.map((item) =>
                      item.type === "contractId" ? (
                        <div
                          key={item.label}
                          className="group relative w-full px-4 sm:px-6 py-3 sm:py-4 bg-neon-orange/20 hover:bg-neon-orange text-white font-bold text-base sm:text-lg rounded-xl shadow-lg transition-all duration-300 border-2 border-white/30 hover:border-white/50"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="drop-shadow-glow-orange-intense relative z-10 flex-shrink-0">
                              {item.label}
                            </span>
                            <button
                              type="button"
                              onClick={handleCopyContractId}
                              className="relative flex items-center gap-2 bg-neon-orange/30 hover:bg-neon-orange/50 text-white font-bold px-3 py-2 rounded-lg border-2 border-neon-orange/50 hover:border-neon-orange transition-all duration-300 shadow-neon-orange group/btn flex-shrink-0"
                              aria-label="Copy Contract ID"
                            >
                              <div className="absolute inset-0 rounded-lg bg-neon-orange opacity-0 group-hover/btn:opacity-30 blur-xl transition-opacity duration-300" />
                              {copied ? (
                                <>
                                  <Check className="h-4 w-4 relative z-10" />
                                  <span className="relative z-10 text-xs whitespace-nowrap drop-shadow-glow-orange">
                                    Copied!
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-4 w-4 relative z-10" />
                                  <span className="relative z-10 text-xs whitespace-nowrap drop-shadow-glow-orange">
                                    Copy
                                  </span>
                                </>
                              )}
                            </button>
                          </div>
                          <div className="absolute inset-0 rounded-xl bg-neon-orange opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
                        </div>
                      ) : (
                        <button
                          type="button"
                          key={item.label}
                          onClick={() => handleMenuItemClick(item)}
                          className="group relative w-full px-4 sm:px-6 py-3 sm:py-4 bg-neon-orange/20 hover:bg-neon-orange text-white font-bold text-base sm:text-lg rounded-xl shadow-lg transition-all duration-300 border-2 border-white/30 hover:border-white/50"
                        >
                          <span className="drop-shadow-glow-orange-intense relative z-10">
                            {item.label}
                          </span>
                          <div className="absolute inset-0 rounded-xl bg-neon-orange opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
      />
    </>
  );
}
