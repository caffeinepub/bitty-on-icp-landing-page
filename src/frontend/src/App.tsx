import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import TopNavigation from './components/TopNavigation';
import Hero from './components/Hero';
import FeaturedCharacter from './components/FeaturedCharacter';
import Story from './components/Story';
import Games from './components/Games';
import Whitepaper from './components/Whitepaper';
import TokenDashboard from './components/TokenDashboard';
import ContractId from './components/ContractId';
import Partnerships from './components/Partnerships';
import LegalDisclaimer from './components/LegalDisclaimer';
import Footer from './components/Footer';
import Socials from './components/Socials';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <TopNavigation />
      <div className="pt-16 sm:pt-20">
        <Hero />
        <FeaturedCharacter />
        <Story />
        <Games />
        <Whitepaper />
        <TokenDashboard />
        <ContractId />
        <Partnerships />
        <LegalDisclaimer />
        <Footer />
      </div>
      <Socials />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <AppContent />
        <Toaster position="top-center" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
