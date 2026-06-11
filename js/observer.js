

document.addEventListener(
  "DOMContentLoaded",
  initializeObserver
);

/**
 * تشغيل مراقب العناصر
 */
function initializeObserver() {

  const elements = document.querySelectorAll(
    ".glass-card, .appointment-item, section"
  );

  if (!elements.length) return;

  const observer = new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "active"
          );

          entry.target.style.opacity =
            "1";

          entry.target.style.transform =
            "translateY(0)";

          observer.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    }

  );

  elements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
      "translateY(40px)";

    element.style.transition =
      "all 0.8s ease";

    observer.observe(element);

  });

}

/* ===================================
   Navbar Shadow On Scroll
=================================== */

window.addEventListener(
  "scroll",
  () => {

    const navbar =
      document.querySelector("header");

    if (!navbar) return;

    if (window.scrollY > 50) {

      navbar.style.backdropFilter =
        "blur(10px)";

      navbar.style.boxShadow =
        "0 5px 20px rgba(0,0,0,.15)";

    } else {

      navbar.style.boxShadow =
        "none";

    }

  }
);

/* ===================================
   Smooth Reveal Utility
=================================== */

function revealElements() {

  const reveals =
    document.querySelectorAll(
      ".reveal"
    );

  reveals.forEach((element) => {

    const windowHeight =
      window.innerHeight;

    const revealTop =
      element.getBoundingClientRect().top;

    const revealPoint = 120;

    if (
      revealTop <
      windowHeight - revealPoint
    ) {

      element.classList.add(
        "active"
      );

    }

  });

}

window.addEventListener(
  "scroll",
  revealElements
);

revealElements();

/* ===================================
   Console Message
=================================== */

console.log(
  "Observer.js Loaded Successfully"
);
