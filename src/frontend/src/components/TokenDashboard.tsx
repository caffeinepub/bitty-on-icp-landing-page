import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface DexscreenerPair {
  priceUsd: string;
  volume: { h24: number };
  fdv: number;
  marketCap?: number;
}

export default function TokenDashboard() {
  const [dexData, setDexData] = useState<DexscreenerPair | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDexscreenerData = async () => {
      try {
        const response = await fetch(
          "https://api.dexscreener.com/latest/dex/pairs/icp/wkyqn-qqaaa-aaaar-qbyxq-cai",
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        if (data.pair) {
          setDexData(data.pair);
          setError(false);
        } else if (data.pairs && data.pairs.length > 0) {
          setDexData(data.pairs[0]);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Dexscreener API error:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDexscreenerData();
    const interval = setInterval(fetchDexscreenerData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number | undefined) => {
    if (num === undefined || num === null) return "$0.00";
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(2)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price: string | undefined) => {
    if (!price) return "$0.00000000";
    const value = Number.parseFloat(price);
    if (value < 0.00000001) {
      return `$${value.toExponential(2)}`;
    }
    return `$${value.toFixed(8)}`;
  };

  return (
    <section
      id="token-dashboard"
      className="relative py-20 px-4 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-neon-orange rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-neon-purple rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <h2
          className="text-5xl md:text-6xl font-bold text-center mb-8"
          style={{
            color: "#FFFFFF",
            textShadow:
              "0 0 20px var(--neon-orange), 0 0 40px var(--neon-orange)",
          }}
        >
          TOKEN DASHBOARD
        </h2>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Live Metrics from Dexscreener */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-orange via-neon-pink to-neon-cyan rounded-3xl blur-xl opacity-60" />
                <div className="relative bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-neon-orange shadow-neon-orange">
                  <div className="text-center space-y-4">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-neon-orange border-t-transparent" />
                    <p className="text-xl font-bold text-white drop-shadow-glow-white">
                      Loading live data from Dexscreener...
                    </p>
                  </div>
                </div>
              </div>
            ) : error || !dexData ? (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-orange via-neon-pink to-neon-cyan rounded-3xl blur-xl opacity-60" />
                <div className="relative bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-neon-orange shadow-neon-orange">
                  <div className="text-center space-y-4">
                    <p className="text-2xl font-bold text-white drop-shadow-glow-white">
                      Live data temporarily unavailable
                    </p>
                    <p className="text-sm text-white/60 drop-shadow-glow-white">
                      Please check back shortly or view the chart below
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Current Price */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-neon-orange rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-neon-orange shadow-neon-orange">
                    <h3 className="text-xl font-bold text-white/80 drop-shadow-glow-white mb-2">
                      Current Price
                    </h3>
                    <p className="text-4xl font-black text-white drop-shadow-glow-orange-intense">
                      {formatPrice(dexData.priceUsd)}
                    </p>
                    <p className="text-xs text-white/50 mt-2">
                      Live from Dexscreener
                    </p>
                  </div>
                </div>

                {/* 24h Volume */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-neon-orange rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-neon-orange shadow-neon-orange">
                    <h3 className="text-xl font-bold text-white/80 drop-shadow-glow-white mb-2">
                      24h Volume
                    </h3>
                    <p className="text-4xl font-black text-white drop-shadow-glow-orange-intense">
                      {formatNumber(dexData.volume?.h24)}
                    </p>
                    <p className="text-xs text-white/50 mt-2">
                      Trading volume last 24 hours
                    </p>
                  </div>
                </div>

                {/* Market Cap */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-neon-orange rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-neon-orange shadow-neon-orange">
                    <h3 className="text-xl font-bold text-white/80 drop-shadow-glow-white mb-2">
                      Market Cap
                    </h3>
                    <p className="text-4xl font-black text-white drop-shadow-glow-orange-intense">
                      {formatNumber(dexData.marketCap || dexData.fdv)}
                    </p>
                    <p className="text-xs text-white/50 mt-2">
                      Fully Diluted Valuation
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* ICPSwap Link */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-orange via-neon-pink to-neon-cyan rounded-2xl blur-xl opacity-60" />
              <div className="relative bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-neon-orange shadow-neon-orange">
                <div className="text-center">
                  <a
                    href="https://app.icpswap.com/swap/pro?input=ryjl3-tyaaa-aaaaa-aaaba-cai&output=qroj6-lyaaa-aaaam-qeqta-cai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-orange to-neon-pink rounded-full text-white font-bold shadow-neon-orange hover:shadow-neon-pink transition-all duration-300 hover:scale-105"
                  >
                    <span>Trade on ICPSwap</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Dexscreener Embedded Chart */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-orange rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm rounded-3xl p-4 border-4 border-neon-cyan shadow-neon-cyan h-full">
              <iframe
                src="https://dexscreener.com/icp/wkyqn-qqaaa-aaaar-qbyxq-cai?embed=1&theme=dark&trades=0&info=0"
                className="w-full rounded-2xl"
                style={{ minHeight: "600px", height: "100%" }}
                title="Dexscreener Live Chart"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Auto-refresh indicator */}
        <div className="mt-8 text-center">
          <p className="text-sm text-white/60 drop-shadow-glow-white">
            Live data from Dexscreener • Auto-refreshes every 30 seconds • Token
            Pair: wkyqn-qqaaa-aaaar-qbyxq-cai
          </p>
        </div>
      </div>
    </section>
  );
}
