import React, { useState } from "react";
import {
  Dog,
  Cat,
  ChevronRight,
  ChevronLeft,
  Check,
  Scan,
  Shield,
  Heart,
  Plus,
  X,
  PawPrint,
} from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [petType, setPetType] = useState<"dog" | "cat" | null>(null);
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [allergyInput, setAllergyInput] = useState("");

  const commonAllergies = [
    "Chicken",
    "Beef",
    "Wheat",
    "Corn",
    "Soy",
    "Dairy",
    "Eggs",
    "Fish",
  ];

  const addAllergy = (allergy: string) => {
    if (!allergies.includes(allergy)) {
      setAllergies([...allergies, allergy]);
    }
  };

  const removeAllergy = (allergy: string) => {
    setAllergies(allergies.filter((a) => a !== allergy));
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 to-emerald-950 flex flex-col">
      {/* Progress Bar */}
      {currentStep > 0 && currentStep < 4 && (
        <div className="px-6 pt-6">
          <div className="max-w-lg mx-auto">
            <div className="flex gap-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    currentStep >= step ? "bg-amber-400" : "bg-emerald-700"
                  }`}
                />
              ))}
            </div>
            <p className="text-emerald-400 text-xs mt-2 text-center">
              Step {currentStep} of 3
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="max-w-lg mx-auto w-full">
          {/* Step 0: Welcome */}
          {currentStep === 0 && (
            <div className="text-center space-y-8">
              {/* Logo */}
              <div className="flex justify-center">
                <div className="bg-amber-400 rounded-3xl p-6">
                  <PawPrint size={64} className="text-emerald-900" />
                </div>
              </div>

              <div>
                <h1 className="text-4xl font-bold text-white mb-3">PetScan</h1>
                <p className="text-emerald-200 text-lg">
                  Keep your furry friends safe
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 text-left bg-emerald-800/50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-400/20 rounded-xl p-3">
                    <Scan className="text-amber-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Scan Any Product</h3>
                    <p className="text-emerald-300 text-sm">
                      Use your camera to scan barcodes instantly
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-amber-400/20 rounded-xl p-3">
                    <Shield className="text-amber-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Check Safety</h3>
                    <p className="text-emerald-300 text-sm">
                      Get instant safety info for your specific pet
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-amber-400/20 rounded-xl p-3">
                    <Heart className="text-amber-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">
                      Personalized Results
                    </h3>
                    <p className="text-emerald-300 text-sm">
                      Warnings based on breed, age, and allergies
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={nextStep}
                className="w-full bg-amber-400 hover:bg-amber-300 text-emerald-900 font-bold py-4 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
              >
                Get Started
                <ChevronRight size={20} />
              </button>

              <p className="text-emerald-500 text-sm">
                Already have an account?{" "}
                <button className="text-amber-400 font-semibold hover:underline">
                  Sign in
                </button>
              </p>
            </div>
          )}

          {/* Step 1: Pet Type */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">
                  What kind of pet do you have?
                </h2>
                <p className="text-emerald-300">
                  Select your pet type to get started
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPetType("dog")}
                  className={`p-6 rounded-2xl border-2 transition flex flex-col items-center gap-4 ${
                    petType === "dog"
                      ? "border-amber-400 bg-amber-400/10"
                      : "border-emerald-700 hover:border-emerald-500"
                  }`}
                >
                  <div
                    className={`rounded-full p-4 ${
                      petType === "dog" ? "bg-amber-400" : "bg-emerald-800"
                    }`}
                  >
                    <Dog
                      size={48}
                      className={
                        petType === "dog"
                          ? "text-emerald-900"
                          : "text-emerald-300"
                      }
                    />
                  </div>
                  <span
                    className={`font-bold text-lg ${
                      petType === "dog" ? "text-amber-400" : "text-white"
                    }`}
                  >
                    Dog
                  </span>
                  {petType === "dog" && (
                    <div className="bg-amber-400 rounded-full p-1">
                      <Check size={16} className="text-emerald-900" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setPetType("cat")}
                  className={`p-6 rounded-2xl border-2 transition flex flex-col items-center gap-4 ${
                    petType === "cat"
                      ? "border-amber-400 bg-amber-400/10"
                      : "border-emerald-700 hover:border-emerald-500"
                  }`}
                >
                  <div
                    className={`rounded-full p-4 ${
                      petType === "cat" ? "bg-amber-400" : "bg-emerald-800"
                    }`}
                  >
                    <Cat
                      size={48}
                      className={
                        petType === "cat"
                          ? "text-emerald-900"
                          : "text-emerald-300"
                      }
                    />
                  </div>
                  <span
                    className={`font-bold text-lg ${
                      petType === "cat" ? "text-amber-400" : "text-white"
                    }`}
                  >
                    Cat
                  </span>
                  {petType === "cat" && (
                    <div className="bg-amber-400 rounded-full p-1">
                      <Check size={16} className="text-emerald-900" />
                    </div>
                  )}
                </button>
              </div>

              <p className="text-center text-emerald-500 text-sm">
                You can add more pets later
              </p>
            </div>
          )}

          {/* Step 2: Pet Info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex bg-amber-400 rounded-full p-3 mb-4">
                  {petType === "dog" ? (
                    <Dog size={32} className="text-emerald-900" />
                  ) : (
                    <Cat size={32} className="text-emerald-900" />
                  )}
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Tell us about your {petType}
                </h2>
                <p className="text-emerald-300">
                  This helps us personalize safety results
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-emerald-300 text-sm font-medium mb-2 block">
                    Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder={petType === "dog" ? "e.g., Max" : "e.g., Luna"}
                    className="w-full bg-emerald-800/50 border border-emerald-700 rounded-xl px-4 py-4 text-white placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="text-emerald-300 text-sm font-medium mb-2 block">
                    Breed <span className="text-emerald-500">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={petBreed}
                    onChange={(e) => setPetBreed(e.target.value)}
                    placeholder={
                      petType === "dog"
                        ? "e.g., Golden Retriever"
                        : "e.g., Maine Coon"
                    }
                    className="w-full bg-emerald-800/50 border border-emerald-700 rounded-xl px-4 py-4 text-white placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-emerald-300 text-sm font-medium mb-2 block">
                      Age <span className="text-emerald-500">(years)</span>
                    </label>
                    <input
                      type="number"
                      value={petAge}
                      onChange={(e) => setPetAge(e.target.value)}
                      placeholder="3"
                      className="w-full bg-emerald-800/50 border border-emerald-700 rounded-xl px-4 py-4 text-white placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-emerald-300 text-sm font-medium mb-2 block">
                      Weight <span className="text-emerald-500">(kg)</span>
                    </label>
                    <input
                      type="number"
                      value={petWeight}
                      onChange={(e) => setPetWeight(e.target.value)}
                      placeholder="25"
                      className="w-full bg-emerald-800/50 border border-emerald-700 rounded-xl px-4 py-4 text-white placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Allergies */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Does {petName || "your pet"} have any allergies?
                </h2>
                <p className="text-emerald-300">
                  We'll warn you when scanning products with these ingredients
                </p>
              </div>

              {/* Selected Allergies */}
              {allergies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {allergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="bg-orange-500/20 text-orange-300 border border-orange-500/50 px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {allergy}
                      <button onClick={() => removeAllergy(allergy)}>
                        <X size={14} className="hover:text-orange-100" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Common Allergies */}
              <div>
                <p className="text-emerald-400 text-sm font-medium mb-3">
                  Common allergies
                </p>
                <div className="flex flex-wrap gap-2">
                  {commonAllergies.map((allergy) => (
                    <button
                      key={allergy}
                      onClick={() => addAllergy(allergy)}
                      disabled={allergies.includes(allergy)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        allergies.includes(allergy)
                          ? "bg-emerald-800 text-emerald-600 cursor-not-allowed"
                          : "bg-emerald-800 text-emerald-200 hover:bg-emerald-700 hover:text-white"
                      }`}
                    >
                      {allergies.includes(allergy) ? (
                        <span className="flex items-center gap-1">
                          <Check size={14} /> {allergy}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Plus size={14} /> {allergy}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Allergy Input */}
              <div>
                <p className="text-emerald-400 text-sm font-medium mb-3">
                  Add custom allergy
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    placeholder="Type an ingredient..."
                    className="flex-1 bg-emerald-800/50 border border-emerald-700 rounded-xl px-4 py-3 text-white placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && allergyInput.trim()) {
                        addAllergy(allergyInput.trim());
                        setAllergyInput("");
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (allergyInput.trim()) {
                        addAllergy(allergyInput.trim());
                        setAllergyInput("");
                      }
                    }}
                    className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 rounded-xl transition"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <button className="w-full text-emerald-400 text-sm font-medium hover:text-emerald-300 transition">
                Skip for now
              </button>
            </div>
          )}

          {/* Step 4: Complete */}
          {currentStep === 4 && (
            <div className="text-center space-y-8">
              {/* Success Animation */}
              <div className="flex justify-center">
                <div className="bg-amber-400 rounded-full p-6 animate-bounce">
                  <Check size={64} className="text-emerald-900" />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  You're all set!
                </h2>
                <p className="text-emerald-300 text-lg">
                  {petName ? `${petName}'s` : "Your pet's"} profile is ready
                </p>
              </div>

              {/* Pet Summary Card */}
              <div className="bg-emerald-800/50 rounded-2xl p-6 text-left">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-amber-400 rounded-full p-3">
                    {petType === "dog" ? (
                      <Dog size={28} className="text-emerald-900" />
                    ) : (
                      <Cat size={28} className="text-emerald-900" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">
                      {petName || "Your Pet"}
                    </h3>
                    <p className="text-emerald-300">
                      {petBreed || "Breed not specified"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-emerald-400">Age:</span>
                    <span className="text-white ml-2">
                      {petAge ? `${petAge} years` : "Not specified"}
                    </span>
                  </div>
                  <div>
                    <span className="text-emerald-400">Weight:</span>
                    <span className="text-white ml-2">
                      {petWeight ? `${petWeight} kg` : "Not specified"}
                    </span>
                  </div>
                </div>
                {allergies.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-emerald-700">
                    <span className="text-emerald-400 text-sm">Allergies:</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {allergies.map((allergy) => (
                        <span
                          key={allergy}
                          className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-xs"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={onComplete}
                className="w-full bg-amber-400 hover:bg-amber-300 text-emerald-900 font-bold py-4 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
              >
                <Scan size={20} />
                Start Scanning
              </button>

              <button className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition">
                Add another pet
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      {currentStep > 0 && currentStep < 4 && (
        <div className="px-6 pb-8">
          <div className="max-w-lg mx-auto flex gap-3">
            <button
              onClick={prevStep}
              className="flex-1 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition flex items-center justify-center gap-2"
            >
              <ChevronLeft size={20} />
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === 1 && !petType}
              className={`flex-1 font-bold py-4 px-6 rounded-xl transition flex items-center justify-center gap-2 ${
                currentStep === 1 && !petType
                  ? "bg-emerald-700 text-emerald-500 cursor-not-allowed"
                  : "bg-amber-400 hover:bg-amber-300 text-emerald-900"
              }`}
            >
              {currentStep === 3 ? "Finish" : "Next"}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
