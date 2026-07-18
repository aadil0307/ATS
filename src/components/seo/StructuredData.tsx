const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://acetech.in";

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Ace Tech Solutions",
        url: SITE,
        description:
          "A premium technology partner. We build digital products, scale engineering teams, and ship fast.",
      },
      {
        "@type": "WebSite",
        name: "Ace Tech Solutions",
        url: SITE,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
