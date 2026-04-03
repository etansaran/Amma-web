import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import LanguagePopup from "@/components/ui/LanguagePopup";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <LanguagePopup />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
