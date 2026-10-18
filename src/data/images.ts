/**
 * Every image path on the site, in one place.
 *
 * DEMO PLACEHOLDERS: all files in /public/images/demo are stock photos
 * (Unsplash) used for layout only. They do NOT depict PRO EVENTS CAIRNS'
 * own work. Replace each with client-supplied photography before launch
 * (see ASSET_CHECKLIST.md) and keep the same keys.
 */

const demo = (file: string) => `/images/demo/${file}.jpg`;

export const images = {
  hero: demo('hero-stage'),
  intro: demo('intro-toast'),

  serviceSound: demo('service-sound'),
  serviceLighting: demo('service-lighting'),
  serviceLed: demo('service-led'),
  serviceDecoration: demo('service-decoration'),

  catBirthday: demo('cat-birthday'),
  catCommunion: demo('cat-communion'),
  catWedding: demo('cat-wedding'),
  catCultural: demo('cat-cultural'),
  catCorporate: demo('cat-corporate'),
  catMega: demo('cat-mega'),

  storyVenue: demo('story-venue'),
  storyRigging: demo('story-rigging'),
  storyLights: demo('story-lights'),
  storyShowtime: demo('story-showtime'),

  galleryBirthday: demo('gallery-birthday'),
  galleryWedding: demo('gallery-wedding'),
  galleryCultural: demo('gallery-cultural'),
  galleryCorporate: demo('gallery-corporate'),
  galleryConcert: demo('gallery-concert'),
  gallerySoundLed: demo('gallery-sound-led'),
  galleryCrowd: demo('gallery-crowd'),
  galleryRings: demo('gallery-rings'),

  about: demo('about-desk'),
  why: demo('why-performer'),
  cta: demo('cta-stage'),
} as const;

export const isDemoImagery = true;
