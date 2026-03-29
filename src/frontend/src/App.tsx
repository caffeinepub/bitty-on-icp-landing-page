import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import ContractId from "./components/ContractId";
import FeaturedCharacter from "./components/FeaturedCharacter";
import Footer from "./components/Footer";
import Games from "./components/Games";
import Hero from "./components/Hero";
import LegalDisclaimer from "./components/LegalDisclaimer";
import NewsBanner from "./components/NewsBanner";
import Partnerships from "./components/Partnerships";
import Socials from "./components/Socials";
import Story from "./components/Story";
import TokenDashboard from "./components/TokenDashboard";
import TopNavigation from "./components/TopNavigation";
import Whitepaper from "./components/Whitepaper";

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
      <NewsBanner />
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
