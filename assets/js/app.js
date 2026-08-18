// Intersection Observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
  });

  // Mobile Nav Toggle (Optional for future)
  // const navToggle = document.querySelector('.nav-toggle');
  // const nav = document.querySelector('nav');
  // if (navToggle && nav) {
  //   navToggle.addEventListener('click', () => {
  //     nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  //   });
  // }
});
