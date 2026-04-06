import { MapPin, Phone, Facebook, Clock } from "lucide-react";
import { Link } from "react-router";
import { useTheme } from "../context/ThemeContext";
import { useContent } from "../hooks/useContent";

export default function Footer() {
  const { theme } = useTheme();
  const content = useContent();

  const getThemeClasses = () => {
    switch (theme) {
      case "luxury":
        return {
          bg: "bg-[#1a1a1a]",
          text: "text-gray-300",
          accent: "text-[#d4a574]",
          hover: "hover:text-[#d4a574]",
        };
      case "warmth":
        return {
          bg: "bg-[#f5ebe6]",
          text: "text-[#5a4a42]",
          accent: "text-[#d4a59a]",
          hover: "hover:text-[#d4a59a]",
        };
      case "bold":
        return {
          bg: "bg-gray-900",
          text: "text-gray-300",
          accent: "text-[#e91e8c]",
          hover: "hover:text-[#e91e8c]",
        };
    }
  };

  const classes = getThemeClasses();

  return (
    <footer className={`${classes.bg} ${classes.text} py-12`}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className={`text-xl font-bold ${classes.accent} mb-4`} data-content-key="footer.contact_heading">
              {content.footer.contact_heading}
            </h3>
            <div className="space-y-3">
              <a
                href={`tel:${content.business.phone_tel}`}
                className={`flex items-start space-x-3 ${classes.hover} transition-colors`}
              >
                <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                <span data-content-key="business.phone_display">{content.business.phone_display}</span>
              </a>
              <a
                href={content.contact.google_maps_link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-start space-x-3 ${classes.hover} transition-colors`}
              >
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>
                  <span data-content-key="business.address_line1">{content.business.address_line1}</span>
                  <br />
                  <span data-content-key="business.address_line2">{content.business.address_line2}</span>
                  <br />
                  <span data-content-key="business.address_country">{content.business.address_country}</span>
                </span>
              </a>
              <a
                href={content.business.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-3 ${classes.hover} transition-colors`}
              >
                <Facebook className="w-5 h-5" />
                <span>Follow us on Facebook</span>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className={`text-xl font-bold ${classes.accent} mb-4 flex items-center`} data-content-key="footer.hours_heading">
              <Clock className="w-5 h-5 mr-2" />
              {content.footer.hours_heading}
            </h3>
            <div className="space-y-2 text-sm">
              {content.hours.map((item, i) => (
                <div
                  key={item.day}
                  className="flex justify-between"
                  data-reorderable="hours"
                  data-reorder-index={i}
                  data-drag-handle-only
                >
                  <span className="font-medium" data-content-key={`hours.${i}.day`}>{item.day}</span>
                  <span data-content-key={`hours.${i}.time`}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-xl font-bold ${classes.accent} mb-4`} data-content-key="footer.links_heading">
              {content.footer.links_heading}
            </h3>
            <nav className="space-y-2">
              <Link to="/" className={`block ${classes.hover} transition-colors`}>Home</Link>
              <Link to="/about" className={`block ${classes.hover} transition-colors`}>About Us</Link>
              <Link to="/services" className={`block ${classes.hover} transition-colors`}>Services</Link>
              <Link to="/gallery" className={`block ${classes.hover} transition-colors`}>Gallery</Link>
              <Link to="/pricing" className={`block ${classes.hover} transition-colors`}>Pricing</Link>
              <Link to="/contact" className={`block ${classes.hover} transition-colors`}>Contact & Book</Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm">
          <p>© {new Date().getFullYear()} <span data-content-key="business.name">{content.business.name}</span>. All rights reserved.</p>
          <p className="mt-2" data-content-key="contact.walk_ins_note">{content.contact.walk_ins_note}</p>
        </div>
      </div>
    </footer>
  );
}
