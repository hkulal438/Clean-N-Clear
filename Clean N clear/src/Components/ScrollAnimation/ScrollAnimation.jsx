import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./ScrollAnimation.css";

const ScrollAnimation = () => {
  useEffect(() => {
    const applyAnimations = () => {
      /* =========================================
         SECTIONS
         ========================================= */

      document
        .querySelectorAll("main section")
        .forEach((section) => {
          if (
            !section.hasAttribute("data-aos") &&
            !section.classList.contains("no-scroll-animation")
          ) {
            section.setAttribute("data-aos", "fade-up");
            section.setAttribute("data-aos-duration", "800");
            section.setAttribute("data-aos-offset", "80");
          }
        });


      /* =========================================
         HEADINGS
         ========================================= */

      document
        .querySelectorAll(
          "main section h1, main section h2"
        )
        .forEach((heading) => {
          if (
            !heading.hasAttribute("data-aos") &&
            !heading.classList.contains("no-scroll-animation")
          ) {
            heading.setAttribute("data-aos", "fade-up");
            heading.setAttribute("data-aos-duration", "700");
            heading.setAttribute("data-aos-offset", "70");
          }
        });


      /* =========================================
         CARDS
         ========================================= */

      document
        .querySelectorAll(
          "main section article, " +
          "main section .card, " +
          "main section [class*='card']"
        )
        .forEach((card, index) => {
          if (
            !card.hasAttribute("data-aos") &&
            !card.classList.contains("no-scroll-animation")
          ) {
            card.setAttribute("data-aos", "fade-up");
            card.setAttribute("data-aos-duration", "750");
            card.setAttribute("data-aos-offset", "70");

            /*
              Small stagger effect.
              Cards appear one after another.
            */

            const delay = (index % 5) * 80;

            card.setAttribute(
              "data-aos-delay",
              delay.toString()
            );
          }
        });


      /* =========================================
         IMAGES
         ========================================= */

      document
        .querySelectorAll(
          "main section img"
        )
        .forEach((image, index) => {
          if (
            !image.hasAttribute("data-aos") &&
            !image.classList.contains("no-scroll-animation")
          ) {
            image.setAttribute("data-aos", "fade-right");
            image.setAttribute("data-aos-duration", "800");
            image.setAttribute("data-aos-offset", "80");

            const delay = (index % 3) * 70;

            image.setAttribute(
              "data-aos-delay",
              delay.toString()
            );
          }
        });


      /* =========================================
         BUTTONS / LINKS
         ========================================= */

      document
        .querySelectorAll(
          "main section a, " +
          "main section button"
        )
        .forEach((button) => {
          if (
            !button.hasAttribute("data-aos") &&
            !button.classList.contains("no-scroll-animation")
          ) {
            button.setAttribute("data-aos", "fade-up");
            button.setAttribute("data-aos-duration", "650");
            button.setAttribute("data-aos-offset", "60");
          }
        });


      /* =========================================
         PARAGRAPHS
         ========================================= */

      document
        .querySelectorAll(
          "main section p"
        )
        .forEach((paragraph) => {
          if (
            !paragraph.hasAttribute("data-aos") &&
            !paragraph.classList.contains("no-scroll-animation")
          ) {
            paragraph.setAttribute("data-aos", "fade-up");
            paragraph.setAttribute("data-aos-duration", "700");
            paragraph.setAttribute("data-aos-offset", "60");
          }
        });


      /* =========================================
         REFRESH AOS
         ========================================= */

      AOS.refreshHard();
    };


    /* =========================================
       INITIALIZE
       ========================================= */

    AOS.init({
      duration: 800,

      easing: "ease-out-cubic",

      /*
        false = animation happens again
        when user scrolls back.
      */

      once: false,

      /*
        Animation also works when
        scrolling upward.
      */

      mirror: true,

      offset: 80,

      delay: 0,

      anchorPlacement: "top-bottom",

      disable: false,
    });


    /*
      Give React time to render
      the current page before scanning it.
    */

    const initialTimer = setTimeout(() => {
      applyAnimations();
      AOS.refreshHard();
    }, 300);


    /* =========================================
       WATCH ROUTE CHANGES / NEW CONTENT
       ========================================= */

    const observer = new MutationObserver(() => {
      applyAnimations();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });


    /* =========================================
       RESIZE
       ========================================= */

    const handleResize = () => {
      AOS.refresh();
    };

    window.addEventListener(
      "resize",
      handleResize
    );


    /* =========================================
       CLEANUP
       ========================================= */

    return () => {
      clearTimeout(initialTimer);

      observer.disconnect();

      window.removeEventListener(
        "resize",
        handleResize
      );

      AOS.refreshHard();
    };
  }, []);


  return null;
};

export default ScrollAnimation;