/**
 * TRACK AUTOMOTIVE - Centralized Business Configuration
 * 
 * All components across the application consume phone numbers, WhatsApp details,
 * addresses, working hours, and social media links directly from this file.
 */

export interface BusinessConfig {
  name: string;
  legalName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  aboutHeadline: string;
  phone: {
    display: string;
    raw: string; // international dialer format without spaces
  };
  whatsapp: {
    display: string;
    number: string; // for wa.me URL
    defaultMessage: string;
  };
  email: string;
  address: {
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
    landmark: string;
  };
  workingHours: {
    days: string;
    hours: string;
    sunday: string;
    note: string;
  };
  map: {
    embedUrl: string;
    directionsUrl: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  social: {
    instagram: string;
    facebook: string;
    youtube?: string;
  };
}

export const BUSINESS_CONFIG: BusinessConfig = {
  name: "TRACK AUTOMOTIVE",
  legalName: "TRACK AUTOMOTIVE",
  tagline: "PRECISION. PERFORMANCE. PERFECTION.",
  heroHeadline: "PRECISION. PERFORMANCE. PERFECTION.",
  heroSubheadline:
    "Experience automotive excellence with professional expertise, state-of-the-art diagnostic technology, and unmatched passion for perfection.",
  aboutHeadline: "ABOUT TRACK AUTOMOTIVE",
  phone: {
    display: "+91 75300 50073",
    raw: "+917530050073",
  },
  whatsapp: {
    display: "+91 75300 50073",
    number: "917530050073",
    defaultMessage:
      "Hello TRACK AUTOMOTIVE, I visited your website and would like to know more about your automotive services.",
  },
  email: "info@trackautomotive.in",
  address: {
    street: "No: 72, HDFC Lane, Parakai Road",
    area: "Elankadai, Kottar",
    city: "Nagercoil",
    state: "Tamil Nadu",
    pincode: "629002",
    full: "No: 72, HDFC Lane, Parakai Road, Elankadai, Kottar, Nagercoil, Tamil Nadu - 629002",
    landmark: "Near HDFC Bank, Parakai Main Road",
  },
  workingHours: {
    days: "Monday – Saturday",
    hours: "9:00 AM – 7:30 PM",
    sunday: "Emergency / Prior Appointment Only",
    note: "Customer Support & Direct Calls Active 24/7",
  },
  map: {
    // Verified Google Maps embed query for Track Automotive Kottar Nagercoil
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.493863717208!2d77.4326584!3d8.1741547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f128e4e797a7%3A0xe53a3efc8e2b85e9!2sTrack%20Automotive!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    directionsUrl:
      "https://maps.google.com/?q=Track+Automotive+No+72+HDFC+Lane+Parakai+Road+Elankadai+Kottar+Nagercoil",
    coordinates: {
      lat: 8.17415,
      lng: 77.43265,
    },
  },
  social: {
    instagram: "https://www.instagram.com/track_automotive",
    facebook: "https://www.facebook.com/trackautomotive",
  },
};

/**
 * Creates a valid tel: URL for phone calls
 */
export function getPhoneCallUrl(): string {
  return `tel:${BUSINESS_CONFIG.phone.raw}`;
}

/**
 * Creates a valid WhatsApp redirect URL with an encoded pre-filled message
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const message = customMessage || BUSINESS_CONFIG.whatsapp.defaultMessage;
  return `https://wa.me/${BUSINESS_CONFIG.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates a WhatsApp URL specifically for a service inquiry
 */
export function getServiceWhatsAppUrl(serviceTitle: string): string {
  const message = `Hello TRACK AUTOMOTIVE, I am interested in your ${serviceTitle} service. Could you please share more details, turnaround time, and pricing?`;
  return getWhatsAppUrl(message);
}

/**
 * Creates a WhatsApp URL specifically for a gallery item or project inquiry
 */
export function getGalleryWhatsAppUrl(itemTitle: string): string {
  const message = `Hello TRACK AUTOMOTIVE, I saw your work on "${itemTitle}" on your website gallery. I would love to get a quote and details for my car.`;
  return getWhatsAppUrl(message);
}

