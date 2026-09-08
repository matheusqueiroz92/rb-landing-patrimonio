import { MeasurementScripts } from "@/components/layout/MeasurementScripts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { PoliticaPage } from "@/pages/PoliticaPage";

export function App() {
  return (
    <BrowserRouter>
      <MeasurementScripts />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/politica-de-privacidade" element={<PoliticaPage />} />
      </Routes>
    </BrowserRouter>
  );
}
