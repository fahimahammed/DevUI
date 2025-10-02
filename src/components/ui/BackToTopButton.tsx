'use client'; 

import React, { useState, useEffect } from 'react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) { 
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
<<<<<<< HEAD
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
=======
>>>>>>> 1eb2db2b134a1075b42fdbe2c683bad646b00869
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
<<<<<<< HEAD
>>>>>>> 1eb2db2 (Merged, fixed, and tested)
=======
>>>>>>> 1eb2db2b134a1075b42fdbe2c683bad646b00869
  );
};

export default BackToTopButton;