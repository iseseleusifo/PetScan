// src/App.tsx
import React, { useState } from "react";
import BottomNav from "./components/BottomNav";
import Onboarding from "./pages/Onboarding";
import Scanner from "./pages/Scanner";
import ScanResult from "./pages/ScanResult";
import History from "./pages/History";
import Profile from "./pages/Profile";

type Page = "onboarding" | "scanner" | "result" | "history" | "profile";

interface ScanResultData {
  barcode: string;
  product: {
    name: string;
    brand: string;
    image: string | null;
  };
  safety: "safe" | "caution" | "danger";
  warnings: Array<{
    ingredient: string;
    severity: string;
    message: string;
  }>;
  safeIngredients: string[];
  petName: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("onboarding");
  const [scanResult, setScanResult] = useState<ScanResultData | null>(null);

  const handleScanComplete = (result: ScanResultData) => {
    setScanResult(result);
    setCurrentPage("result");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "onboarding":
        return <Onboarding onComplete={() => setCurrentPage("scanner")} />;
      case "scanner":
        return <Scanner onScanComplete={handleScanComplete} />;
      case "result":
        return (
          <ScanResult
            result={scanResult}
            onBack={() => setCurrentPage("scanner")}
          />
        );
      case "history":
        return <History onSelectItem={handleScanComplete} />;
      case "profile":
        return <Profile />;
      default:
        return <Scanner onScanComplete={handleScanComplete} />;
    }
  };

  const showNav = currentPage !== "onboarding" && currentPage !== "result";

  return (
    <div className="min-h-screen bg-stone-100">
      {renderPage()}
      {showNav && (
        <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
    </div>
  );
}
