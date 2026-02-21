import { Card, CardContent } from '@/components/ui/card';

export default function Story() {
    const stories = [
        {
            title: 'The Genesis',
            description:
                'Bitty was there when Bitcoin was born — present at the first block mined. A witness to history, a legend in the making.',
            color: 'neon-orange'
        },
        {
            title: 'The Original',
            description:
                'He was the first meme mascot in crypto, featured on the original Bitcoin website. Before Doge, before Pepe, there was Bitty.',
            color: 'neon-pink'
        },
        {
            title: 'The Comeback',
            description:
                "Now, Bitty is making his comeback on the Internet Computer (ICP), ready to show other memes how it's done. The OG is back!",
            color: 'neon-cyan'
        }
    ];

    return (
        <section id="community" className="relative py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Section Title with Reduced Glow */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-4 softer-glow-title">
                        The Legend of{' '}
                        <span className="text-neon-orange softer-glow-orange">Bitty</span>
                    </h2>
                    <div className="w-32 h-2 bg-gradient-to-r from-neon-pink via-neon-orange to-neon-cyan mx-auto rounded-full" />
                </div>

                {/* Story Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stories.map((story, index) => {
                        return (
                            <Card
                                key={index}
                                className="bg-gradient-to-br from-purple-800/80 to-purple-900/80 border-4 border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group"
                            >
                                <CardContent className="p-8 text-center">
                                    <div className="inline-flex items-center justify-center w-20 h-20 mb-6 group-hover:rotate-12 transition-transform duration-300">
                                        <img
                                            src="/assets/generated/bitty-token-logo.dim_200x200.png"
                                            alt="Bitty Token Logo"
                                            className="w-full h-full object-contain rounded-full token-logo-glow"
                                        />
                                    </div>
                                    <h3
                                        className={`text-3xl font-black mb-4 text-${story.color} drop-shadow-glow-${story.color}`}
                                    >
                                        {story.title}
                                    </h3>
                                    <p className="text-lg text-white/90 leading-relaxed">
                                        {story.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
