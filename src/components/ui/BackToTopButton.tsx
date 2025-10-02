"use client"
import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
<<<<<<< HEAD
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
      >
        ↑
      </button>
    )
=======
    <>
      {isVisible && ( 
        <button
          onClick={scrollToTop} 
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-opacity duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
          </svg>
        </button>
      )}
    </>
>>>>>>> 1eb2db2 (Merged, fixed, and tested)
  );
}