import { useState } from "react";

export default function NewsBanner() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Flying NEWS Banner */}
      <div className="fixed top-16 sm:top-20 left-0 right-0 z-40 overflow-hidden pointer-events-none h-10">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="pointer-events-auto animate-fly-news inline-flex items-center gap-3 px-6 py-1.5 rounded-full cursor-pointer"
          style={{
            background: "rgba(30, 10, 60, 0.92)",
            border: "2px solid #FFD700",
            boxShadow: "0 0 12px #FFD700, 0 0 24px rgba(255,215,0,0.4)",
            whiteSpace: "nowrap",
          }}
          data-ocid="news.open_modal_button"
        >
          <span
            className="text-sm font-bold tracking-widest"
            style={{
              color: "#FFD700",
              textShadow: "0 0 8px #FFD700, 0 0 16px rgba(255,215,0,0.5)",
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "0.6rem",
            }}
          >
            📰 NEWS — CLICK TO READ LATEST UPDATES 📰
          </span>
        </button>
      </div>

      {/* News Modal */}
      {showModal && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center p-4 w-full h-full max-w-none m-0 bg-transparent"
          style={{ background: "rgba(10, 0, 30, 0.85)" }}
          onKeyDown={(e) => e.key === "Escape" && setShowModal(false)}
          data-ocid="news.modal"
        >
          {/* Backdrop click */}
          <div
            className="absolute inset-0"
            onClick={() => setShowModal(false)}
            onKeyDown={(e) => e.key === "Escape" && setShowModal(false)}
            aria-hidden="true"
          />
          <div
            className="relative z-10 w-full max-w-lg rounded-3xl p-6 sm:p-8"
            style={{
              background:
                "linear-gradient(135deg, #1a0040 0%, #0d0030 50%, #1a0050 100%)",
              border: "2px solid #FFD700",
              boxShadow:
                "0 0 30px #FFD700, 0 0 60px rgba(255,215,0,0.3), inset 0 0 20px rgba(255,215,0,0.05)",
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(255,215,0,0.15)",
                border: "1px solid #FFD700",
                color: "#FFD700",
              }}
              data-ocid="news.close_button"
            >
              ✕
            </button>

            {/* Title */}
            <h2
              className="text-center font-black mb-6 leading-tight"
              style={{
                color: "#FFD700",
                textShadow: "0 0 12px #FFD700, 0 0 24px rgba(255,215,0,0.5)",
                fontFamily: "'Press Start 2P', cursive",
                fontSize: "0.75rem",
                lineHeight: 1.6,
              }}
            >
              WHAT A GREAT DAY IT IS TO BE PART OF BITTY ON ICP!
            </h2>

            {/* Divider */}
            <div
              className="w-full h-px mb-6"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #FFD700, #a78bfa, transparent)",
              }}
            />

            {/* Bullet items */}
            <div className="space-y-5">
              {/* Bullet 1 — Tournament */}
              <a
                href="https://bitty-builder-i3o.caffeine.xyz/#caffeineAdminToken=e747cadb56a2ce294fd1db85f28f9d05cfbfde3dc933d403e5e036244e4b211b"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
                data-ocid="news.link.1"
              >
                <span className="text-xl flex-shrink-0 mt-0.5">🎮</span>
                <span
                  className="font-bold leading-snug group-hover:underline transition-all duration-200"
                  style={{
                    color: "#7dd3fc",
                    textShadow: "0 0 8px rgba(125,211,252,0.5)",
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: "0.6rem",
                    lineHeight: 1.8,
                  }}
                >
                  TOURNAMENT IS LIVE — GO TO GAMES AND PLAY BITTY BUILDER!
                </span>
              </a>

              {/* Bullet 2 — Bank */}
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">🏦</span>
                <span
                  className="font-bold leading-snug"
                  style={{
                    color: "#c4b5fd",
                    textShadow: "0 0 8px rgba(196,181,253,0.5)",
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: "0.6rem",
                    lineHeight: 1.8,
                  }}
                >
                  BITTY ICP BANK COMING SOON!!!
                </span>
              </div>
            </div>

            {/* Bottom glow line */}
            <div
              className="w-full h-px mt-6"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #a78bfa, #FFD700, transparent)",
              }}
            />
          </div>
        </dialog>
      )}
    </>
  );
}
