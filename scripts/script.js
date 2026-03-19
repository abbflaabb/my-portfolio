/**
 * Abbas Ali Portfolio - Core Script
 * Features: Smooth Navigation, Header Scroll Effects, and Form Handling
 */


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href !== "#") {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

const talkBtn = document.querySelector('.btn-talk');
if (talkBtn) {
    talkBtn.addEventListener('click', (e) => {
        if (talkBtn.getAttribute('href') === "#" || !talkBtn.getAttribute('href')) {
            e.preventDefault();
            window.location.href = "mailto:alsowounds@gmail.com?subject=Collaboration Inquiry";
        }
    });
}
// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'light' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '☀️';
    }
});
console.log(
    "%c Crafted with Love by Abbas Ali %c",
    "background: #4285F4; color: #fff; padding: 5px; border-radius: 5px;",
    "background: transparent;"
);