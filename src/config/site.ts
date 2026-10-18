/**
 * Central brand + contact configuration.
 * Only client-supplied facts live here. Do not add an address, email,
 * socials, hours, reviews or metrics until the client provides them.
 */

export type Contact = {
  id: 'gm' | 'lj';
  initials: string;
  role: string;
  phoneDisplay: string;
  phoneHref: string;
  /** Set to true only after the client confirms this number supports WhatsApp. */
  whatsapp: boolean;
};

export const site = {
  name: 'PRO EVENTS CAIRNS',
  shortName: 'PRO EVENTS',
  tagline: 'Make Every Celebration Special',
  location: 'Cairns, Australia',
  services: ['Sound', 'Lighting', 'LED Wall', 'Decoration'],
  startingPrice: '$300',
  attribution: 'Light & Sound by GM | Decoration by LJ',
  contacts: [
    {
      id: 'gm',
      initials: 'GM',
      role: 'Light & Sound',
      phoneDisplay: '0451 316 304',
      phoneHref: 'tel:+61451316304',
      whatsapp: false,
    },
    {
      id: 'lj',
      initials: 'LJ',
      role: 'Decoration',
      phoneDisplay: '0451 980 076',
      phoneHref: 'tel:+61451980076',
      whatsapp: false,
    },
  ] satisfies Contact[],
} as const;

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Our Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;
