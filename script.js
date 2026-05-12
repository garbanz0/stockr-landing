// Keep footer year current.
document.getElementById("year").textContent = String(new Date().getFullYear());

// Sticky nav subtle shadow when scrolled.
const nav = document.querySelector(".nav");
const onScroll = () => {
  if (!nav) return;
  if (window.scrollY > 8) nav.classList.add("nav-scrolled");
  else nav.classList.remove("nav-scrolled");
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Make any FAQ <details> close its siblings when one opens (single-open accordion).
document.querySelectorAll(".faq details").forEach((d) => {
  d.addEventListener("toggle", () => {
    if (d.open) {
      document.querySelectorAll(".faq details").forEach((other) => {
        if (other !== d) other.open = false;
      });
    }
  });
});
