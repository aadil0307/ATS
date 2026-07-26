import { site, SOCIAL } from "@/lib/site";

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/logo/ace.png`,
        image: `${site.url}/logo/ace.png`,
        description: "Ace Tech Solutions is a premium technology partner. We build digital products, scale engineering teams, and ship fast — from funded startups to global enterprises.",
        sameAs: [
          SOCIAL.linkedin,
          SOCIAL.twitter,
          SOCIAL.instagram
        ].filter(Boolean),
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phone.display,
          contactType: "customer service",
          email: site.email,
          availableLanguage: ["English"]
        }
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: "Ace Tech Solutions | Elite Software Development & AI Agency",
        publisher: {
          "@id": `${site.url}/#organization`
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
