import { SiX, SiTelegram, SiYoutube } from 'react-icons/si';
import { MessageCircle } from 'lucide-react';

export default function Socials() {
    const socialLinks = [
        {
            name: 'X',
            icon: SiX,
            url: 'https://x.com/bittyicp?s=21',
        },
        {
            name: 'OPENCHAT',
            icon: MessageCircle,
            url: 'https://oc.app/community/kwaop-qiaaa-aaaac-a464a-cai/?ref=6sgc5-taaaa-aaaac-apqaa-cai',
        },
        {
            name: 'TELEGRAM',
            icon: SiTelegram,
            url: 'https://t.me/BITTYONICP',
        },
        {
            name: 'YOUTUBE',
            icon: SiYoutube,
            url: 'https://youtube.com/@bittyicp?si=89gqkBLDxzQlak97',
        },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-md border-t-4 border-neon-cyan/30">
            <div className="max-w-6xl mx-auto px-4 py-2">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5">
                    <h3 className="text-neon-orange font-bold text-lg sm:text-xl drop-shadow-glow-orange tracking-wider">
                        SOCIALS
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;
                            
                            return (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border-2 border-neon-cyan/50 hover:border-neon-pink hover:bg-white/10 transition-all duration-300"
                                >
                                    <Icon className="h-4 w-4 text-neon-cyan group-hover:text-neon-pink transition-colors duration-300" />
                                    <span className="text-white font-semibold text-xs sm:text-sm drop-shadow-glow-cyan group-hover:drop-shadow-glow-pink transition-all duration-300">
                                        {social.name}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
