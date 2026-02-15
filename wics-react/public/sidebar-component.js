(function () {
  function createSidebar() {
    if (document.querySelector(".smx-sidebar-shell")) {
      return;
    }

    var button = document.createElement("button");
    button.type = "button";
    button.className = "smx-sidebar-toggle";
    button.setAttribute("aria-label", "Open navigation menu");
    button.setAttribute("aria-expanded", "false");
    button.textContent = "Menu";

    var overlay = document.createElement("div");
    overlay.className = "smx-sidebar-overlay";

    var sidebar = document.createElement("aside");
    sidebar.className = "smx-sidebar-shell";
    sidebar.innerHTML =
      '<h2>SkillsMaxxing</h2>' +
      '<ul class="smx-sidebar-links">' +
      '<li><a href="index.html">Home</a></li>' +
      '<li><a href="courses.html">Courses</a></li>' +
      '<li><a href="quiz.html">Take the quiz!</a></li>' +
      '<li><a href="roadmap.html">Roadmap</a></li>' +
      '<li><a href="aboutUs.html">About Us</a></li>' +
      "</ul>";

    function setOpen(isOpen) {
      document.body.classList.toggle("smx-sidebar-open", isOpen);
      button.setAttribute("aria-expanded", isOpen ? "true" : "false");
      button.textContent = isOpen ? "Close" : "Menu";
    }

    function toggleSidebar() {
      var isOpen = document.body.classList.contains("smx-sidebar-open");
      setOpen(!isOpen);
    }

    button.addEventListener("click", toggleSidebar);
    overlay.addEventListener("click", function () {
      setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });

    document.body.appendChild(button);
    document.body.appendChild(overlay);
    document.body.appendChild(sidebar);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createSidebar);
  } else {
    createSidebar();
  }
})();
