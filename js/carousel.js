const SIDE_COUNT = 1;
const CLONE_COUNT = SIDE_COUNT + 1;

function initializeProjectCarousel(images = []) {
  const track = document.getElementById("track");
  const wrapper = document.getElementById("carousel");
  const nextButton = document.querySelector(".next-btn");
  const prevButton = document.querySelector(".prev-btn");

  if (!track || !wrapper || !nextButton || !prevButton) {
    return;
  }

  const normalizedImages =
    Array.isArray(images) && images.length > 0
      ? images
      : ["QTrace-Cover-Photo.jpg"];

  const srcs = normalizedImages.map((image) => `images/${image}`);

  track.innerHTML = "";

  const extendedSrcs = [
    ...srcs.slice(-CLONE_COUNT),
    ...srcs,
    ...srcs.slice(0, CLONE_COUNT),
  ];

  extendedSrcs.forEach((src) => {
    const div = document.createElement("div");
    div.className = "carousel-item-custom side";
    div.innerHTML = `<img src="${src}" alt="Project gallery image">`;
    track.appendChild(div);
  });

  const allItems = () => track.querySelectorAll(".carousel-item-custom");
  let currentIndex = CLONE_COUNT;
  let isTransitioning = false;
  let autoSlide;

  function getItemWidth() {
    const firstItem = allItems()[0];
    return firstItem ? firstItem.offsetWidth : 0;
  }

  function setTranslate(instant = false) {
    const itemWidth = getItemWidth();
    if (!itemWidth) {
      return;
    }

    const offset = (currentIndex - SIDE_COUNT) * itemWidth;
    track.style.transition = instant ? "none" : "transform 0.6s ease";
    track.style.transform = `translateX(-${offset}px)`;
  }

  function updateClasses() {
    const items = allItems();
    items.forEach((item, index) => {
      item.classList.remove("center", "side");
      item.classList.add(index === currentIndex ? "center" : "side");
    });
  }

  function move(dir) {
    if (isTransitioning) {
      return;
    }

    isTransitioning = true;
    currentIndex += dir;
    setTranslate(false);
    updateClasses();

    const totalReal = srcs.length;

    window.setTimeout(() => {
      if (currentIndex >= CLONE_COUNT + totalReal) {
        currentIndex = CLONE_COUNT;
        setTranslate(true);
        updateClasses();
        track.getBoundingClientRect();
      } else if (currentIndex < CLONE_COUNT) {
        currentIndex = CLONE_COUNT + totalReal - 1;
        setTranslate(true);
        updateClasses();
        track.getBoundingClientRect();
      }
      isTransitioning = false;
    }, 620);
  }

  function next() {
    move(1);
  }

  function prev() {
    move(-1);
  }

  function startAuto() {
    autoSlide = window.setInterval(next, 3000);
  }

  function stopAuto() {
    window.clearInterval(autoSlide);
  }

  nextButton.onclick = next;
  prevButton.onclick = prev;

  track.onclick = (event) => {
    const item = event.target.closest(".carousel-item-custom");
    if (!item) {
      return;
    }

    const index = Array.from(allItems()).indexOf(item);
    if (index === currentIndex) {
      return;
    }

    move(index > currentIndex ? 1 : -1);
  };

  wrapper.onmouseenter = stopAuto;
  wrapper.onmouseleave = startAuto;

  stopAuto();
  setTranslate(true);
  updateClasses();
  startAuto();

  window.onresize = () => {
    setTranslate(true);
  };
}

window.initializeProjectCarousel = initializeProjectCarousel;
