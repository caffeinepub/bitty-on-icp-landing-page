import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar, ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import { useGetAllNewsUpdates } from "../hooks/useQueries";

export default function ProjectNewsUpdates() {
  const { data: newsUpdates, isLoading, error } = useGetAllNewsUpdates();

  const sortedUpdates =
    newsUpdates && newsUpdates.length > 0
      ? [...newsUpdates].sort((a, b) => Number(b.timestamp - a.timestamp))
      : [];

  const formatDate = (timestamp: bigint) => {
    try {
      const milliseconds = Number(timestamp) / 1_000_000;
      const date = new Date(milliseconds);
      if (Number.isNaN(date.getTime())) {
        const secondsDate = new Date(Number(timestamp) * 1000);
        if (!Number.isNaN(secondsDate.getTime())) {
          return secondsDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        }
        return "Date unavailable";
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (_e) {
      return "Date unavailable";
    }
  };

  const parseContent = (content: string) => {
    if (!content || typeof content !== "string") return [];
    const lines = content.split("\n").filter((line) => line.trim());
    const hasSections = lines.some(
      (line) =>
        !line.startsWith("-") &&
        lines.indexOf(line) < lines.length - 1 &&
        lines[lines.indexOf(line) + 1]?.startsWith("-"),
    );
    if (hasSections) {
      const sections = content.split("\n\n").filter((s) => s.trim());
      return sections.map((section) => {
        const sectionLines = section.split("\n");
        const heading = sectionLines[0] || "";
        const bullets = sectionLines
          .slice(1)
          .filter((line) => line.startsWith("-"));
        return { heading, bullets };
      });
    }
    const bullets = lines.filter((line) => line.startsWith("-"));
    return bullets.length > 0 ? [{ heading: "", bullets }] : [];
  };

  if (isLoading) {
    return (
      <section
        id="project-news-updates"
        className="relative py-20 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-neon-cyan rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-neon-pink rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 text-neon-cyan drop-shadow-glow-cyan animate-pulse-slow">
              PROJECT NEWS/UPDATES
            </h2>
          </div>
          <div className="relative px-4 sm:px-12 md:px-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-orange via-neon-cyan to-neon-pink rounded-3xl blur-xl opacity-60" />
              <div className="relative bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 md:p-16 border-4 border-neon-cyan shadow-neon-cyan">
                <div className="text-center space-y-6">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-glow-white">
                    Loading updates...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !sortedUpdates || sortedUpdates.length === 0) {
    return (
      <section
        id="project-news-updates"
        className="relative py-20 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-neon-cyan rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-neon-pink rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 text-neon-cyan drop-shadow-glow-cyan animate-pulse-slow">
              PROJECT NEWS/UPDATES
            </h2>
          </div>
          <div className="relative px-4 sm:px-12 md:px-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-orange via-neon-cyan to-neon-pink rounded-3xl blur-xl opacity-60" />
              <div className="relative bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 md:p-16 border-4 border-neon-cyan shadow-neon-cyan">
                <div className="flex justify-center mb-8">
                  <Newspaper className="w-16 h-16 text-neon-cyan drop-shadow-glow-cyan animate-pulse-slow" />
                </div>
                <div className="text-center space-y-6">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-glow-white">
                    Stay tuned for exciting updates!
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/80 drop-shadow-glow-white">
                    Project announcements and news will appear here. 🚀
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="project-news-updates"
      className="relative py-20 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-neon-cyan rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-neon-pink rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 text-neon-cyan drop-shadow-glow-cyan animate-pulse-slow">
            PROJECT NEWS/UPDATES
          </h2>
        </div>
        <div className="relative px-4 sm:px-12 md:px-16">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {sortedUpdates.map((update) => {
                const sections = parseContent(update.content);
                const formattedDate = formatDate(update.timestamp);
                return (
                  <CarouselItem
                    key={update.id.toString()}
                    className="pl-4 basis-full"
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-neon-orange via-neon-cyan to-neon-pink rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                      <div className="relative bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 md:p-16 border-4 border-neon-cyan shadow-neon-cyan">
                        <div className="flex justify-center mb-8">
                          <Newspaper className="w-16 h-16 text-neon-cyan drop-shadow-glow-cyan animate-pulse-slow" />
                        </div>
                        <div className="text-center mb-4">
                          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-neon-orange drop-shadow-glow-orange animate-pulse-slow">
                            {update.title}
                          </h3>
                        </div>
                        <div className="flex items-center justify-center gap-3 mb-8">
                          <Calendar className="w-5 h-5 text-neon-pink drop-shadow-glow-pink" />
                          <p className="text-lg sm:text-xl font-semibold text-neon-pink drop-shadow-glow-pink">
                            {formattedDate}
                          </p>
                        </div>
                        {sections.length > 0 ? (
                          <div className="space-y-8">
                            {sections.map((section) => (
                              <div
                                key={
                                  section.heading ||
                                  section.bullets[0] ||
                                  "section"
                                }
                                className="space-y-4"
                              >
                                {section.heading && (
                                  <h4 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-glow-white">
                                    {section.heading}
                                  </h4>
                                )}
                                {section.bullets.length > 0 && (
                                  <ul className="space-y-3 pl-6">
                                    {section.bullets.map((bullet) => (
                                      <li
                                        key={bullet}
                                        className="text-lg sm:text-xl text-white/90 drop-shadow-glow-white flex items-start"
                                      >
                                        <span className="text-neon-cyan mr-3 text-2xl drop-shadow-glow-cyan">
                                          •
                                        </span>
                                        <span>
                                          {bullet.replace(/^-\s*/, "")}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center">
                            <p className="text-lg sm:text-xl text-white/90 drop-shadow-glow-white whitespace-pre-line">
                              {update.content}
                            </p>
                          </div>
                        )}
                        <div className="mt-12 flex justify-center gap-4">
                          <div className="w-3 h-3 rounded-full bg-neon-orange shadow-neon-orange animate-pulse" />
                          <div className="w-3 h-3 rounded-full bg-neon-cyan shadow-neon-cyan animate-pulse animation-delay-200" />
                          <div className="w-3 h-3 rounded-full bg-neon-pink shadow-neon-pink animate-pulse animation-delay-400" />
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 sm:-left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-neon-orange to-neon-pink border-4 border-neon-cyan rounded-full shadow-neon-cyan hover:shadow-neon-orange transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-glow-white" />
            </CarouselPrevious>
            <CarouselNext className="absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-neon-orange to-neon-pink border-4 border-neon-cyan rounded-full shadow-neon-cyan hover:shadow-neon-orange transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-glow-white" />
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
