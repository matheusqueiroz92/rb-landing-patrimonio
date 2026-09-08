import { CookieBanner } from "@/components/layout/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { ProgressBar } from "@/components/layout/ProgressBar";
import { Autoridade } from "@/components/sections/Autoridade";
import { Diagnostico } from "@/components/sections/Diagnostico";
import { Etapas } from "@/components/sections/Etapas";
import { Faq } from "@/components/sections/Faq";
import { Fechamento } from "@/components/sections/Fechamento";
import { Frentes } from "@/components/sections/Frentes";
import { Hero } from "@/components/sections/Hero";
import { Pilares } from "@/components/sections/Pilares";
import { Riscos } from "@/components/sections/Riscos";
import { TrackingProvider } from "@/hooks/TrackingProvider";
import { useComBarraClass } from "@/hooks/useComBarraClass";

export function LandingPage() {
  useComBarraClass();

  return (
    <TrackingProvider>
      <ProgressBar />
      <Header />
      <main>
        <Hero />
        <Frentes />
        <Autoridade />
        <Riscos />
        <Pilares />
        <Diagnostico />
        <Etapas />
        <Faq />
        <Fechamento />
      </main>
      <Footer />
      <CookieBanner />
      <MobileCtaBar />
    </TrackingProvider>
  );
}
