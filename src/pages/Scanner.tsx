import React, { useState } from "react";
import {
  Camera,
  X,
  Flashlight,
  FlashlightOff,
  RotateCcw,
  Search,
  HelpCircle,
  Scan,
  ChevronUp,
} from "lucide-react";

interface ScannerProps {
  onScanComplete: (result: any) => void;
  onClose?: () => void;
  onSearch?: () => void;
}

export default function Scanner({
  onScanComplete,
  onClose,
  onSearch,
}: ScannerProps) {
  const [flashOn, setFlashOn] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [scanStatus, setScanStatus] = useState<
    "scanning" | "processing" | "error"
  >("scanning");

  const simulateScan = () => {
    setScanStatus("processing");
    setTimeout(() => {
      setScanStatus("scanning");
      onScanComplete({
        barcode: "012345678905",
        product: {
          name: "Creamy Peanut Butter",
          brand: "Jif",
          image: null,
        },
        safety: "danger",
        warnings: [
          {
            ingredient: "Xylitol",
            severity: "critical",
            message:
              "Extremely toxic to dogs. Even small amounts can cause seizures and liver failure.",
          },
        ],
        safeIngredients: ["Peanuts", "Salt"],
        petName: "Max",
      });
    }, 2000);
  };

  const simulateError = () => {
    setScanStatus("error");
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col">
      {/* Header */}
      <header className="bg-emerald-900 text-white px-4 py-4 relative z-20">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-amber-200 hover:text-white transition"
          >
            <X size={24} />
          </button>
          <h1 className="text-lg font-bold tracking-wide">Scan Product</h1>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="text-amber-200 hover:text-white transition"
          >
            <HelpCircle size={24} />
          </button>
        </div>
      </header>

      {/* Help Panel */}
      {showHelp && (
        <div className="bg-emerald-800 text-white px-4 py-4 relative z-10">
          <div className="max-w-lg mx-auto">
            <h3 className="font-bold mb-2">How to scan</h3>
            <ul className="text-emerald-100 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="bg-emerald-600 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  1
                </span>
                Position the barcode within the frame below
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-emerald-600 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  2
                </span>
                Hold steady and ensure good lighting
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-emerald-600 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  3
                </span>
                The scan will happen automatically
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Camera View (Simulated) */}
      <div className="flex-1 relative overflow-hidden">
        {/* Simulated camera background */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-800 to-stone-900">
          {/* Subtle grid pattern to simulate camera view */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute w-full border-t border-white"
                style={{ top: `${i * 5}%` }}
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute h-full border-l border-white"
                style={{ left: `${i * 10}%` }}
              />
            ))}
          </div>
        </div>

        {/* Dark overlay with cutout */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Top overlay */}
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-black/60" />
          {/* Bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-black/60" />
          {/* Left overlay */}
          <div className="absolute top-1/4 left-0 w-8 bottom-1/3 bg-black/60" />
          {/* Right overlay */}
          <div className="absolute top-1/4 right-0 w-8 bottom-1/3 bg-black/60" />
        </div>

        {/* Scanning Frame */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-72 h-44">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-amber-400 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-amber-400 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-amber-400 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-amber-400 rounded-br-lg" />

            {/* Scanning line animation */}
            {scanStatus === "scanning" && (
              <div
                className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse"
                style={{
                  top: "50%",
                  boxShadow: "0 0 10px #34d399, 0 0 20px #34d399",
                }}
              />
            )}

            {/* Processing state */}
            {scanStatus === "processing" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-emerald-500 rounded-full p-4 animate-pulse">
                  <Scan className="text-white" size={32} />
                </div>
              </div>
            )}

            {/* Error state */}
            {scanStatus === "error" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-orange-500 rounded-full p-4">
                  <X className="text-white" size={32} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Message */}
        <div className="absolute bottom-1/4 left-0 right-0 text-center pb-4">
          {scanStatus === "scanning" && (
            <p className="text-white font-medium">Position barcode in frame</p>
          )}
          {scanStatus === "processing" && (
            <p className="text-emerald-400 font-medium animate-pulse">
              Processing barcode...
            </p>
          )}
          {scanStatus === "error" && (
            <div>
              <p className="text-orange-400 font-bold mb-1">
                Barcode not recognized
              </p>
              <p className="text-stone-400 text-sm">
                Try again or search manually
              </p>
            </div>
          )}
        </div>

        {/* Camera Controls */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-lg mx-auto px-6 flex items-center justify-between">
            {/* Flash Toggle */}
            <button
              onClick={() => setFlashOn(!flashOn)}
              className={`p-4 rounded-full transition ${
                flashOn
                  ? "bg-amber-400 text-stone-900"
                  : "bg-stone-800 text-white hover:bg-stone-700"
              }`}
            >
              {flashOn ? <Flashlight size={24} /> : <FlashlightOff size={24} />}
            </button>

            {/* Scan Button (for demo) */}
            <button
              onClick={simulateScan}
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-6 rounded-full shadow-lg transition transform hover:scale-105 active:scale-95"
            >
              <Camera size={32} />
            </button>

            {/* Reset/Retry */}
            <button
              onClick={() => setScanStatus("scanning")}
              className="bg-stone-800 hover:bg-stone-700 text-white p-4 rounded-full transition"
            >
              <RotateCcw size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-white rounded-t-3xl px-4 pt-4 pb-8 relative z-10">
        <div className="max-w-lg mx-auto">
          {/* Handle */}
          <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mb-4" />

          {/* Quick Actions */}
          <div className="flex gap-3">
            <button
              onClick={onSearch}
              className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Search size={20} />
              Search Instead
            </button>
            <button
              onClick={simulateError}
              className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <HelpCircle size={20} />
              Report Issue
            </button>
          </div>

          {/* Recent Scans */}
          <div className="mt-4">
            <button className="w-full flex items-center justify-between py-3 text-stone-500">
              <span className="font-medium">Recent Scans</span>
              <ChevronUp size={20} />
            </button>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Scan className="text-emerald-700" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-stone-800 font-medium text-sm">
                    CBD Oil for Dogs 300mg
                  </p>
                  <p className="text-stone-400 text-xs">Scanned 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Scan className="text-emerald-700" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-stone-800 font-medium text-sm">
                    Grain-Free Salmon Dog Food
                  </p>
                  <p className="text-stone-400 text-xs">Scanned yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
