// Define the variables
const hamburger = document.querySelector('.fa-bars');
const x = document.querySelector('.fa-times');
const nav = document.querySelectorAll('nav')[0];
const navOptions = nav.querySelectorAll('a');
const main = document.getElementById('main');
const mainh1 = main.getElementsByTagName('h1')[0];
const mainh2 = main.getElementsByTagName('h2')[0];
const iconNav = document.querySelectorAll('nav')[1];
const icons = document.querySelectorAll('nav')[1].getElementsByTagName('i');
const arrow = document.getElementById('about-text')
const projectArrow = document.getElementById('projects-text');
const projects = document.getElementById('projects');
const footer = document.querySelector('footer');

// If the user is on mobile, remove the fingerprint from the footer, also remove
// the down arrow buttons
if (window.innerWidth <= 768) {
    footer.removeChild(footer.lastChild);
}

// If the user is on mobile
if (window.innerWidth < 768) {
    x.style.display = 'none';
    hamburger.style.display = 'block';
    nav.style.display = 'none';
    mobileAnimations();
} else {
    x.style.display = 'none';
    hamburger.style.display = 'none';
    nav.style.display = 'flex';
    desktopAnimations();
}

// Only create listener if the user is on mobile
if (window.innerWidth < 768) {
    // When the hamburger is clicked, show the X and open the menu
    hamburger.addEventListener('click', function () {
        hamburger.style.display = 'none';
        x.style.display = 'block';
        mainh1.style.display = 'none';
        mainh2.style.display = 'none';
        iconNav.style.display = 'none';
        arrow.style.display = 'none';

        // Slowly fade in the nav with keyframes
        nav.style.display = 'flex';
        nav.style.animation = 'fadeIn 0.75s ease-in-out';

        // Lock the scroll
        document.body.style.overflow = 'hidden';
    });
}

// Collapse the mobile nav menu
function collapseMenu() {
    hamburger.style.display = 'block';
    x.style.display = 'none';
    nav.style.display = 'none';

    // Slowly fade in the h1, h2, icons, and arrow with keyframes
    mainh1.style.display = 'block';
    mainh1.style.animation = 'fadeIn 0.75s ease-in-out';
    mainh2.style.display = 'block';
    mainh2.style.animation = 'fadeIn 0.75s ease-in-out';
    iconNav.style.display = 'flex';
    iconNav.style.animation = 'fadeIn 0.75s ease-in-out';
    arrow.style.display = 'block';
    arrow.style.animation = 'fadeIn 0.75s ease-in-out';

    // Unlock the scroll
    document.body.style.overflow = 'auto';
}

// Only create listener if the user is on mobile
if (window.innerWidth < 768) {
    // When the X is clicked, show the hamburger and close the menu
    x.addEventListener('click', function () {
        collapseMenu();
    });
}

// When a nav link is clicked, close the menu
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        // Only collapse the menu if the user is on mobile
        if (window.innerWidth < 768) {
            collapseMenu();
        }
    });
});

// Animation for the desktop version
function desktopAnimations() {
    let everythingSlideUp = new mojs.Html({
        el: main,
        y: {150: 0},
        duration: 1000,
        delay: 250,
        easing: 'sin.out'
    }).play();

    let everythingOpacity = new mojs.Html({
        el: main,
        opacity: {0: 1},
        duration: 2000,
        delay: 250,
        easing: 'sin.out'
    }).play();
}

// Animation for the mobile version
function mobileAnimations() {
    let h2ScaleUp = new mojs.Html({
        el: mainh2,
        y: {75: 75},
        opacity: {0: 1},
        scale: {0.5: 1},
        duration: 1500,
        easing: mojs.easing.path('M0,100 C50,100 50,67.578125 50,50 C50,32.421875 50,0 100,0')
    }).play();

    let h2SlideUp = new mojs.Html({
        el: mainh2,
        y: {75: 0},
        duration: 1500,
        delay: 1000,
        easing: mojs.easing.path('M0,100 C50,100 50,67.578125 50,50 C50,32.421875 50,0 100,0')
    }).play();

    let h1Opacity = new mojs.Html({
        el: mainh1,
        opacity: {0: 1},
        duration: 2000,
        delay: 1750,
        easing: 'sin.out'
    }).play();

    let iconBringIn1 = new mojs.Html({
        el: icons[0],
        y: {25: 0},
        opacity: {0: 1},
        duration: 1000,
        delay: 2000,
        easing: 'sin.out'
    }).play();

    let iconBringIn2 = new mojs.Html({
        el: icons[1],
        y: {25: 0},
        opacity: {0: 1},
        duration: 1000,
        delay: 2250,
        easing: 'sin.out'
    }).play();
}

// Rotate the projects every 4 seconds, only for desktop
window.onload = slideProjects();
function slideProjects() {
    const inputs = document.querySelectorAll('input');
    if (window.innerWidth >= 768) {
        let i = 0;
        setInterval(() => {
            if (i == -1) {
                return;
            }

            inputs[i].checked = true;
            i++;

            if (i >= inputs.length) {
                i = 0;
            }
        }, 4000);

        // If one of the inputs is clicked, stop the rotation of the projects
        inputs.forEach(input => {
            input.addEventListener('click', () => {
                i = -1;
            });
        });
    }
}

// For mobile - whenever the user slides left or right on the screen in the projects
// section, slide to the next or previous project
projects.addEventListener('touchend', function (e) {
    // Get the touch position
    touchEndX = e.changedTouches[0].pageX;

    if (touchStartX > touchEndX) {
        let checked = document.querySelector('input[name="slider"]:checked');
        let next = checked.nextElementSibling;

        if (next.nodeName === 'DIV') {
            document.querySelector('input[name="slider"]').checked = true;
        } else if (next) {
            next.checked = true;
        }
    }

    if (touchStartX < touchEndX) {
        let checked = document.querySelector('input[name="slider"]:checked');
        let prev = checked.previousElementSibling;

        if (prev) {
            prev.checked = true;
        } else {
            document.querySelector('input[name="slider"]:last-of-type').checked = true;
        }
    }
});