// src/components/BottomNav.tsx
import React from "react";
import { Scan, Clock, User } from "lucide-react";

type Page = "scanner" | "history" | "profile";

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: Page) => void;
}

export default function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems: Array<{ id: Page; label: string; icon: typeof Scan }> = [
    { id: "scanner", label: "Scan", icon: Scan },
    { id: "history", label: "History", icon: Clock },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-6 py-3 pb-safe">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 transition ${
                isActive
                  ? "text-emerald-700"
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              <div
                className={`p-2 rounded-xl transition ${
                  isActive ? "bg-amber-100" : ""
                }`}
              >
                <Icon size={24} />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
