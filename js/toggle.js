const moon = document.getElementById('moon');
const sun = document.getElementById('sun');

/**
 * Check if the user has dark mode enabled
 */
if (localStorage.getItem('darkMode') === 'true') {
    turnDark();
} else {
    turnLight();
}

/**
 * Update local storage with the current theme
 */
function updateLocalStorage() {
    if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'true');
    } else {
        localStorage.setItem('darkMode', 'false');
    }
}

/**
 * Toggle the theme to dark
 */
function turnLight() {
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

sun.addEventListener('click', () => {
    turnLight();
});
