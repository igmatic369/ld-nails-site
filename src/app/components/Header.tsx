import { Link } from "react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useContent } from "../hooks/useContent";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const content = useContent();

  const getThemeClasses = () => {
    switch (theme) {
      case "luxury":
        return {
          bg: "bg-[#2a2a2a]",
          text: "text-white",
          accent: "text-[#d4a574]",
          hover: "hover:text-[#d4a574]",
          border: "border-[#d4a574]",
        };
      case "warmth":
        return {
          bg: "bg-[#faf8f5]",
          text: "text-[#5a4a42]",
          accent: "text-[#d4a59a]",
          hover: "hover:text-[#d4a59a]",
          border: "border-[#d4a59a]",
        };
      case "bold":
        return {
          bg: "bg-white",
          text: "text-gray-900",
          accent: "text-[#e91e8c]",
          hover: "hover:text-[#e91e8c]",
          border: "border-[#e91e8c]",
        };
    }
  };

  const classes = getThemeClasses();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/gallery", label: "Gallery" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className={`${classes.bg} ${classes.text} shadow-md sticky top-0 z-50`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span
                className={`text-2xl font-bold ${classes.accent} font-[Abril_Fatface]`}
                data-content-key="business.name"
              >
                {content.business.name}
              </span>
              <span className="text-xs opacity-75" data-content-key="business.address_city_short">
                {content.business.address_city_short}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors ${classes.hover}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Phone Number */}
          <a
            href={`tel:${content.business.phone_tel}`}
            className={`hidden lg:flex items-center space-x-2 ${classes.accent} ${classes.border} border-2 px-4 py-2 rounded-full hover:opacity-80 transition-opacity`}
          >
            <Phone className="w-4 h-4" />
            <span data-content-key="business.phone_display">{content.business.phone_display}</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block py-2 ${classes.hover}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${content.business.phone_tel}`}
              className={`flex items-center space-x-2 ${classes.accent} pt-2`}
            >
              <Phone className="w-4 h-4" />
              <span data-content-key="business.phone_display">{content.business.phone_display}</span>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
