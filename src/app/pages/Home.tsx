import { Link } from "react-router";
import { Star, Sparkles, Clock, Heart, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { assetUrl } from "../lib/assets";
import content from "@/content.json";

const featuredIcons = [Sparkles, Heart, Clock];

export default function Home() {
  const { theme } = useTheme();

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
          buttonBg: "bg-[#d4a574]",
          buttonText: "text-[#1a1a1a]",
          buttonHover: "hover:bg-[#c49564]",
          borderColor: "border-[#d4a574]",
          font: "font-serif",
        };
      case "warmth":
        return {
          bg: "bg-[#faf8f5]",
          cardBg: "bg-white",
          text: "text-[#5a4a42]",
          subtext: "text-[#7a6a62]",
          accent: "text-[#d4a59a]",
          accentBg: "bg-[#d4a59a]",
          buttonBg: "bg-[#d4a59a]",
          buttonText: "text-white",
          buttonHover: "hover:bg-[#c4958a]",
          borderColor: "border-[#d4a59a]",
          font: "font-sans",
        };
      case "bold":
        return {
          bg: "bg-white",
          cardBg: "bg-gray-50",
          text: "text-gray-900",
          subtext: "text-gray-600",
          accent: "text-[#e91e8c]",
          accentBg: "bg-[#e91e8c]",
          buttonBg: "bg-[#e91e8c]",
          buttonText: "text-white",
          buttonHover: "hover:bg-[#d91a7c]",
          borderColor: "border-[#e91e8c]",
          font: "font-sans",
        };
    }
  };

  const classes = getThemeClasses();
  const galleryPreview = content.gallery.images.slice(0, 4);

  return (
    <div className={classes.bg}>
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className={`text-5xl md:text-7xl font-bold ${classes.text} mb-6 ${
                theme === "bold" ? "font-display" : ""
              }`}
              style={
                theme === "bold"
                  ? { fontFamily: "'Abril Fatface', serif" }
                  : theme === "luxury"
                  ? { fontFamily: "'Playfair Display', serif" }
                  : {}
              }
            >
              {content.hero.headline}
            </h1>
            <p className={`${classes.subtext} text-2xl md:text-3xl mb-4`}>
              {content.hero.subheadline}
            </p>
            <p className={`${classes.subtext} text-xl mb-12`}>
              {content.hero.body}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to={content.hero.cta_primary_link}
                className={`${classes.buttonBg} ${classes.buttonText} px-8 py-4 rounded-full font-semibold ${classes.buttonHover} transition-colors inline-flex items-center space-x-2`}
              >
                <span>{content.hero.cta_primary_text}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={content.hero.cta_secondary_link}
                className={`${classes.accent} border-2 ${classes.borderColor} px-8 py-4 rounded-full font-semibold hover:opacity-80 transition-opacity inline-block`}
              >
                {content.business.phone_display}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className={`py-16 ${classes.cardBg}`}>
        <div className="container mx-auto px-4">
          <h2
            className={`text-4xl md:text-5xl font-bold ${classes.text} mb-12 text-center ${
              theme === "bold" ? "font-display" : ""
            }`}
            style={
              theme === "bold"
                ? { fontFamily: "'Abril Fatface', serif" }
                : theme === "luxury"
                ? { fontFamily: "'Playfair Display', serif" }
                : {}
            }
          >
            {content.hero.services_section_headline}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.hero.featured_services.map((service, index) => {
              const Icon = featuredIcons[index];
              return (
                <div
                  key={index}
                  className={`${classes.bg} p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow`}
                >
                  <div className={`${classes.accentBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold ${classes.text} mb-3`}>
                    {service.title}
                  </h3>
                  <p className={classes.subtext}>{service.description}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className={`${classes.accent} font-semibold inline-flex items-center space-x-2 hover:opacity-80 transition-opacity`}
            >
              <span>View All Services</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2
            className={`text-4xl md:text-5xl font-bold ${classes.text} mb-4 text-center ${
              theme === "bold" ? "font-display" : ""
            }`}
            style={
              theme === "bold"
                ? { fontFamily: "'Abril Fatface', serif" }
                : theme === "luxury"
                ? { fontFamily: "'Playfair Display', serif" }
                : {}
            }
          >
            {content.hero.gallery_section_headline}
          </h2>
          <p className={`${classes.subtext} text-xl mb-12 text-center max-w-2xl mx-auto`}>
            {content.hero.gallery_section_body}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryPreview.map((image, index) => (
              <div
                key={index}
                className={`${classes.cardBg} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow aspect-square`}
              >
                <img
                  src={assetUrl(image.src)}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className={`${classes.accent} font-semibold inline-flex items-center space-x-2 hover:opacity-80 transition-opacity`}
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className={`py-16 ${classes.cardBg}`}>
        <div className="container mx-auto px-4">
          <h2
            className={`text-4xl md:text-5xl font-bold ${classes.text} mb-12 text-center ${
              theme === "bold" ? "font-display" : ""
            }`}
            style={
              theme === "bold"
                ? { fontFamily: "'Abril Fatface', serif" }
                : theme === "luxury"
                ? { fontFamily: "'Playfair Display', serif" }
                : {}
            }
          >
            {content.hero.reviews_section_headline}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.reviews.map((review, index) => (
              <div
                key={index}
                className={`${classes.bg} p-6 rounded-xl shadow-lg`}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${classes.accent} fill-current`}
                    />
                  ))}
                </div>
                <p className={`${classes.text} mb-4 italic`}>"{review.text}"</p>
                <p className={`${classes.accent} font-semibold`}>
                  — {review.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 ${classes.accentBg}`}>
        <div className="container mx-auto px-4 text-center">
          <h2
            className={`text-4xl md:text-5xl font-bold text-white mb-6 ${
              theme === "bold" ? "font-display" : ""
            }`}
            style={
              theme === "bold"
                ? { fontFamily: "'Abril Fatface', serif" }
                : theme === "luxury"
                ? { fontFamily: "'Playfair Display', serif" }
                : {}
            }
          >
            {content.hero.cta_section_headline}
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            {content.hero.cta_section_body}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Book Now
            </Link>
            <Link
              to="/pricing"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors inline-block"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
