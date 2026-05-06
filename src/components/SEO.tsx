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
}

export default function SEO({ 
  title, 
  description, 
  canonical, 
  ogType = 'website',
  ogImage = '/og-image.png',
  keywords
}: SEOProps) {
  const siteTitle = 'Chakraborty Enterprise | Digital Service Center';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = 'Chakraborty Enterprise is on a mission of empowering not only Chhoto Jagulia but every citizen across West Bengal with Aadhaar, PAN, Banking, and Online Job application services with 100% security.';
  const metaDescription = description || defaultDescription;
  
  const siteUrl = window.location.origin;
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  // Local Business Structured Data for SEO/GEO/AEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Chakraborty Enterprise",
    "alternateName": "Chakraborty Digital Service Center",
    "image": `${siteUrl}/logo-large.png`,
    "description": defaultDescription,
    "@id": siteUrl,
    "url": siteUrl,
    "telephone": CONTACT_INFO.verifiedPhone,
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
      "https://www.facebook.com/chakrabortyenterprise"
    ],
    "priceRange": "₹",
    "areaServed": "North 24 Parganas, West Bengal"
  };

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

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* AEO/GEO Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
