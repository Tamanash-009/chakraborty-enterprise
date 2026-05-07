import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CONTACT_INFO } from '../constants';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
  schemas?: any[];
}

export default function SEO({ 
  title, 
  description, 
  canonical, 
  ogType = 'website',
  ogImage = '/logo-large.png',
  keywords,
  schemas = []
}: SEOProps) {
  const siteTitle = 'Chakraborty Enterprise | Digital Service Center';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = 'Chakraborty Enterprise is on a mission of empowering not only Chhoto Jagulia but every citizen across West Bengal with Aadhaar, PAN, Banking, and Online Job application services with 100% security.';
  const metaDescription = description || defaultDescription;
  
  const siteUrl = 'https://chakraborty-enterprise.vercel.app';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  // Local Business Structured Data for SEO/GEO/AEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Chakraborty Enterprise",
    "alternateName": "Chakraborty Digital Service Center",
    "image": `${siteUrl}/logo-large.png`,
    "description": defaultDescription,
    "@id": siteUrl,
    "url": siteUrl,
    "telephone": CONTACT_INFO.normalizedPhone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Dakshin Paschim Para, Near Mitali Garden, Chhoto Jagulia",
      "addressLocality": "Duttapukur",
      "addressRegion": "West Bengal",
      "postalCode": "743294",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.7538, 
      "longitude": 88.4892
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.facebook.com/share/1aQkbCBMWo/",
      "https://x.com/atanutamasi1",
      "https://www.linkedin.com/in/atanu-chakraborty09"
    ],
    "priceRange": "₹",
    "areaServed": "North 24 Parganas, West Bengal"
  };

  const allSchemas = [localBusinessSchema, ...schemas];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="Chakraborty Enterprise" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      <meta name="twitter:creator" content="@atanutamasi1" />

      {/* AEO/GEO Structured Data */}
      {allSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
