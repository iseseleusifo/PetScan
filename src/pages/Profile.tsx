import React from "react";
import {
  User,
  Dog,
  Cat,
  Plus,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Bell,
  Shield,
} from "lucide-react";

export default function Profile() {
  const pets = [
    {
      id: 1,
      name: "Max",
      species: "dog",
      breed: "Golden Retriever",
      weight: 32,
      age: 3,
    },
    {
      id: 2,
      name: "Bella",
      species: "cat",
      breed: "Persian",
      weight: 5,
      age: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <div className="bg-emerald-900 px-4 pt-8 pb-12">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center">
              <User size={32} className="text-emerald-900" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Pet Parent</h1>
              <p className="text-emerald-200 text-sm">
                {pets.length} pet{pets.length !== 1 ? "s" : ""} registered
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-lg mx-auto px-4 -mt-6">
        {/* My Pets Card */}
        <div className="bg-white rounded-xl shadow-md mb-4 overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-stone-100">
            <h2 className="font-bold text-emerald-900">My Pets</h2>
            <button className="flex items-center gap-1 text-amber-600 text-sm font-semibold hover:text-amber-700 transition">
              <Plus size={16} />
              Add Pet
            </button>
          </div>

          {pets.map((pet, index) => {
            const PetIcon = pet.species === "dog" ? Dog : Cat;
            return (
              <button
                key={pet.id}
                className={`w-full flex items-center gap-4 p-4 text-left hover:bg-stone-50 transition ${
                  index !== pets.length - 1 ? "border-b border-stone-100" : ""
                }`}
              >
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PetIcon size={24} className="text-emerald-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-emerald-900">{pet.name}</h3>
                  <p className="text-stone-500 text-sm truncate">
                    {pet.breed} • {pet.weight}kg • {pet.age} year
                    {pet.age !== 1 ? "s" : ""}
                  </p>
                </div>
                <ChevronRight
                  size={20}
                  className="text-stone-400 flex-shrink-0"
                />
              </button>
            );
          })}
        </div>

        {/* Settings Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <button className="w-full flex items-center gap-4 p-4 border-b border-stone-100 hover:bg-stone-50 transition">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Bell size={20} className="text-emerald-700" />
            </div>
            <span className="flex-1 text-left text-emerald-900 font-medium">
              Notifications
            </span>
            <ChevronRight size={20} className="text-stone-400" />
          </button>
          <button className="w-full flex items-center gap-4 p-4 border-b border-stone-100 hover:bg-stone-50 transition">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-emerald-700" />
            </div>
            <span className="flex-1 text-left text-emerald-900 font-medium">
              Privacy & Data
            </span>
            <ChevronRight size={20} className="text-stone-400" />
          </button>
          <button className="w-full flex items-center gap-4 p-4 border-b border-stone-100 hover:bg-stone-50 transition">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Settings size={20} className="text-emerald-700" />
            </div>
            <span className="flex-1 text-left text-emerald-900 font-medium">
              Settings
            </span>
            <ChevronRight size={20} className="text-stone-400" />
          </button>
          <button className="w-full flex items-center gap-4 p-4 border-b border-stone-100 hover:bg-stone-50 transition">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <HelpCircle size={20} className="text-emerald-700" />
            </div>
            <span className="flex-1 text-left text-emerald-900 font-medium">
              Help & Support
            </span>
            <ChevronRight size={20} className="text-stone-400" />
          </button>
          <button className="w-full flex items-center gap-4 p-4 hover:bg-red-50 transition">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <LogOut size={20} className="text-red-600" />
            </div>
            <span className="flex-1 text-left text-red-600 font-medium">
              Log Out
            </span>
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
