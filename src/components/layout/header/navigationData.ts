
type NavigationItem = {
  name: string;
  href: string;
  submenu?: NavigationItem[];
};

export const navigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Passenger Rights",
    href: "/rights/air-passenger-rights",
    submenu: [
      { name: "Air Passenger Rights", href: "/rights/air-passenger-rights" },
      { name: "Flight Compensation", href: "/rights/flight-compensation" },
      { name: "Delayed Flight", href: "/rights/delayed-flight-compensation" },
      { name: "Cancelled Flight", href: "/rights/cancelled-flight-compensation" },
      { name: "Overbooked Flight", href: "/rights/overbooked-flight-compensation" },
      { name: "Denied Boarding", href: "/rights/denied-boarding-compensation" },
      { name: "Missed Connection", href: "/rights/missed-connection-compensation" },
      { name: "Airline Strike", href: "/rights/airline-strike-compensation" },
      { name: "Delayed Baggage", href: "/rights/delayed-baggage-compensation" },
      { name: "UK 261 Regulation", href: "/rights/uk-261-flight-compensation" },
      { name: "SHY Regulation (Turkey)", href: "/rights/shy-regulation-turkey" },
      { name: "ANAC 400 Regulation", href: "/rights/anac-400-regulation" },
    ],
  },
  {
    name: "Partnerships",
    href: "/affiliate",
    submenu: [
      { name: "Affiliate Program", href: "/affiliate" },
      { name: "Legal Partnerships", href: "/legal-partnership" },
      { name: "B2B Partnerships", href: "/b2b-partnership" },
    ],
  },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Users", href: "/users" },
  { name: "Admin", href: "/admin" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];
