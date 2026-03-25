import { X } from "lucide-react";
import { useEffect } from "react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComingSoonModal({
  isOpen,
  onClose,
}: ComingSoonModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      role="presentation"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-4xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="presentation"
      >
        {/* Animated glow background */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-pink via-neon-orange to-neon-cyan rounded-3xl blur-3xl opacity-60 animate-pulse" />

        {/* Modal content */}
        <div className="relative bg-black rounded-3xl border-4 border-neon-orange shadow-neon-orange-intense p-4 sm:p-6 md:p-8">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full bg-neon-orange/20 hover:bg-neon-orange text-white transition-all duration-300 transform hover:scale-110 hover:rotate-90 border-2 border-white/30 z-20"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Image Content */}
          <div className="relative">
            {/* Enhanced glow effect around image */}
            <div className="absolute inset-0 bg-neon-orange rounded-2xl blur-2xl opacity-50" />

            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden border-4 border-neon-orange shadow-neon-orange-intense">
              <img
                src="/assets/IMG_4554.jpeg"
                alt="BITTYICP BLING"
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>
          </div>

          {/* Coming Soon Text */}
          <div className="mt-6 sm:mt-8 text-center">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-wider"
              style={{
                textShadow: `
                                    0 0 10px oklch(0.75 0.25 35),
                                    0 0 20px oklch(0.75 0.25 35),
                                    0 0 30px oklch(0.75 0.25 35),
                                    0 0 40px oklch(0.75 0.25 35)
                                `,
              }}
            >
              BITTY BLING COMING SOON
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
