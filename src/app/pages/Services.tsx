import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router";
import { imageSrc } from "../lib/assets";
import { useContent } from "../hooks/useContent";

export default function Services() {
  const { theme } = useTheme();
  const content = useContent();

  const getThemeClasses = () => {
    switch (theme) {
      case "luxury":
        return {
          bg: "bg-[#1a1a1a]",
          cardBg: "bg-[#2a2a2a]",
          text: "text-white",
          subtext: "text-gray-300",
          accent: "text-[#d4a574]",
          accentBg: "bg-[#d4a574]",
          accentHover: "hover:bg-[#c49564]",
        };
      case "warmth":
        return {
          bg: "bg-[#faf8f5]",
          cardBg: "bg-white",
          text: "text-[#5a4a42]",
          subtext: "text-[#7a6a62]",
          accent: "text-[#d4a59a]",
          accentBg: "bg-[#d4a59a]",
          accentHover: "hover:bg-[#c4958a]",
        };
      case "bold":
        return {
          bg: "bg-white",
          cardBg: "bg-gray-50",
          text: "text-gray-900",
          subtext: "text-gray-600",
          accent: "text-[#e91e8c]",
          accentBg: "bg-[#e91e8c]",
          accentHover: "hover:bg-[#d91a7c]",
        };
    }
  };

  const classes = getThemeClasses();

  return (
    <div className={classes.bg}>
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1
              className={`text-5xl md:text-6xl font-bold ${classes.text} mb-6 ${
                theme === "bold" ? "font-display" : ""
              }`}
              style={
                theme === "bold"
                  ? { fontFamily: "'Abril Fatface', serif" }
                  : theme === "luxury"
                  ? { fontFamily: "'Playfair Display', serif" }
                  : {}
              }
              data-content-key="services_page.headline"
            >
              {content.services_page.headline}
            </h1>
            <p className={`${classes.subtext} text-xl`} data-content-key="services_page.intro">
              {content.services_page.intro}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.services.map((service, index) => (
              <div
                key={index}
                className={`${classes.cardBg} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow`}
                data-reorderable="services"
                data-reorder-index={index}
                data-drag-handle-only
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={imageSrc(service.image)}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className={`text-2xl font-bold ${classes.text} mb-3 ${
                      theme === "bold" ? "font-display" : ""
                    }`}
                    style={
                      theme === "bold"
                        ? { fontFamily: "'Abril Fatface', serif" }
                        : theme === "luxury"
                        ? { fontFamily: "'Playfair Display', serif" }
                        : {}
                    }
                    data-content-key={`services.${index}.title`}
                  >
                    {service.title}
                  </h3>
                  <p className={`${classes.subtext} mb-4`} data-content-key={`services.${index}.description`}>
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className={`${classes.text} flex items-center`}
                      >
                        <span className={`${classes.accent} mr-2`}>•</span>
                        <span data-content-key={`services.${index}.items.${itemIndex}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/pricing"
                    className={`${classes.accentBg} ${classes.accentHover} text-white px-6 py-3 rounded-full font-semibold transition-colors inline-block text-center w-full`}
                  >
                    View Pricing
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Cards Section */}
      <section className={`py-16 ${classes.cardBg}`}>
        <div className="container mx-auto px-4 text-center">
          <h2
            className={`text-4xl font-bold ${classes.text} mb-6 ${
              theme === "bold" ? "font-display" : ""
            }`}
            style={
              theme === "bold"
                ? { fontFamily: "'Abril Fatface', serif" }
                : theme === "luxury"
                ? { fontFamily: "'Playfair Display', serif" }
                : {}
            }
            data-content-key="services_page.gift_cards_headline"
          >
            {content.services_page.gift_cards_headline}
          </h2>
          <p className={`${classes.subtext} text-xl mb-8 max-w-2xl mx-auto`} data-content-key="contact.gift_cards_note">
            {content.contact.gift_cards_note}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${content.business.phone_tel}`}
              className={`${classes.accent} border-2 ${
                theme === "luxury"
                  ? "border-[#d4a574]"
                  : theme === "warmth"
                  ? "border-[#d4a59a]"
                  : "border-[#e91e8c]"
              } px-8 py-4 rounded-full font-semibold hover:opacity-80 transition-opacity inline-block`}
            >
              Call <span data-content-key="business.phone_display">{content.business.phone_display}</span>
            </a>
            <Link
              to="/contact"
              className={`${classes.accentBg} ${classes.accentHover} text-white px-8 py-4 rounded-full font-semibold transition-colors inline-block`}
            >
              Book Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
