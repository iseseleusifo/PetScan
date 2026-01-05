import React from "react";
import {
  ShieldX,
  ShieldAlert,
  ShieldCheck,
  Clock,
  Trash2,
  ChevronRight,
} from "lucide-react";

interface HistoryItem {
  id: number;
  barcode: string;
  product: { name: string; brand: string; type?: string };
  safety: "safe" | "caution" | "danger";
  warnings: { ingredient: string; severity?: string; message: string }[];
  safeIngredients: string[];
  petName: string;
  scannedAt: string;
}

interface HistoryProps {
  onSelectItem: (result: HistoryItem) => void;
}

export default function History({ onSelectItem }: HistoryProps) {
  const mockHistory: HistoryItem[] = [
    {
      id: 1,
      barcode: "012345678905",
      product: { name: "Creamy Peanut Butter", brand: "Jif", type: "Food" },
      safety: "danger",
      warnings: [
        {
          ingredient: "Xylitol",
          severity: "critical",
          message: "Extremely toxic to dogs.",
        },
      ],
      safeIngredients: ["Peanuts", "Salt"],
      petName: "Max",
      scannedAt: "2 hours ago",
    },
    {
      id: 2,
      barcode: "098765432101",
      product: { name: "Baby Carrots", brand: "Bolthouse Farms", type: "Food" },
      safety: "safe",
      warnings: [],
      safeIngredients: ["Carrots"],
      petName: "Max",
      scannedAt: "Yesterday",
    },
    {
      id: 3,
      barcode: "111222333444",
      product: { name: "Dark Chocolate Bar", brand: "Lindt", type: "Food" },
      safety: "danger",
      warnings: [
        {
          ingredient: "Chocolate",
          severity: "critical",
          message: "Toxic to dogs and cats.",
        },
      ],
      safeIngredients: [],
      petName: "Bella",
      scannedAt: "3 days ago",
    },
    {
      id: 4,
      barcode: "555666777888",
      product: { name: "Plain Greek Yogurt", brand: "Fage", type: "Food" },
      safety: "caution",
      warnings: [
        {
          ingredient: "Lactose",
          severity: "moderate",
          message: "May cause digestive upset in some pets.",
        },
      ],
      safeIngredients: ["Milk", "Cultures"],
      petName: "Max",
      scannedAt: "1 week ago",
    },
  ];

  const safetyConfig = {
    danger: {
      icon: ShieldX,
      color: "text-red-600",
      bg: "bg-red-100",
      border: "border-red-200",
      label: "Dangerous",
    },
    caution: {
      icon: ShieldAlert,
      color: "text-orange-600",
      bg: "bg-orange-100",
      border: "border-orange-200",
      label: "Caution",
    },
    safe: {
      icon: ShieldCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      border: "border-emerald-200",
      label: "Safe",
    },
  };

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="bg-emerald-900 text-white px-4 py-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold tracking-wide">Scan History</h1>
          <p className="text-emerald-200 mt-1 text-sm">
            Your recent product scans
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-lg mx-auto px-4 py-6">
        {mockHistory.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-md">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-emerald-800" />
            </div>
            <h3 className="text-emerald-900 font-bold text-lg mb-2">
              No scans yet
            </h3>
            <p className="text-stone-500 text-sm">
              Products you scan will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockHistory.map((item) => {
              const config = safetyConfig[item.safety];
              const Icon = config.icon;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md"
                >
                  {/* Safety indicator strip */}
                  <div
                    className={`h-1 ${
                      item.safety === "safe"
                        ? "bg-emerald-500"
                        : item.safety === "caution"
                        ? "bg-orange-500"
                        : "bg-red-500"
                    }`}
                  />

                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 ${config.bg} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon size={24} className={config.color} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-emerald-900 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-stone-500 text-sm">
                          {item.product.brand}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}
                          >
                            {config.label}
                          </span>
                          <span className="text-stone-400 text-xs">
                            for {item.petName}
                          </span>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <p className="text-stone-400 text-xs flex items-center gap-1">
                          <Clock size={12} />
                          {item.scannedAt}
                        </p>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => onSelectItem(item)}
                      className="w-full mt-3 py-2 px-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-medium flex items-center justify-center gap-1 hover:bg-emerald-100 transition"
                    >
                      View Details
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Clear History Button */}
        {mockHistory.length > 0 && (
          <button className="w-full mt-6 py-3 px-4 rounded-xl border-2 border-stone-300 text-stone-500 font-medium flex items-center justify-center gap-2 hover:border-red-300 hover:text-red-500 transition">
            <Trash2 size={18} />
            Clear History
          </button>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-stone-400 text-xs">
        Always consult your veterinarian for medical advice
      </footer>
    </div>
  );
}
