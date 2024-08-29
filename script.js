document.addEventListener('DOMContentLoaded', function () {
    const sideNav = document.querySelector(".side-nav");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".side-nav ul li a");
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let timeout;

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;

            if (window.scrollY >= sectionTop - 50 && window.scrollY < sectionBottom) {
                current = section.getAttribute("id");
            }
        });

        // Ensure the last section is active when scrolled to the bottom of the page
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            current = sections[sections.length - 1].getAttribute("id");
        }

        // Update nav links to reflect the active section
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });

        // Show or hide the side navigation bar based on header position
        const header = document.querySelector("header");
        const headerBottom = header.offsetTop + header.offsetHeight;

        if (window.scrollY > headerBottom) {
            sideNav.classList.add("show-side-nav");
        } else {
            sideNav.classList.remove("show-side-nav");
        }
    });

    // Intersection Observer for various sections
    const observeSection = (sectionClass, thresholdValue) => {
        const section = document.querySelector(sectionClass);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    section.classList.add('in-view');
                } else {
                    section.classList.remove('in-view');
                }
            });
        }, {
            threshold: thresholdValue
        });

        observer.observe(section);
    };

    observeSection('.skills', 0.1);
    observeSection('.projects', 0.5);
    observeSection('.experience', 0.25);
    observeSection('.contact', 0.3);

    // Intersection Observer for Hero Section with reflow trigger
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

    // Form submission handling with popup
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from redirecting

        const form = event.target;

        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                showPopup();
                form.reset(); // Clear the form fields
            } else {
                alert('Oops! There was a problem submitting your form');
            }
        }).catch(error => {
            alert('Oops! There was a problem submitting your form');
        });
    });

    function showPopup() {
        const popup = document.getElementById('popup');
        popup.classList.add('show');

        setTimeout(() => {
            popup.classList.remove('show');
        }, 3000); // Hide the popup after 3 seconds
    }

    // Mobile touch interaction to show/hide side navigation
    // Function to show the side navigation
    function showSideNav() {
        sideNav.classList.add('show-side-nav');
        clearTimeout(timeout); // Clear any existing timeout
        timeout = setTimeout(hideSideNav, 3000); // Hide after 3 seconds of no interaction
    }

    // Function to hide the side navigation
    function hideSideNav() {
        sideNav.classList.remove('show-side-nav');
    }

    // Event listener for touch start
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    // Event listener for touch move
    document.addEventListener('touchmove', function(e) {
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;

        // Check if the touch movement is significant
        if (Math.abs(touchEndX - touchStartX) > 10 || Math.abs(touchEndY - touchStartY) > 10) {
            showSideNav();
        }
    });

    // Event listener for touch end
    document.addEventListener('touchend', function() {
        // Restart the hide timeout after interaction ends
        clearTimeout(timeout);
        timeout = setTimeout(hideSideNav, 2000);
    });


    // Theme toggle functionality
    document.getElementById('theme-toggle').addEventListener('change', function () {
        document.body.classList.toggle('dark-mode');
    });

    // const toggleDarkMode = document.querySelector('#dark-mode-toggle');

    // toggleDarkMode.addEventListener('click', () => {
    //     document.body.classList.toggle('dark-mode');
    //     document.querySelector('.hero').classList.toggle('dark-mode');
    // });
});
