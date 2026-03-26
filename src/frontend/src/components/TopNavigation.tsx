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
    { label: "CANISTER ID", type: "contractId" as const },
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 via-purple-800/95 to-indigo-900/95 backdrop-blur-md border-b-4 border-neon-blue shadow-neon-blue-intense">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16 sm:h-20">
            {/* A BITTY MORE Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="group relative inline-flex items-center gap-3 px-10 sm:px-14 py-3 sm:py-4 bg-neon-blue hover:bg-neon-blue/80 font-black text-base sm:text-lg md:text-xl rounded-full transform hover:scale-110 transition-all duration-300 border-4 animate-shimmer-border"
                style={{ color: "#581c87" }}
              >
                <span
                  className="relative z-10"
                  style={{
                    textShadow: "0 0 6px rgba(255,255,255,0.25)",
                    color: "#581c87",
                  }}
                >
                  A BITTY MORE
                </span>
                <ChevronDown
                  className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 relative z-10 ${isOpen ? "rotate-180" : ""}`}
                  style={{ color: "#581c87" }}
                />
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300" />
              </button>

              {/* Dropdown */}
              {isOpen && (
                <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-[90vw] sm:w-[400px] md:w-[450px] bg-gradient-to-br from-purple-900/98 via-indigo-900/98 to-purple-800/98 backdrop-blur-xl rounded-3xl border-4 border-neon-blue shadow-neon-blue-intense p-4 sm:p-6 animate-in fade-in slide-in-from-top-2 duration-300">
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
                          className="group relative w-full px-4 sm:px-6 py-3 sm:py-4 bg-neon-blue/20 hover:bg-neon-blue text-white font-bold text-base sm:text-lg rounded-xl shadow-lg transition-all duration-300 border-2 border-purple-500 hover:border-purple-300"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span
                              className="relative z-10 flex-shrink-0"
                              style={{
                                textShadow: "0 0 8px rgba(255,255,255,0.4)",
                              }}
                            >
                              {item.label}
                            </span>
                            <button
                              type="button"
                              onClick={handleCopyContractId}
                              className="relative flex items-center gap-2 bg-neon-blue/30 hover:bg-neon-blue/60 text-white font-bold px-3 py-2 rounded-lg border-2 border-neon-blue/50 hover:border-white/60 transition-all duration-300 shadow-neon-blue group/btn flex-shrink-0"
                              aria-label="Copy Contract ID"
                            >
                              <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover/btn:opacity-10 blur-xl transition-opacity duration-300" />
                              {copied ? (
                                <>
                                  <Check className="h-4 w-4 relative z-10" />
                                  <span
                                    className="relative z-10 text-xs whitespace-nowrap"
                                    style={{
                                      textShadow:
                                        "0 0 8px rgba(255,255,255,0.4)",
                                    }}
                                  >
                                    Copied!
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-4 w-4 relative z-10" />
                                  <span
                                    className="relative z-10 text-xs whitespace-nowrap"
                                    style={{
                                      textShadow:
                                        "0 0 8px rgba(255,255,255,0.4)",
                                    }}
                                  >
                                    Copy
                                  </span>
                                </>
                              )}
                            </button>
                          </div>
                          <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300" />
                        </div>
                      ) : (
                        <button
                          type="button"
                          key={item.label}
                          onClick={() => handleMenuItemClick(item)}
                          className="group relative w-full px-4 sm:px-6 py-3 sm:py-4 bg-neon-blue/20 hover:bg-neon-blue text-white font-bold text-base sm:text-lg rounded-xl shadow-lg transition-all duration-300 border-2 border-purple-500 hover:border-purple-300"
                        >
                          <span
                            className="relative z-10"
                            style={{
                              textShadow: "0 0 8px rgba(255,255,255,0.4)",
                            }}
                          >
                            {item.label}
                          </span>
                          <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300" />
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
