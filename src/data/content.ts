import { images } from './images';

/* ---------- Services ---------- */

export type Service = {
  id: string;
  index: string;
  title: string;
  short: string;
  description: string;
  image: string;
  alt: string;
  enquiryValue: ServiceOption;
};

export const services: Service[] = [
  {
    id: 'sound',
    index: '01',
    title: 'Professional Sound',
    short: 'Sound',
    description:
      'Clear, balanced sound for speeches, music and the moments everyone needs to hear, set up to suit your venue and crowd.',
    image: images.serviceSound,
    alt: 'Microphone on a stand in front of a softly lit audience',
    enquiryValue: 'Sound',
  },
  {
    id: 'lighting',
    index: '02',
    title: 'Stage Lighting',
    short: 'Lighting',
    description:
      'Atmospheric lighting that sets the mood, from warm and intimate to bold, colourful and celebratory.',
    image: images.serviceLighting,
    alt: 'Stage washed in blue and pink lighting above a crowd',
    enquiryValue: 'Lighting',
  },
  {
    id: 'led',
    index: '03',
    title: 'LED Wall',
    short: 'LED Wall',
    description:
      'A bright visual centrepiece for names, photos, slideshows, logos and live moments on stage.',
    image: images.serviceLed,
    alt: 'Large event hall with wide LED screens behind a stage',
    enquiryValue: 'LED wall',
  },
  {
    id: 'decoration',
    index: '04',
    title: 'Event Decoration',
    short: 'Decoration',
    description:
      'Thoughtful styling and decoration that ties your theme together, from table details to the main backdrop.',
    image: images.serviceDecoration,
    alt: 'Long dining table styled with flowers and glassware',
    enquiryValue: 'Decoration',
  },
];

/* ---------- Event categories (packages) ---------- */

export type EventCategory = {
  id: string;
  label: string;
  title: string;
  description: string;
  ideas: string[];
  image: string;
  alt: string;
};

/**
 * "ideas" are services a customer might ask about for this occasion —
 * NOT confirmed package inclusions. Pricing and inclusions are confirmed
 * after enquiry.
 */
export const eventCategories: EventCategory[] = [
  {
    id: 'birthdays',
    label: 'Birthdays',
    title: 'Birthday celebrations',
    description:
      'From first birthdays to milestone parties, create a celebration with the right music, lighting and styling for the guest of honour.',
    ideas: ['Sound for music & speeches', 'Party lighting', 'Name or photo display on LED wall', 'Themed decoration'],
    image: images.catBirthday,
    alt: 'Colourful balloons floating against a soft background',
  },
  {
    id: 'communion',
    label: 'Holy Communion',
    title: 'Holy Communion',
    description:
      'Elegant, family-focused styling and clear sound for a meaningful day shared with the people who matter most.',
    ideas: ['Elegant table and backdrop styling', 'Sound for speeches & music', 'Soft ambient lighting'],
    image: images.catCommunion,
    alt: 'Reception tables with white linen and floral centrepieces',
  },
  {
    id: 'weddings',
    label: 'Weddings & Engagements',
    title: 'Weddings & engagements',
    description:
      'Set the tone for vows, first dances and receptions with atmosphere that feels personal and polished.',
    ideas: ['Reception lighting', 'Sound for ceremony & dance floor', 'Stage and backdrop decoration', 'LED wall for slideshows'],
    image: images.catWedding,
    alt: 'Couple dancing closely in wedding attire',
  },
  {
    id: 'cultural',
    label: 'Cultural Events',
    title: 'Cultural events',
    description:
      'Bring colour, music and energy to cultural celebrations and community gatherings of every kind.',
    ideas: ['Sound for performances', 'Colourful stage lighting', 'Decoration to suit the occasion'],
    image: images.catCultural,
    alt: 'Crowd celebrating amid clouds of bright coloured powder',
  },
  {
    id: 'corporate',
    label: 'Corporate Events',
    title: 'Corporate programs',
    description:
      'Presentations, launches, awards and team events with clear audio, clean lighting and on-screen visuals.',
    ideas: ['Microphones & presentation audio', 'LED wall for slides & branding', 'Stage lighting'],
    image: images.catCorporate,
    alt: 'Panel discussion on a lit stage in front of an audience',
  },
  {
    id: 'mega',
    label: 'Mega Events',
    title: 'Mega events',
    description:
      'Larger-scale productions combining sound, lighting, LED and decoration. Tell us the scope and we will talk through options.',
    ideas: ['Combined sound, lighting, LED & decoration', 'Scope discussed on enquiry'],
    image: images.catMega,
    alt: 'Confetti falling over a large crowd in front of a bright stage',
  },
];

/* ---------- Production story ---------- */

export const storySteps = [
  {
    label: 'The venue',
    caption: 'Every event begins with a space, a date and an idea.',
    image: images.storyVenue,
    alt: 'Empty banquet hall with round tables before guests arrive',
  },
  {
    label: 'The setup',
    caption: 'Sound, staging and lighting are planned around your venue.',
    image: images.storyRigging,
    alt: 'Stage truss and lighting rig in blue haze',
  },
  {
    label: 'The atmosphere',
    caption: 'Lights come up and the room starts to feel like an occasion.',
    image: images.storyLights,
    alt: 'Warm stage lights glowing through haze over a crowd',
  },
  {
    label: 'Showtime',
    caption: 'Your guests arrive. The celebration takes over.',
    image: images.storyShowtime,
    alt: 'Confetti falling over a celebrating crowd',
  },
];

/* ---------- Gallery (demo categories, not completed projects) ---------- */

export type GalleryItem = {
  id: string;
  category: string;
  title: string;
  image: string;
  alt: string;
};

export const galleryItems: GalleryItem[] = [
  { id: 'g1', category: 'Birthdays', title: 'Birthday Celebration Setup', image: images.galleryBirthday, alt: 'Party crowd under festoon string lights' },
  { id: 'g2', category: 'Weddings', title: 'Wedding Reception Styling', image: images.galleryWedding, alt: 'Bride holding a bouquet in warm light' },
  { id: 'g3', category: 'Concert Lighting', title: 'Colour & Beam Lighting', image: images.galleryCultural, alt: 'Vivid multicoloured stage lights over a crowd' },
  { id: 'g4', category: 'Corporate', title: 'Corporate Stage & Screen', image: images.galleryCorporate, alt: 'Audience facing a large screen in a blue-lit room' },
  { id: 'g5', category: 'Concert Lighting', title: 'Warm Stage Atmosphere', image: images.galleryConcert, alt: 'Silhouetted crowd before an orange-lit stage' },
  { id: 'g6', category: 'Sound & LED', title: 'Sound & Stage Setup', image: images.gallerySoundLed, alt: 'DJ stage with truss lighting above a crowd' },
  { id: 'g7', category: 'Celebrations', title: 'Crowd Moments', image: images.galleryCrowd, alt: 'Hands making heart shapes in front of stage lights' },
  { id: 'g8', category: 'Engagements', title: 'Engagement Details', image: images.galleryRings, alt: 'Couple holding hands showing rings and bouquet' },
];

/* ---------- Booking options ---------- */

export const eventTypeOptions = [
  'Birthday',
  'Holy Communion',
  'Wedding',
  'Engagement',
  'Cultural event',
  'Corporate program',
  'Mega event',
  'Other celebration',
] as const;

export const serviceOptions = ['Sound', 'Lighting', 'LED wall', 'Decoration'] as const;
export type ServiceOption = (typeof serviceOptions)[number];
