document.addEventListener('DOMContentLoaded', function () {
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

    // Intersection Observer for Skills Section
    const skillsSection = document.querySelector('.skills');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillsSection.classList.add('in-view');
            } else {
                skillsSection.classList.remove('in-view');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 50% of the section is in view
    });

    observer.observe(skillsSection);

    // Intersection Observer for Hero Section
    const heroSection = document.querySelector('.hero');
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reset the animation by removing and adding the class
                heroSection.classList.remove('in-view');
                void heroSection.offsetWidth; // Trigger reflow
                heroSection.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });

    heroObserver.observe(heroSection);
});
