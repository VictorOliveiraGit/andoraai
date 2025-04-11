
import { useEffect } from "react";

const AnimateOnScroll = () => {
  useEffect(() => {
    // Add CSS to head for animation classes
    const style = document.createElement('style');
    style.textContent = `
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
      }
      .animate-on-scroll.delay-100 {
        transition-delay: 0.1s;
      }
      .animate-on-scroll.delay-200 {
        transition-delay: 0.2s;
      }
      .animate-on-scroll.delay-300 {
        transition-delay: 0.3s;
      }
      .animate-on-scroll.slide-in-right {
        transform: translateX(30px);
      }
      .animate-on-scroll.slide-in-right.visible {
        transform: translateX(0);
      }
      .animate-on-scroll.slide-in-left {
        transform: translateX(-30px);
      }
      .animate-on-scroll.slide-in-left.visible {
        transform: translateX(0);
      }
      .animate-on-scroll.zoom-in {
        transform: scale(0.95);
      }
      .animate-on-scroll.zoom-in.visible {
        transform: scale(1);
      }
      .animate-on-scroll.fade-in {
        opacity: 0;
        transform: translateY(0);
      }
      .animate-on-scroll.fade-in.visible {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    };

    // Create the observer with a slightly lower threshold for earlier animations
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px" // Trigger a bit earlier
    });

    // Observe all elements with the animate class
    document.querySelectorAll(".animate-on-scroll").forEach((element, index) => {
      // Add delay classes to stagger the animations
      if (index % 4 === 1) element.classList.add("delay-100");
      if (index % 4 === 2) element.classList.add("delay-200");
      if (index % 4 === 3) element.classList.add("delay-300");
      
      observer.observe(element);
    });

    // Clean up
    return () => {
      observer.disconnect();
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default AnimateOnScroll;
