import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");

    if (!consent) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 3000); // Show after 3 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    Cookies.set("cookieConsent", "accepted", { expires: 365 });
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    Cookies.set("cookieConsent", "rejected", { expires: 365 });
    setShowBanner(false);
  };

  const handleCustomize = () => {
    alert("Open settings modal (not implemented)");
  };

  return (
    showBanner && (
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-white shadow-lg rounded-lg p-5 border">
        <h2 className="text-lg font-semibold">We use cookies</h2>
        <p className="text-sm text-gray-600 mt-2">
          We use cookies to enhance your browsing experience, serve content, and
          analyze our traffic. By clicking <strong>"Accept All"</strong>, you
          consent to our use of cookies. For more details, please read our{" "}
          <a href="/privacy-policy" className="text-blue-600 underline">
            Cookie notice
          </a>
          .
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleCustomize}
            className="border px-4 py-2 text-blue-600 rounded-md"
          >
            Customize
          </button>
          <button
            onClick={handleRejectAll}
            className="border px-4 py-2 text-blue-600 rounded-md"
          >
            Reject All
          </button>
          <button
            onClick={handleAcceptAll}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Accept All
          </button>
        </div>
      </div>
    )
  );
};
