let progress = 0;
let progressBar = document.getElementById("progressBar");
const loadingContainer = document.getElementById("loading-container");


let interval = setInterval(() => {
    progress++;
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
        clearInterval(interval);
        document.body.style.transition = "opacity 1s ease";
        loadingContainer.style.transition = "opacity 1s ease";
        loadingContainer.style.opacity = "0";

        setTimeout(() => {
            window.location.href = "home.html";
        }, 800);
    }
}, 20);