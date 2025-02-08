// src/hooks/useAos.js
import { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";

const useAos = () => {

  useEffect(() => {
    
    AOS.init({
      duration: 1100, 
      easing: 'linear', 
      once: false,
    });

    // Scroll to top when the page loads (optional, remove if not needed)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Adding event listener for scroll to trigger AOS refresh

    const handleScroll = () => {
      AOS.refresh(); 
    };


    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); //it renders only single time
};

export default useAos;
