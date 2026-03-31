import { Link } from "react-router";
import { Home } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function NotFound() {
  const { theme } = useTheme();

  const getThemeClasses = () => {
    switch (theme) {
      case "luxury":
        return {
          bg: "bg-[#1a1a1a]",
          text: "text-white",
          accent: "text-[#d4a574]",
          buttonBg: "bg-[#d4a574]",
          buttonText: "text-[#1a1a1a]",
        };
      case "warmth":
        return {
          bg: "bg-[#faf8f5]",
          text: "text-[#5a4a42]",
          accent: "text-[#d4a59a]",
          buttonBg: "bg-[#d4a59a]",
          buttonText: "text-white",
        };
      case "bold":
        return {
          bg: "bg-white",
          text: "text-gray-900",
          accent: "text-[#e91e8c]",
          buttonBg: "bg-[#e91e8c]",
          buttonText: "text-white",
        };
    }
  };

  const classes = getThemeClasses();

  return (
    <div className={`${classes.bg} min-h-screen flex items-center justify-center`}>
      <div className="text-center px-4">
        <h1 className={`text-9xl font-bold ${classes.accent} mb-4`}>404</h1>
        <h2 className={`text-3xl font-bold ${classes.text} mb-4`}>
          Page Not Found
        </h2>
        <p className={`${classes.text} mb-8 max-w-md mx-auto`}>
          Sorry, the page you're looking for doesn't exist. Let's get you back to
          beautiful nails!
        </p>
        <Link
          to="/"
          className={`${classes.buttonBg} ${classes.buttonText} px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity inline-flex items-center space-x-2`}
        >
          <Home className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
