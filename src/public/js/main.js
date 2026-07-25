AOS.init({
  duration: 700,
  once: true,
});

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    navbar.classList.add(
      "bg-zinc-950/80",
      "backdrop-blur-lg",
      "border-b",
      "border-zinc-800",
    );
  } else {
    navbar.classList.remove(
      "bg-zinc-950/80",
      "backdrop-blur-lg",
      "border-b",
      "border-zinc-800",
    );
  }
});
