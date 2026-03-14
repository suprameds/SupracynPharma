/**
 * JSON-LD Structured Data components.
 *
 * Renders <script type="application/ld+json"> tags for Google rich results.
 * All components are Server-Components-safe (no "use client" needed).
 */

interface OrganizationJsonLdProps {
  url?: string;
}

/** MedicalOrganization + LocalBusiness combined — placed once in the root layout. */
export function OrganizationJsonLd({ url = "https://supracynpharma.com" }: OrganizationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "MedicalOrganization"],
        "@id": `${url}/#organization`,
        name: "Supracyn Pharma",
        url,
        logo: {
          "@type": "ImageObject",
          url: `${url}/favicon.svg`,
        },
        description:
          "Supracyn Pharma is a Hyderabad-based pharmaceutical brand-marketing company. We market 600+ branded formulations across Cardiology, Diabetology, Neurology, Anti-Infectives, Gastroenterology, and more — sourced from WHO-GMP certified partners.",
        foundingDate: "2014",
        founders: [{ "@type": "Person", name: "Supracyn Pharma Founders" }],
        address: {
          "@type": "PostalAddress",
          streetAddress: "H. No: 7-1-277/113(242/C), Near BK Guda Park, Balkampet",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "500018",
          addressCountry: "IN",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+91-91820-27651",
            contactType: "sales",
            areaServed: "IN",
            availableLanguage: ["en", "te", "hi"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+91-70324-27651",
            contactType: "customer service",
            areaServed: "IN",
          },
        ],
        email: "supracyn@gmail.com",
        sameAs: ["https://www.supracynpharma.com"],
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        knowsAbout: [
          "Pharmaceutical Marketing",
          "Cardiology",
          "Diabetology",
          "Neurology",
          "Anti-Infectives",
          "Gastroenterology",
          "WHO-GMP Certified Manufacturing",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${url}/#localbusiness`,
        name: "Supracyn Pharma",
        url,
        telephone: "+91-91820-27651",
        email: "supracyn@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "H. No: 7-1-277/113(242/C), Near BK Guda Park, Balkampet",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "500018",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 17.4425,
          longitude: 78.4495,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        priceRange: "₹₹",
        image: `${url}/images/hero_corporate.png`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: { name: string; url: string }[];
}

/** BreadcrumbList — add to any inner page. */
export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  publishedDate?: string;
  authorName?: string;
}

/** Article schema — for /insights/[slug] pages. */
export function ArticleJsonLd({
  title,
  description,
  url,
  imageUrl,
  publishedDate,
  authorName = "Supracyn Pharma Editorial",
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    image: imageUrl,
    datePublished: publishedDate,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Supracyn Pharma",
      logo: {
        "@type": "ImageObject",
        url: "https://supracynpharma.com/favicon.svg",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebPageJsonLdProps {
  name: string;
  description: string;
  url: string;
}

/** WebPage schema — for static marketing pages. */
export function WebPageJsonLd({ name, description, url }: WebPageJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: {
      "@id": "https://supracynpharma.com/#organization",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
