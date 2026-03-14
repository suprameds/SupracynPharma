import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Google Analytics 4 via gtag.js.
 *
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX in .env.local.
 * Get your Measurement ID from: https://analytics.google.com
 * (Admin → Data Streams → select stream → Measurement ID)
 *
 * This component is automatically a no-op when the env var is absent
 * (development default), so it's safe to ship immediately.
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            send_page_view: true,
          });
        `}
      </Script>
    </>
  );
}
