window.addEventListener("scroll", function () {
  const navbar = document.getElementById("mainNavbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

  const headerNavBar = document.getElementById('headerNavBar');
  const navbarCollapse = document.getElementById('navbarScroll');

  navbarCollapse.addEventListener('show.bs.collapse', () => {
    headerNavBar.classList.add('navbar-background');
    navbarCollapse.classList.add('navbar-background-secondary');
  });

  navbarCollapse.addEventListener('hide.bs.collapse', () => {
    headerNavBar.classList.remove('navbar-background');
    navbarCollapse.classList.remove('navbar-background-secondary');
  });

  const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    // Adjust for fixed navbar height if needed
    const offset = 70; // Example: 70px navbar
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = targetElement.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});