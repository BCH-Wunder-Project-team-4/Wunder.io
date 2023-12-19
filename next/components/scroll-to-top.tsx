'use client';
import React, { useState, useEffect } from 'react';
import Chevron from "@/styles/icons/chevron-down.svg";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    setIsVisible(scrollTop > 160);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
    className={`z-index-5 fixed bottom-14 right-3 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out bg-primary-600 border-[1px] border-finnishwinter rounded-[8px] p-1.5 cursor-pointer`}
    onClick={scrollToTop}>
      {isVisible && (
        <Chevron className="h-8 w-8 text-mischka rotate-180" />
      )}
    </div>
  );
};

export default ScrollToTop;