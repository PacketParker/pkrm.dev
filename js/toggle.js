const moon = document.getElementById('moon');
const sun = document.getElementById('sun');

moon.addEventListener('click', () => {
    document.documentElement.classList.add('light');

    // Fade out moon and fade in sun
    moon.style.opacity = '0';
    sun.style.opacity = '1';

    // After the transition ends, hide the moon and show the sun (for accessibility)
    setTimeout(() => {
        moon.style.display = 'none';
        sun.style.display = 'block';
    }, 100); // Match the duration of the transition (100ms)
});

sun.addEventListener('click', () => {
    document.documentElement.classList.remove('light');

    // Fade out sun and fade in moon
    sun.style.opacity = '0';
    moon.style.opacity = '1';

    // After the transition ends, hide the sun and show the moon (for accessibility)
    setTimeout(() => {
        sun.style.display = 'none';
        moon.style.display = 'block';
    }, 100); // Match the duration of the transition (100ms)
});
