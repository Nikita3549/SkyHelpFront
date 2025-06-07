export const getNavigationData = () => {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Check Eligibility', href: '/claim' },
    { name: 'FAQ', href: '/#faq' },
  ];

  const passengerRightsLinks = [
    { name: 'Air Passenger Rights', href: '/rights/air-passenger-rights' },
    {
      name: 'Delayed Flight Compensation',
      href: '/rights/delayed-flight-compensation.svg',
    },
    {
      name: 'Overbooked Flight Compensation',
      href: '/rights/overbooked-flight-compensation.svg',
    },
    {
      name: 'Cancelled Flight Compensation',
      href: '/rights/cancelled-flight-compensation.svg',
    },
    {
      name: 'Denied Boarding Compensation',
      href: '/rights/denied-boarding-compensation.svg',
    },
    {
      name: 'Missed Connection Compensation',
      href: '/rights/missed-connection-compensation.svg',
    },
    {
      name: 'Airline Strike Compensation',
      href: '/rights/airline-strike-compensation.svg',
    },
    {
      name: 'Delayed Baggage Compensation',
      href: '/rights/delayed-baggage-compensation.svg',
    },
    { name: 'Flight Compensation', href: '/rights/flight-compensation.svg' },
    { name: 'SHY Regulation Turkey', href: '/rights/shy-regulation-turkey' },
    { name: 'ANAC 400 Regulation', href: '/rights/anac-400-regulation' },
    {
      name: 'UK 261 Flight Compensation',
      href: '/rights/uk-261-flight-compensation.svg',
    },
  ];

  return { navigation, passengerRightsLinks };
};
