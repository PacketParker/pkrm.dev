const moon = document.getElementById('moon');
const sun = document.getElementById('sun');

/**
 * Check if the user has dark mode enabled
 */
if (localStorage.getItem('darkMode') === 'true') {
    turnDark();
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    turnDark();
} else {
    turnLight();
}

/**
 * Change local storage to opposite of current stored value
 */
function updateLocalStorage() {
    if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'true');
    } else {
        localStorage.setItem('darkMode', 'false');
    }
}

/**
 * Apply rainbow class, sleep, remove
 */
async function cycle_rainbow() {
    document.body.classList.toggle('rainbow-mode');
    await new Promise(resolve => setTimeout(resolve, 1000));
    document.body.classList.toggle('rainbow-mode');
}

/**
 * Toggle the theme to dark
 */
async function turnLight() {
    await cycle_rainbow();

    document.documentElement.classList.remove('dark');

    sun.style.display = 'none';
    moon.style.display = 'block';

    sun.style.opacity = '0';
    moon.style.opacity = '1';

    updateLocalStorage();
}

/**
 * Toggle the theme to light
 */
function turnDark() {
    document.documentElement.classList.add('dark');

    moon.style.display = 'none';
    sun.style.display = 'block';

    moon.style.opacity = '0';
    sun.style.opacity = '1';

    updateLocalStorage();
}

// Check for icon clicks
moon.addEventListener('click', () => {
    turnDark();
});

sun.addEventListener('click', async () => {
    await turnLight();
});