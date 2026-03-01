const projectsDetails = Array.isArray(window.projectsDetails)
  ? window.projectsDetails
  : [];

function getProjectIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("projectID");
  const parsedId = Number.parseInt(idParam, 10);

  if (!Number.isInteger(parsedId)) {
    return null;
  }

  return parsedId;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderProjectDescription() {
  const projectId = getProjectIdFromUrl();
  const project = projectsDetails.find((item) => item.id === projectId);

  if (!project) {
    renderProjectNotFound();
    return;
  }

  setText("project-type", project.type || "Featured Work");
  setText("project-title", project.title || "Untitled Project");
  setText(
    "project-description",
    project.description || "No description available.",
  );

  setText("project-duration", project.duration || "N/A");
  setText("project-client", project.client || "N/A");
  setText("project-role", project.role || "N/A");
  setText("project-year", project.year || "N/A");

  const challengeText =
    project.challenges ||
    project.challages ||
    "No challenge details available.";
  setText("project-challenge", challengeText);
  setText(
    "project-solution",
    project.solutions || "No solution details available.",
  );

  const projectLink = document.getElementById("project-link");
  if (projectLink) {
    projectLink.href = project.link || "#";
  }

  const coverImage = project.coverImage || project.image;
  const coverElement = document.getElementById("project-cover");
  if (coverElement && coverImage) {
    coverElement.src = `images/${coverImage}`;
    coverElement.alt = `${project.title || "Project"} cover`;
  }

  renderTechnologies(project.technologies || []);

  const gallery =
    Array.isArray(project.gallery) && project.gallery.length > 0
      ? project.gallery
      : [project.image].filter(Boolean);

  if (typeof window.initializeProjectCarousel === "function") {
    window.initializeProjectCarousel(gallery);
  }

  if (
    typeof window.AOS !== "undefined" &&
    typeof window.AOS.refreshHard === "function"
  ) {
    window.AOS.refreshHard();
  }

  document.title = `${project.title || "Project"} | Confractus`;
}

function setText(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = value;
  }
}

function renderTechnologies(technologies) {
  const technologiesRoot = document.getElementById("project-technologies");
  if (!technologiesRoot) {
    return;
  }

  technologiesRoot.innerHTML = technologies
    .map((technology) => {
      const safeTechnology = escapeHtml(technology);
      return `
        <span class="badge rounded-pill mb-2 border border-info p-2 border-opacity-50 px-3 py-2 d-flex align-items-center gap-2 hover-enlarge">
          <span class="fw-normal text-info fs-6">${safeTechnology}</span>
        </span>
      `;
    })
    .join("");
}

function renderProjectNotFound() {
  setText("project-type", "Featured Work");
  setText("project-title", "Project not found");
  setText(
    "project-description",
    "The selected project does not exist or the project ID is invalid.",
  );
  setText("project-duration", "N/A");
  setText("project-client", "N/A");
  setText("project-role", "N/A");
  setText("project-year", "N/A");
  setText("project-challenge", "No challenge details available.");
  setText("project-solution", "No solution details available.");

  const projectLink = document.getElementById("project-link");
  if (projectLink) {
    projectLink.href = "home.html#projects";
    projectLink.textContent = "Back to Projects";
    projectLink.removeAttribute("target");
    projectLink.removeAttribute("rel");
  }

  const coverElement = document.getElementById("project-cover");
  if (coverElement) {
    coverElement.src = "images/QTrace-Cover-Photo.jpg";
    coverElement.alt = "Project not found";
  }

  renderTechnologies([]);

  if (typeof window.initializeProjectCarousel === "function") {
    window.initializeProjectCarousel(["QTrace-Cover-Photo.jpg"]);
  }
}

function loadProjectDescription(projectID) {
  window.location.href = `projectDescription.html?projectID=${projectID}`;
}

window.loadProjectDescription = loadProjectDescription;
window.loadProjectDescriptions = loadProjectDescription;

document.addEventListener("DOMContentLoaded", renderProjectDescription);
