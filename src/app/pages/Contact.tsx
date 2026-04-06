import { useState } from "react";
import { MapPin, Phone, Clock, Facebook, Send } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { imageSrc } from "../lib/assets";
import { useContent } from "../hooks/useContent";

const isPreview =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("preview") === "true";

function openImgUpload(contentKey: string) {
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

export default function Contact() {
  const { theme } = useTheme();
  const content = useContent();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

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
          inputBg: "bg-[#3a3a3a]",
          inputBorder: "border-[#4a4a4a]",
          inputFocus: "focus:border-[#d4a574]",
        };
      case "warmth":
        return {
          bg: "bg-[#faf8f5]",
          cardBg: "bg-white",
          text: "text-[#5a4a42]",
          subtext: "text-[#7a6a62]",
          accent: "text-[#d4a59a]",
          accentBg: "bg-[#d4a59a]",
          inputBg: "bg-white",
          inputBorder: "border-gray-300",
          inputFocus: "focus:border-[#d4a59a]",
        };
      case "bold":
        return {
          bg: "bg-white",
          cardBg: "bg-gray-50",
          text: "text-gray-900",
          subtext: "text-gray-600",
          accent: "text-[#e91e8c]",
          accentBg: "bg-[#e91e8c]",
          inputBg: "bg-white",
          inputBorder: "border-gray-300",
          inputFocus: "focus:border-[#e91e8c]",
        };
    }
  };

  const classes = getThemeClasses();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        time: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              data-content-key="contact.headline"
            >
              {content.contact.headline}
            </h1>
            <p className={`${classes.subtext} text-xl`} data-content-key="contact.intro">
              {content.contact.intro}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className={`${classes.cardBg} rounded-2xl p-8 shadow-xl`}>
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
                data-content-key="contact.form_title"
              >
                {content.contact.form_title}
              </h2>

              {submitted && (
                <div className={`${classes.accentBg} text-white p-4 rounded-lg mb-6`} data-content-key="contact.form_success">
                  {content.contact.form_success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block ${classes.text} mb-2 font-semibold`}>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full ${classes.inputBg} ${classes.text} border ${classes.inputBorder} ${classes.inputFocus} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block ${classes.text} mb-2 font-semibold`}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full ${classes.inputBg} ${classes.text} border ${classes.inputBorder} ${classes.inputFocus} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className={`block ${classes.text} mb-2 font-semibold`}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full ${classes.inputBg} ${classes.text} border ${classes.inputBorder} ${classes.inputFocus} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                      placeholder="(778) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block ${classes.text} mb-2 font-semibold`}>
                    Service *
                  </label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full ${classes.inputBg} ${classes.text} border ${classes.inputBorder} ${classes.inputFocus} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                  >
                    <option value="">Select a service</option>
                    {content.contact.services_list.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block ${classes.text} mb-2 font-semibold`}>
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`w-full ${classes.inputBg} ${classes.text} border ${classes.inputBorder} ${classes.inputFocus} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                    />
                  </div>
                  <div>
                    <label className={`block ${classes.text} mb-2 font-semibold`}>
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`w-full ${classes.inputBg} ${classes.text} border ${classes.inputBorder} ${classes.inputFocus} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block ${classes.text} mb-2 font-semibold`}>
                    Message / Special Requests
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full ${classes.inputBg} ${classes.text} border ${classes.inputBorder} ${classes.inputFocus} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                    placeholder="Tell us about your desired nail design or any special requests..."
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full ${classes.accentBg} text-white py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2`}
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Booking Request</span>
                </button>

                <p className={`${classes.subtext} text-sm text-center`}>
                  * We'll contact you to confirm your appointment
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Details */}
              <div className={`${classes.cardBg} rounded-2xl p-8 shadow-xl`}>
                <h3
                  className={`text-2xl font-bold ${classes.text} mb-6 ${
                    theme === "bold" ? "font-display" : ""
                  }`}
                  style={
                    theme === "bold"
                      ? { fontFamily: "'Abril Fatface', serif" }
                      : theme === "luxury"
                      ? { fontFamily: "'Playfair Display', serif" }
                      : {}
                  }
                  data-content-key="contact.info_heading"
                >
                  {content.contact.info_heading}
                </h3>
                <div className="space-y-4">
                  <a
                    href={`tel:${content.business.phone_tel}`}
                    className={`flex items-start space-x-3 ${classes.text} hover:${classes.accent} transition-colors`}
                  >
                    <Phone className={`w-6 h-6 ${classes.accent} mt-1 flex-shrink-0`} />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p data-content-key="business.phone_display">{content.business.phone_display}</p>
                    </div>
                  </a>
                  <a
                    href={content.contact.google_maps_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-start space-x-3 ${classes.text} hover:${classes.accent} transition-colors`}
                  >
                    <MapPin className={`w-6 h-6 ${classes.accent} mt-1 flex-shrink-0`} />
                    <div>
                      <p className="font-semibold">Address</p>
                      <p>
                        <span data-content-key="business.address_line1">{content.business.address_line1}</span>
                        <br />
                        <span data-content-key="business.address_line2">{content.business.address_line2}</span>
                        <br />
                        <span data-content-key="business.address_country">{content.business.address_country}</span>
                      </p>
                    </div>
                  </a>
                  <a
                    href={content.business.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-start space-x-3 ${classes.text} hover:${classes.accent} transition-colors`}
                  >
                    <Facebook className={`w-6 h-6 ${classes.accent} mt-1 flex-shrink-0`} />
                    <div>
                      <p className="font-semibold">Facebook</p>
                      <p data-content-key="business.facebook_handle">{content.business.facebook_handle}</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className={`${classes.cardBg} rounded-2xl p-8 shadow-xl`}>
                <h3
                  className={`text-2xl font-bold ${classes.text} mb-6 flex items-center ${
                    theme === "bold" ? "font-display" : ""
                  }`}
                  style={
                    theme === "bold"
                      ? { fontFamily: "'Abril Fatface', serif" }
                      : theme === "luxury"
                      ? { fontFamily: "'Playfair Display', serif" }
                      : {}
                  }
                  data-content-key="contact.hours_heading"
                >
                  <Clock className={`w-6 h-6 ${classes.accent} mr-2`} />
                  {content.contact.hours_heading}
                </h3>
                <div className="space-y-2">
                  {content.hours.map((item, i) => (
                    <div
                      key={item.day}
                      className={`flex justify-between ${classes.text}`}
                      data-reorderable="hours"
                      data-reorder-index={i}
                      data-drag-handle-only
                    >
                      <span className="font-semibold" data-content-key={`hours.${i}.day`}>{item.day}</span>
                      <span data-content-key={`hours.${i}.time`}>{item.time}</span>
                    </div>
                  ))}
                </div>
                <p className={`${classes.accent} font-semibold mt-6 text-center`} data-content-key="contact.walk_ins_note">
                  {content.contact.walk_ins_note}
                </p>
                <p className={`${classes.text} text-center mt-4`} data-content-key="contact.gift_cards_note">
                  {content.contact.gift_cards_note}
                </p>
              </div>

              {/* Map and Storefront */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`${classes.cardBg} rounded-2xl overflow-hidden shadow-xl`}>
                  <iframe
                    src={content.contact.google_maps_embed}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${content.business.name} Location`}
                  />
                </div>

                <div className={`${classes.cardBg} rounded-2xl overflow-hidden shadow-xl relative`}>
                  <img
                    src={imageSrc(content.contact.storefront_image)}
                    alt={`${content.business.name} Storefront`}
                    className="w-full h-full object-cover"
                  />
                  {isPreview && (
                    <button
                      onClick={() => openImgUpload("contact.storefront_image")}
                      className="absolute top-2 right-2 z-20 bg-black/60 hover:bg-black/80 text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer"
                    >
                      📷 Change Photo
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
