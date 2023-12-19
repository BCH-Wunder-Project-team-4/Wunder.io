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
    className={`z-50 fixed ${'bottom-16 right-5 md:bottom-8 md:right-12'} ${isVisible ? 'opacity-100' : 'opacity-0'}  duration-300 transition-all ease-in-out bg-primary-600 hover:bg-primary-500 active:bg-primary-400 border-[1px] border-finnishwinter rounded-[8px] p-1.5 cursor-pointer`}
    onClick={scrollToTop}>
      {isVisible && (
        <Chevron className="h-8 w-8 text-mischka rotate-180" />
      )}
    </div>
  );
};

export default ScrollToTop;