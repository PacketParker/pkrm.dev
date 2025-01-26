const moon = document.getElementById('moon');
const sun = document.getElementById('sun');

if (!document.cookie.includes('preference')) {
    setPreference(false);
} else {
    const preference = document.cookie.split(';').find(cookie => cookie.includes('preference')).split('=')[1];
    if (preference === 'true') {
        turnLight();
    } else {
        turnDark();
    }

}

function setPreference(value) {
    if (typeof value === 'boolean') {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1); // 1 year
        document.cookie = `preference=${value};expires=${expires.toUTCString()};path=/`;
        turnLight();
    }
}

function turnLight() {
    document.documentElement.classList.add('light');

    moon.style.opacity = '0';
    sun.style.opacity = '1';

    setTimeout(() => {
        moon.style.display = 'none';
        sun.style.display = 'block';
    }
    , 100);
}

function turnDark() {
    document.documentElement.classList.remove('light');

    sun.style.opacity = '0';
    moon.style.opacity = '1';

    setTimeout(() => {
        sun.style.display = 'none';
        moon.style.display = 'block';
    }
    , 100);
}

moon.addEventListener('click', () => {
    document.documentElement.classList.add('light');
    setPreference(true);
    turnLight();
});

sun.addEventListener('click', () => {
    document.documentElement.classList.remove('light');
    setPreference(false);
    turnDark();
});
