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
document.addEventListener("DOMContentLoaded", function () {

    const themeToggle = document.getElementById("theme-toggle");

    if (!themeToggle) return;

    let currentTheme = localStorage.getItem("theme");

    if (!currentTheme) {
        currentTheme = "light";
    }

    document.documentElement.setAttribute("data-theme", currentTheme);
    themeToggle.textContent = currentTheme === "light" ? "☀️" : "🌙";

    themeToggle.addEventListener("click", function () {
        let theme = document.documentElement.getAttribute("data-theme");

        let newTheme = theme === "light" ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);

        themeToggle.textContent = newTheme === "light" ? "☀️" : "🌙";
    });

});
document.querySelectorAll(".contact-form").forEach(form => {
    form.addEventListener("submit", async event => {
        event.preventDefault();

        const button = form.querySelector('button[type="submit"]');
        const status = form.querySelector(".form-status");

        button.disabled = true;
        button.textContent = "Sending...";
        status.textContent = "";

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Message could not be sent");
            }

            form.reset();
            status.textContent = "Thanks! Your message has been sent.";
        } catch {
            status.textContent =
                "Could not send your message. Please try again or email me directly.";
        } finally {
            button.disabled = false;
            button.textContent = "Send Message";
        }
    });
});
console.log(
    "%c Crafted with Love by Abbas Ali %c",
    "background: #4285F4; color: #fff; padding: 5px; border-radius: 5px;",
    "background: transparent;"
);