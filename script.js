document.addEventListener('DOMContentLoaded', function () {
    const sideNav = document.querySelector(".side-nav");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".side-nav ul li a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;

            if (pageYOffset >= sectionTop - 50 && pageYOffset < sectionBottom) {
                current = section.getAttribute("id");
            }

            // If we're at the bottom of the page, ensure the last section is active
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                current = sections[sections.length - 1].getAttribute("id");
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
        threshold: 0.1 // Trigger when 10% of the section is in view
    });

    observer.observe(skillsSection);

    const projectsSection = document.querySelector('.projects');
    
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectsSection.classList.add('in-view');
            } else {
                projectsSection.classList.remove('in-view');
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is in view
    });

    projectsObserver.observe(projectsSection);

    // Intersection Observer for Experience Section
    const experienceSection = document.querySelector('.experience');
    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                experienceSection.classList.add('in-view');
            } else {
                experienceSection.classList.remove('in-view');
            }
        });
    }, {
        threshold: 0.4 // Trigger when 40% of the section is in view
    });

    experienceObserver.observe(experienceSection);

    // Intersection Observer for Hero Section
    const heroSection = document.querySelector('.hero');
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroSection.classList.remove('in-view');
                void heroSection.offsetWidth; // Trigger reflow
                heroSection.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });

    heroObserver.observe(heroSection);
});
