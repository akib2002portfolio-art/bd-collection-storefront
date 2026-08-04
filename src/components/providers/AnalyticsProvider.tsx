import { useEffect } from "react";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const GTM_ID = import.meta.env.VITE_GTM_ID;

export function AnalyticsProvider() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID && !GTM_ID) return;

    const existingGtag = document.querySelector("script[src*='googletagmanager.com']");
    if (!existingGtag && GA_MEASUREMENT_ID) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      const inline = document.createElement("script");
      inline.text = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });`;
      document.head.appendChild(inline);
    }

    if (!document.querySelector(`script[src*='https://www.googletagmanager.com/gtm.js?id=']`) && GTM_ID) {
      const inline = document.createElement("script");
      inline.text = `window.dataLayer = window.dataLayer || []; window.dataLayer.push({'gtm.start': new Date().getTime(), event:'gtm.js'});`;
      document.head.appendChild(inline);
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(script);
    }
  }, []);

  return null;
}
