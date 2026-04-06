import { Check, Heart, Award, Users } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { imageSrc } from "../lib/assets";
import { useContent } from "../hooks/useContent";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { Heart, Award, Users };

const isPreview =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("preview") === "true";

function openBgUpload(contentKey: string) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = () => {
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      window.parent.postMessage({
        type: "preview-image-upload",
        fileData: ev.target?.result,
        fileName: file.name,
        mimeType: file.type,
        contentKey,
      }, "*");
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

export default function About() {
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
        };
      case "warmth":
        return {
          bg: "bg-[#faf8f5]",
          cardBg: "bg-white",
          text: "text-[#5a4a42]",
          subtext: "text-[#7a6a62]",
          accent: "text-[#d4a59a]",
          accentBg: "bg-[#d4a59a]",
        };
      case "bold":
        return {
          bg: "bg-white",
          cardBg: "bg-gray-50",
          text: "text-gray-900",
          subtext: "text-gray-600",
          accent: "text-[#e91e8c]",
          accentBg: "bg-[#e91e8c]",
        };
    }
  };

  const classes = getThemeClasses();

  return (
    <div className={classes.bg}>
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${imageSrc(content.about.hero_image)})`,
          }}
        />
        {isPreview && (
          <button
            onClick={() => openBgUpload("about.hero_image")}
            className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer"
          >
            📷 Change Background
          </button>
        )}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1
              className={`text-5xl md:text-6xl font-bold text-white mb-4 ${
                theme === "bold" ? "font-display" : ""
              }`}
              style={
                theme === "bold"
                  ? { fontFamily: "'Abril Fatface', serif" }
                  : theme === "luxury"
                  ? { fontFamily: "'Playfair Display', serif" }
                  : {}
              }
              data-content-key="about.hero_headline"
            >
              {content.about.hero_headline}
            </h1>
            <p className="text-xl text-white" data-content-key="about.hero_subtext">
              {content.about.hero_subtext}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`${classes.cardBg} rounded-2xl p-8 md:p-12 shadow-xl`}>
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
                data-content-key="about.section_title"
              >
                {content.about.section_title}
              </h2>
              <div className={`${classes.subtext} text-lg space-y-4 mb-8`}>
                {content.about.body_paragraphs.map((para, i) => (
                  <p key={i} data-content-key={`about.body_paragraphs.${i}`}>{para}</p>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {content.about.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3"
                    data-reorderable="about.features"
                    data-reorder-index={index}
                  >
                    <div className={`${classes.accentBg} rounded-full p-1 mt-1`}>
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <p className={`${classes.text} text-lg`} data-content-key={`about.features.${index}`}>
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`py-16 ${classes.cardBg}`}>
        <div className="container mx-auto px-4">
          <h2
            className={`text-4xl font-bold ${classes.text} mb-12 text-center ${
              theme === "bold" ? "font-display" : ""
            }`}
            style={
              theme === "bold"
                ? { fontFamily: "'Abril Fatface', serif" }
                : theme === "luxury"
                ? { fontFamily: "'Playfair Display', serif" }
                : {}
            }
            data-content-key="about.values_section_headline"
          >
            {content.about.values_section_headline}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {content.about.values.map((value, index) => {
              const Icon = iconMap[value.icon] ?? Heart;
              return (
                <div
                  key={index}
                  className={`${classes.bg} p-8 rounded-xl shadow-lg text-center`}
                  data-reorderable="about.values"
                  data-reorder-index={index}
                >
                  <div
                    className={`${classes.accentBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3
                    className={`text-2xl font-bold ${classes.text} mb-3`}
                    data-content-key={`about.values.${index}.title`}
                  >
                    {value.title}
                  </h3>
                  <p
                    className={classes.subtext}
                    data-content-key={`about.values.${index}.description`}
                  >
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className={`${classes.cardBg} rounded-2xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto text-center`}>
            <h2
              className={`text-3xl font-bold ${classes.text} mb-6 ${
                theme === "bold" ? "font-display" : ""
              }`}
              style={
                theme === "bold"
                  ? { fontFamily: "'Abril Fatface', serif" }
                  : theme === "luxury"
                  ? { fontFamily: "'Playfair Display', serif" }
                  : {}
              }
              data-content-key="about.visit_title"
            >
              {content.about.visit_title}
            </h2>
            <p className={`${classes.subtext} text-lg mb-6`} data-content-key="about.visit_body">
              {content.about.visit_body}
            </p>
            <div className={`${classes.text} text-lg space-y-2`}>
              <p data-content-key="business.address_line1">{content.business.address_line1}</p>
              <p>
                <span data-content-key="business.address_line2">{content.business.address_line2}</span>,{" "}
                <span data-content-key="business.address_country">{content.business.address_country}</span>
              </p>
              <p className={`${classes.accent} font-semibold mt-4`} data-content-key="business.phone_display">
                {content.business.phone_display}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
