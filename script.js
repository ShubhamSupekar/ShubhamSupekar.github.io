document.addEventListener("DOMContentLoaded", function () {
    const sideNav = document.querySelector(".side-nav");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".side-nav ul li a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 50) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });

        const header = document.querySelector("header");
        const headerBottom = header.offsetTop + header.offsetHeight;

        if (window.scrollY > headerBottom) {
            sideNav.classList.add("show-side-nav");
        } else {
            sideNav.classList.remove("show-side-nav");
        }
    });
});