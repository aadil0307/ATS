// Single source of truth for contact + identity constants.
// Everything is env-gated with the real defaults so the site is correct
// out of the box and can be overridden per-deployment without touching code.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://acetech.in";

// Canonical contact details. Phone doubles as the WhatsApp number.
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "acetechsolutions26@gmail.com";
// E.164 phone (whatsapp accepts it without the leading +).
const PHONE_E164 =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919892269474";

const WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919892269474";

export const site = {
  name: "Ace Tech Solutions",
  url: SITE_URL,
  email: EMAIL,
  phone: {
    /** Human-readable, with the + */
    display: `+${PHONE_E164}`,
    /** wa.me href (no leading +, wa.me format) */
    whatsapp: `https://wa.me/${WHATSAPP}`,
    /** tel: href */
    tel: `tel:+${PHONE_E164}`,
  },
  whatsappNumber: WHATSAPP,
};

// Founder & CEO — used for JSON-LD, auto-reply signatures, careers routing.
export const FOUNDER = {
  name: "Mohammad Aadil Shaikh",
  role: "Founder & CEO",
  email: site.email,
};

// Optional social links. Leave a key empty string to omit that link.
export const SOCIAL = {
  linkedin:
    process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ??
    "https://www.linkedin.com/company/acetechsolutions-26/",
  twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER ?? "",
  instagram:
    process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ??
    "https://www.instagram.com/ace_techsolutions",
  github: process.env.NEXT_PUBLIC_SOCIAL_GITHUB ?? "",
};

/** Social entries that are actually set (for rendering nav/footer links). */
export const socialLinks = (
  [
    { label: "LinkedIn", href: SOCIAL.linkedin },
    { label: "Twitter", href: SOCIAL.twitter },
    { label: "Instagram", href: SOCIAL.instagram },
    { label: "GitHub", href: SOCIAL.github },
  ] as const
).filter((s) => s.href.length > 0);
