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

console.log(
    "%c Crafted with Love by Abbas Ali %c",
    "background: #4285F4; color: #fff; padding: 5px; border-radius: 5px;",
    "background: transparent;"
);