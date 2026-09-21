/**
 * =========================================================================
 * TAKDIR HAIR STYLE - SALON CONFIGURATION FILE
 * =========================================================================
 * You can edit all your salon details in this ONE single file!
 * Any changes made here will automatically reflect across ALL pages:
 * - index.html (Home)
 * - about.html (About Us)
 * - services.html (Services)
 * - our-work.html (Our Work / Gallery)
 * - contact.html (Contact Us)
 * =========================================================================
 */

const SALON_CONFIG = {
  // 1. BUSINESS NAME
  salonName: "Takdir Hair Style",
  tagline: "Your Style. Your Confidence. Your Takdir.",

  // 2. PHONE NUMBERS (FOR CALLING)
  phone1: "+919104112214",
  phone1Display: "+91 91041 12214",
  phone2: "+919824401958",
  phone2Display: "+91 98244 01958",
  phoneNumber: "+919104112214",
  phoneDisplay: "+91 91041 12214 / +91 98244 01958",

  // 3. WHATSAPP NUMBER (FOR DIRECT BOOKINGS & ALL CUSTOMER DETAILS)
  // When a customer books an appointment, all details are sent directly to this number:
  whatsappNumber: "919104112214",
  whatsappDisplay: "+91 91041 12214",

  // 4. EMAIL ADDRESS
  email: "jaydipnayi676@gmail.com",
  emailDisplay: "jaydipnayi676@gmail.com",

  // 5. SALON ADDRESS
  address: "Janta Market, Bank of Baroda Same, Three Gate, Visnagar",
  addressLocality: "Visnagar",
  addressRegion: "Gujarat",

  // 6. OPENING HOURS
  openingHours: "Monday - Sunday: 9:00 AM - 9:00 PM",
  openingHoursShort: "Mon - Sun: 9 AM - 9 PM",

  // 7. SOCIAL MEDIA URLS (Replace with your actual profile links if available)
  instagramUrl: "", // e.g., "https://instagram.com/takdirhairstyle"
  facebookUrl: "",  // e.g., "https://facebook.com/takdirhairstyle"
  youtubeUrl: "",   // e.g., "https://youtube.com/@takdirhairstyle"

  // 8. GOOGLE MAPS EMBED URL
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=Three+Gate+Visnagar+Gujarat&t=&z=16&ie=UTF8&iwloc=&output=embed",
  googleMapsLink: "https://maps.google.com/?q=Three+Gate+Visnagar+Gujarat",

  // 9. WEBSITE DOMAIN
  domainUrl: "https://takdirhairstyle.com/",

  // 10. DEFAULT WHATSAPP PRE-FILLED MESSAGES
  defaultWhatsappMessage: "Hello Takdir Hair Style, I would like to book an appointment.",
  serviceInquiryMessage: "Hello Takdir Hair Style, I would like to know more about your services."
};

// Export to window object for browser access
if (typeof window !== "undefined") {
  window.SALON_CONFIG = SALON_CONFIG;
}
