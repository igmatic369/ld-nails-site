import { useTheme } from "../context/ThemeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useContent } from "../hooks/useContent";

export default function Pricing() {
  const { theme } = useTheme();
  const content = useContent();

  // Keyed lookup rebuilt from sections array — must be inside component since content comes from hook
  const pricingData = Object.fromEntries(
    content.pricing.sections.map((s) => [s.key, s.items])
  ) as Record<string, { name: string; price: string }[]>

  const sectionByKey = Object.fromEntries(
    content.pricing.sections.map((s) => [s.key, s])
  )

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

  // Helper: render pricing items for a given section key
  function PricingItems({ sectionKey, sectionIndex }: { sectionKey: string; sectionIndex: number }) {
    const items = pricingData[sectionKey] ?? []
    return (
      <>
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-start pb-2 border-b border-gray-200 last:border-0"
          >
            <span className={`${classes.text} flex-1`} data-content-key={`pricing.sections.${sectionIndex}.items.${index}.name`}>
              {item.name}
            </span>
            <span className={`${classes.accent} font-semibold ml-2`} data-content-key={`pricing.sections.${sectionIndex}.items.${index}.price`}>
              {item.price}
            </span>
          </div>
        ))}
      </>
    )
  }

  // For warmth theme with tabs
  if (theme === "warmth") {
    return (
      <div className={classes.bg}>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className={`text-5xl md:text-6xl font-bold ${classes.text} mb-6`}>
                Pricing
              </h1>
              <p className={`${classes.subtext} text-xl`} data-content-key="pricing.intro">
                {content.pricing.intro}
              </p>
            </div>

            <div className={`max-w-4xl mx-auto ${classes.cardBg} rounded-2xl p-8 shadow-xl`}>
              <Tabs defaultValue={content.pricing.sections[0].key} className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
                  {content.pricing.sections.map((section, sectionIndex) => (
                    <TabsTrigger key={section.key} value={section.key}>
                      <span data-content-key={`pricing.sections.${sectionIndex}.title`}>{section.title}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {content.pricing.sections.map((section, sectionIndex) => (
                  <TabsContent key={section.key} value={section.key} className="space-y-4">
                    {section.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
                      >
                        <span className={classes.text} data-content-key={`pricing.sections.${sectionIndex}.items.${index}.name`}>
                          {item.name}
                        </span>
                        <span className={`${classes.accent} font-semibold`} data-content-key={`pricing.sections.${sectionIndex}.items.${index}.price`}>
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        <section className={`py-16 ${classes.cardBg}`}>
          <div className="container mx-auto px-4 text-center">
            <h2 className={`text-4xl font-bold ${classes.text} mb-6`}>
              Gift Cards & Booking
            </h2>
            <p className={`${classes.subtext} text-xl mb-4 max-w-2xl mx-auto`}>
              Call us today or visit our contact page to schedule your appointment.
            </p>
            <p className={`${classes.subtext} mb-8 max-w-2xl mx-auto`} data-content-key="contact.gift_cards_note">
              {content.contact.gift_cards_note}
            </p>
            <a
              href="/contact"
              className={`${classes.accentBg} text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity inline-block`}
            >
              Book Appointment
            </a>
          </div>
        </section>
      </div>
    );
  }

  // For bold theme with 3 columns
  if (theme === "bold") {
    const col1Sections = ["artificialNails", "nailCare"]
    const col2Sections = ["kids", "waxFace", "waxBody"]
    const col3Sections = ["spaExtras"]

    return (
      <div className={classes.bg}>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1
                className={`text-5xl md:text-6xl font-bold ${classes.text} mb-6 font-display`}
                style={{ fontFamily: "'Abril Fatface', serif" }}
              >
                Pricing
              </h1>
              <p className={`${classes.subtext} text-xl`} data-content-key="pricing.intro">
                {content.pricing.intro}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Column 1 */}
              <div className={`${classes.cardBg} rounded-xl p-8 shadow-lg`}>
                {col1Sections.map((key) => {
                  const sec = sectionByKey[key]
                  if (!sec) return null
                  const sectionIndex = content.pricing.sections.findIndex((s) => s.key === key)
                  return (
                    <div key={key} className="mb-8 last:mb-0">
                      <h2
                        className={`text-3xl font-bold ${classes.accent} mb-6 font-display`}
                        style={{ fontFamily: "'Abril Fatface', serif" }}
                        data-content-key={`pricing.sections.${sectionIndex}.title`}
                      >
                        {sec.title}
                      </h2>
                      <div className="space-y-4">
                        <PricingItems sectionKey={key} sectionIndex={sectionIndex} />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Column 2 */}
              <div className={`${classes.cardBg} rounded-xl p-8 shadow-lg`}>
                {col2Sections.map((key) => {
                  const sec = sectionByKey[key]
                  if (!sec) return null
                  const sectionIndex = content.pricing.sections.findIndex((s) => s.key === key)
                  return (
                    <div key={key} className="mb-8 last:mb-0">
                      <h2
                        className={`text-3xl font-bold ${classes.accent} mb-6 font-display`}
                        style={{ fontFamily: "'Abril Fatface', serif" }}
                        data-content-key={`pricing.sections.${sectionIndex}.title`}
                      >
                        {sec.title}
                      </h2>
                      <div className="space-y-4">
                        <PricingItems sectionKey={key} sectionIndex={sectionIndex} />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Column 3 */}
              <div className={`${classes.cardBg} rounded-xl p-8 shadow-lg`}>
                {col3Sections.map((key) => {
                  const sec = sectionByKey[key]
                  if (!sec) return null
                  const sectionIndex = content.pricing.sections.findIndex((s) => s.key === key)
                  return (
                    <div key={key} className="mb-8 last:mb-0">
                      <h2
                        className={`text-3xl font-bold ${classes.accent} mb-6 font-display`}
                        style={{ fontFamily: "'Abril Fatface', serif" }}
                        data-content-key={`pricing.sections.${sectionIndex}.title`}
                      >
                        {sec.title}
                      </h2>
                      <div className="space-y-4">
                        <PricingItems sectionKey={key} sectionIndex={sectionIndex} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className={`py-16 ${classes.accentBg}`}>
          <div className="container mx-auto px-4 text-center">
            <h2
              className={`text-4xl font-bold text-white mb-6 font-display`}
              style={{ fontFamily: "'Abril Fatface', serif" }}
            >
              Book Your Appointment Today!
            </h2>
            <p className="text-xl text-white mb-4 max-w-2xl mx-auto">
              Call us or visit our contact page to schedule. Walk-ins always welcome!
            </p>
            <p className="text-lg text-white mb-8 max-w-2xl mx-auto" data-content-key="contact.gift_cards_note">
              {content.contact.gift_cards_note}
            </p>
            <a
              href="/contact"
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    );
  }

  // Luxury theme — 2-column elegant grid
  return (
    <div className={classes.bg}>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1
              className={`text-5xl md:text-6xl font-bold ${classes.text} mb-6 font-serif`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Pricing
            </h1>
            <p className={`${classes.subtext} text-xl`} data-content-key="pricing.intro">
              {content.pricing.intro}
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {content.pricing.sections.map((section, sectionIndex) => (
              <div key={section.key} className={`${classes.cardBg} rounded-xl p-8 shadow-lg`}>
                <h2
                  className={`text-2xl font-bold ${classes.accent} mb-6 font-serif`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  data-content-key={`pricing.sections.${sectionIndex}.title`}
                >
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start pb-3 border-b border-gray-700 last:border-0"
                    >
                      <span className={`${classes.text} flex-1`} data-content-key={`pricing.sections.${sectionIndex}.items.${index}.name`}>
                        {item.name}
                      </span>
                      <span className={`${classes.accent} font-semibold ml-4`} data-content-key={`pricing.sections.${sectionIndex}.items.${index}.price`}>
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-16 ${classes.accentBg}`}>
        <div className="container mx-auto px-4 text-center">
          <h2
            className={`text-4xl font-bold text-[#1a1a1a] mb-6 font-serif`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Schedule Your Appointment
          </h2>
          <p className="text-xl text-[#1a1a1a] mb-4 max-w-2xl mx-auto">
            Experience luxury nail care. Book your appointment today.
          </p>
          <p className="text-lg text-[#1a1a1a] mb-8 max-w-2xl mx-auto" data-content-key="contact.gift_cards_note">
            {content.contact.gift_cards_note}
          </p>
          <a
            href="/contact"
            className="bg-[#1a1a1a] text-[#d4a574] px-8 py-4 rounded-full font-semibold hover:bg-[#2a2a2a] transition-colors inline-block"
          >
            Book Now
          </a>
        </div>
      </section>
    </div>
  );
}
