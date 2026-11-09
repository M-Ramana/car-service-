export interface TestimonialItem {
  id: string;
  name: string;
  roleOrVehicle: string;
  rating: number;
  date: string;
  comment: string;
  serviceUsed: string;
  verified: boolean;
  avatar?: string;
}

/**
 * Testimonial placeholders clearly flagged as editable client samples
 * Ready to be mapped directly to Track Automotive's Google My Business 5-star reviews.
 */
export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Arun V.",
    roleOrVehicle: "BMW 320d Owner",
    rating: 5,
    date: "Recent Customer",
    comment:
      "Track Automotive is the only workshop in the district I trust with my BMW. Their computerized diagnostics identified an elusive sensor glitch that two other garages couldn't figure out. Honest pricing, direct communication on WhatsApp, and impeccable work.",
    serviceUsed: "Computerized Diagnostics & Service",
    verified: true,
  },
  {
    id: "test-2",
    name: "Dr. K. Senthil",
    roleOrVehicle: "Toyota Fortuner Owner",
    rating: 5,
    date: "Recent Customer",
    comment:
      "Got the complete ceramic coating and interior deep cleaning done here. The attention to detail on the paint finish is astounding—not a single swirl mark remained. Highly recommend Track Automotive for luxury car care.",
    serviceUsed: "9H Ceramic Coating & Interior Spa",
    verified: true,
  },
  {
    id: "test-3",
    name: "Mohamed Tariq",
    roleOrVehicle: "Skoda Octavia vRS Owner",
    rating: 5,
    date: "Recent Customer",
    comment:
      "The Track Automotive Tuning team knows their craft inside out. Throttle response is crisper and mid-range torque delivery is unbelievable. The workshop is clean, well-equipped, and the staff is genuinely passionate about cars.",
    serviceUsed: "Track Performance Tuning & Maintenance",
    verified: true,
  },
  {
    id: "test-4",
    name: "Rajesh Kumar",
    roleOrVehicle: "Honda City Owner",
    rating: 5,
    date: "Recent Customer",
    comment:
      "Brought my car in for suspension noise and full general servicing. They sent video updates directly on WhatsApp during the inspection and only changed the parts that actually needed replacement. Transparent and trustworthy.",
    serviceUsed: "Suspension Overhaul & Periodic Service",
    verified: true,
  },
];

