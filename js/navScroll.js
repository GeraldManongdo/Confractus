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