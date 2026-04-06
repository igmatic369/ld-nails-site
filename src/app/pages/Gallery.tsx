import { useTheme } from "../context/ThemeContext";
import { assetUrl } from "../lib/assets";
import { useContent } from "../hooks/useContent";

export default function Gallery() {
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
        };
      case "warmth":
        return {
          bg: "bg-[#faf8f5]",
          cardBg: "bg-white",
          text: "text-[#5a4a42]",
          subtext: "text-[#7a6a62]",
          accent: "text-[#d4a59a]",
        };
      case "bold":
        return {
          bg: "bg-white",
          cardBg: "bg-gray-50",
          text: "text-gray-900",
          subtext: "text-gray-600",
          accent: "text-[#e91e8c]",
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
              data-content-key="gallery.headline"
            >
              {content.gallery.headline}
            </h1>
            <p className={`${classes.subtext} text-xl`} data-content-key="gallery.body">
              {content.gallery.body}
            </p>
          </div>

          {/* Masonry Gallery */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {content.gallery.images.map((image, index) => (
              <div
                key={index}
                className={`${classes.cardBg} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow break-inside-avoid`}
                data-reorderable="gallery.images"
                data-reorder-index={index}
              >
                <img
                  src={assetUrl(image.src)}
                  alt={image.alt}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            data-content-key="gallery.cta_headline"
          >
            {content.gallery.cta_headline}
          </h2>
          <p className={`${classes.subtext} text-xl mb-8 max-w-2xl mx-auto`} data-content-key="gallery.cta_body">
            {content.gallery.cta_body}
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
            <a
              href="/contact"
              className={`${
                theme === "luxury"
                  ? "bg-[#d4a574] text-[#1a1a1a] hover:bg-[#c49564]"
                  : theme === "warmth"
                  ? "bg-[#d4a59a] text-white hover:bg-[#c4958a]"
                  : "bg-[#e91e8c] text-white hover:bg-[#d91a7c]"
              } px-8 py-4 rounded-full font-semibold transition-colors inline-block`}
            >
              Book Appointment
            </a>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2
            className={`text-3xl font-bold ${classes.text} mb-4 ${
              theme === "bold" ? "font-display" : ""
            }`}
            style={
              theme === "bold"
                ? { fontFamily: "'Abril Fatface', serif" }
                : theme === "luxury"
                ? { fontFamily: "'Playfair Display', serif" }
                : {}
            }
            data-content-key="gallery.follow_headline"
          >
            {content.gallery.follow_headline}
          </h2>
          <p className={`${classes.subtext} mb-6`} data-content-key="gallery.follow_body">
            {content.gallery.follow_body}
          </p>
          <a
            href={content.business.facebook_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${classes.accent} text-lg font-semibold hover:opacity-80 transition-opacity inline-block`}
            data-content-key="business.facebook_handle"
          >
            {content.business.facebook_handle}
          </a>
        </div>
      </section>
    </div>
  );
}
