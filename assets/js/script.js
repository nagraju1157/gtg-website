// sticky header

window.addEventListener("scroll", function () {
  const navbar = document.querySelector("header");
  if (window.scrollY > 50) {
    navbar.classList.add("is-sticky");
  } else {
    navbar.classList.remove("is-sticky");
  }
});

// animated GTG counters
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(
    ".GTG-perfumes-counter .counter-number"
  );
  const speed = 300; // lower = faster

  const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  };

  const runCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const span = counter.querySelector("span");

    // Initialize number to 0, keep % span intact
    counter.childNodes[0].nodeValue = "0";

    const updateCount = () => {
      let current = parseInt(counter.childNodes[0].nodeValue);
      const increment = Math.ceil(target / speed);

      if (current < target) {
        let newCount =
          current + increment > target ? target : current + increment;
        counter.childNodes[0].nodeValue = newCount;
        setTimeout(updateCount, 20);
      } else {
        counter.childNodes[0].nodeValue = target;
      }
    };

    updateCount();
  };

  const countersAnimated = new Set();

  const checkCounters = () => {
    counters.forEach((counter) => {
      if (isInViewport(counter) && !countersAnimated.has(counter)) {
        runCounter(counter);
        countersAnimated.add(counter);
      }
    });
  };

  window.addEventListener("scroll", checkCounters);

  // Run on page load in case counters already visible
  checkCounters();
});

// check box toggle

document.querySelectorAll(".fragrance-card").forEach((card) => {
  card.addEventListener("click", () => {
    // remove active from all
    document
      .querySelectorAll(".fragrance-card")
      .forEach((c) => c.classList.remove("active"));

    // add active to clicked
    card.classList.add("active");

    // check radio inside clicked card
    card.querySelector('input[type="radio"]').checked = true;
  });
});

// product slider

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector("#productCarousel");
  const thumbs = document.querySelectorAll(".thumb");

  const bsCarousel = new bootstrap.Carousel(carousel, {
    ride: false,
  });

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", function () {
      bsCarousel.to(index);
      setActiveThumb(index);
    });
  });

  carousel.addEventListener("slid.bs.carousel", function (e) {
    setActiveThumb(e.to);
  });

  function setActiveThumb(index) {
    thumbs.forEach((t) => t.classList.remove("active"));
    if (thumbs[index]) {
      thumbs[index].classList.add("active");
    }
  }
});

// css animations
document.addEventListener("DOMContentLoaded", function () {

    const elements = document.querySelectorAll(
        ".fade-top, .fade-left, .fade-right"
    );

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // run only once
            }
        });
    }, {
        threshold: 0.2
    });

    elements.forEach(el => observer.observe(el));

});