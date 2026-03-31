import { useTheme } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4">
      <p className="text-sm font-semibold mb-2 text-gray-700">Choose Theme:</p>
      <div className="space-y-2">
        <button
          onClick={() => setTheme("luxury")}
          className={`block w-full text-left px-4 py-2 rounded transition-colors ${
            theme === "luxury"
              ? "bg-[#2a2a2a] text-[#d4a574]"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Option 1: Dark Luxury
        </button>
        <button
          onClick={() => setTheme("warmth")}
          className={`block w-full text-left px-4 py-2 rounded transition-colors ${
            theme === "warmth"
              ? "bg-[#f5ebe6] text-[#d4a59a]"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Option 2: Soft Warmth
        </button>
        <button
          onClick={() => setTheme("bold")}
          className={`block w-full text-left px-4 py-2 rounded transition-colors ${
            theme === "bold"
              ? "bg-[#e91e8c] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Option 3: Bold Pink
        </button>
      </div>
    </div>
  );
}
