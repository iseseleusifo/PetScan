import React from "react";
import {
  ArrowLeft,
  Camera,
  Search,
  CheckCircle,
  AlertTriangle,
  Pill,
  Dog,
  Droplets,
} from "lucide-react";

interface DosageItem {
  weight: string;
  amount: string;
}

interface Warning {
  ingredient?: string;
  message?: string;
}

interface ScanResultProps {
  result: {
    barcode: string;
    product: {
      name: string;
      brand: string;
      type?: string;
      image?: string | null;
    };
    safety: "safe" | "caution" | "danger";
    ingredients?: string[];
    safeIngredients?: string[];
    warnings?: (string | Warning)[];
    dosage?: DosageItem[];
    safeFor?: string;
    petName?: string;
  };
  onBack: () => void;
  onScanAgain?: () => void;
  onSearch?: () => void;
}

export default function ScanResult({
  result,
  onBack,
  onScanAgain,
  onSearch,
}: ScanResultProps) {
  if (!result) return null;

  const isSafe = result.safety === "safe";
  const isCaution = result.safety === "caution";
  const isDanger = result.safety === "danger";

  // Combine ingredients from either format
  const allIngredients = result.ingredients || result.safeIngredients || [];

  // Normalize warnings to string array
  const warningMessages: string[] = result.warnings
    ? result.warnings.map((w) => (typeof w === "string" ? w : w.message || ""))
    : [];

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="bg-emerald-900 text-white px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-amber-200 hover:text-white transition"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-lg font-bold tracking-wide">PetScan</h1>
          <div className="w-16"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Safety Banner */}
        <div
          className={`rounded-xl p-4 flex items-center gap-3 ${
            isSafe
              ? "bg-emerald-100 border-2 border-emerald-400"
              : isDanger
              ? "bg-red-100 border-2 border-red-400"
              : "bg-orange-100 border-2 border-orange-400"
          }`}
        >
          {isSafe ? (
            <CheckCircle className="text-emerald-600 flex-shrink-0" size={32} />
          ) : (
            <AlertTriangle
              className={`flex-shrink-0 ${
                isDanger ? "text-red-600" : "text-orange-600"
              }`}
              size={32}
            />
          )}
          <div>
            <p
              className={`font-bold text-lg ${
                isSafe
                  ? "text-emerald-800"
                  : isDanger
                  ? "text-red-800"
                  : "text-orange-800"
              }`}
            >
              {isSafe
                ? "Safe for Pets"
                : isDanger
                ? "Dangerous for Pets"
                : "Use With Caution"}
            </p>
            <p
              className={`text-sm ${
                isSafe
                  ? "text-emerald-700"
                  : isDanger
                  ? "text-red-700"
                  : "text-orange-700"
              }`}
            >
              {result.safeFor ||
                (result.petName ? `Checked for ${result.petName}` : "")}
            </p>
          </div>
        </div>

        {/* Product Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Product Header */}
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 p-4">
            <div className="flex items-start gap-3">
              <div className="bg-amber-200 rounded-lg p-3">
                <Droplets className="text-emerald-800" size={28} />
              </div>
              <div className="flex-1">
                <span className="text-amber-200 text-xs font-semibold uppercase tracking-wider">
                  {result.product.type || "Product"}
                </span>
                <h2 className="text-white text-xl font-bold mt-1">
                  {result.product.name}
                </h2>
                <p className="text-emerald-200 text-sm mt-1">
                  by {result.product.brand}
                </p>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          {allIngredients.length > 0 && (
            <div className="p-4 border-b border-stone-200">
              <h3 className="text-emerald-900 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                <Pill size={16} />
                Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {allIngredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dosage */}
          {result.dosage && result.dosage.length > 0 && (
            <div className="p-4 border-b border-stone-200">
              <h3 className="text-emerald-900 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                <Dog size={16} />
                Dosage Guide
              </h3>
              <div className="space-y-2">
                {result.dosage.map((dose, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-amber-50 rounded-lg px-4 py-3"
                  >
                    <span className="text-stone-600 font-medium">
                      {dose.weight}
                    </span>
                    <span className="text-emerald-800 font-bold">
                      {dose.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warnings */}
          {warningMessages.length > 0 && (
            <div className="p-4 bg-orange-50">
              <h3 className="text-orange-800 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                <AlertTriangle size={16} />
                Warnings
              </h3>
              <ul className="space-y-2">
                {warningMessages.map((warning, index) => (
                  <li
                    key={index}
                    className="text-orange-700 text-sm flex items-start gap-2"
                  >
                    <span className="text-orange-400 mt-1">•</span>
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Barcode Info */}
        <p className="text-center text-stone-400 text-xs">
          Barcode: {result.barcode}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onScanAgain}
            className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition shadow-lg"
          >
            <Camera size={20} />
            Scan Another
          </button>
          <button
            onClick={onSearch}
            className="flex-1 bg-amber-200 hover:bg-amber-300 text-emerald-900 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition shadow-lg"
          >
            <Search size={20} />
            Search
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-stone-400 text-xs">
        Always consult your veterinarian for medical advice
      </footer>
    </div>
  );
}
