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
// terminal
const from = document.getElementById("terminal-form");
const input = document.getElementById("terminal-input");
const output = document.getElementById("terminal-output");

// get projects automatic form work.html

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("terminal-form");
    const input = document.getElementById("terminal-input");
    const output = document.getElementById("terminal-output");

    if (!form || !input || !output) return;

    const PROJECTS_PAGE = "works.html";

    function print(message, color = "#e2e8f0") {
        const line = document.createElement("p");
        line.textContent = message;
        line.style.color = color;

        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    // Read all projects from works.html
    async function getProjects() {
        const response = await fetch(PROJECTS_PAGE, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }

        const html = await response.text();

        const documentParser = new DOMParser();
        const page = documentParser.parseFromString(
            html,
            "text/html"
        );

        const cards = page.querySelectorAll(".project-card");

        return Array.from(cards).map((card, index) => {
            const name = card.querySelector(".project-info h3")
                ?.textContent.trim() || "Unknown Project";

            const description = card.querySelector(".project-info p")
                ?.textContent.trim() || "No description";

            const version = card.querySelector(".version-info p")
                ?.textContent.trim() || "No version";

            const link = card.querySelector("a.project-link");

            return {
                id: index + 1,
                name,
                description,
                version,
                url: link
                    ? new URL(
                        link.getAttribute("href"),
                        response.url
                    ).href
                    : null
            };
        });
    }

    async function showProjects() {
        const projects = await getProjects();

        if (projects.length === 0) {
            print("No projects found in works.html", "#ff7777");
            return;
        }

        print(
            `Found ${projects.length} projects:`,
            "#85dba2"
        );

        projects.forEach(project => {
            print(
                `[${project.id}] ${project.name}`,
                "#85dba2"
            );
            print(`    ${project.version}`);
        });

        print("Use 'project 1' to view details.");
    }

    async function showProject(id) {
        const projects = await getProjects();

        const project = projects.find(
            project => project.id === id
        );

        if (!project) {
            print(
                `No project found with ID ${id}`,
                "#ff7777"
            );
            return;
        }

        print(`Name: ${project.name}`, "#85dba2");
        print(`Version: ${project.version}`);
        print(`Description: ${project.description}`);

        if (project.url) {
            print(`GitHub: ${project.url}`);
        }
    }

    async function executeCommand(command) {
        const [action, ...args] =
            command.toLowerCase().trim().split(/\s+/);

        try {
            switch (action) {
                case "help":
                    print("Available commands:", "#85dba2");
                    print("help       - Show commands");
                    print("projects   - List projects");
                    print("project ID - Show project details");
                    print("count      - Count projects");
                    print("about      - About developer");
                    print("github     - GitHub profile");
                    print("clear      - Clear terminal");
                    break;

                case "projects":
                    await showProjects();
                    break;

                case "project": {
                    const id = Number(args[0]);

                    if (!Number.isInteger(id) || id < 1) {
                        print("Usage: project 1", "#ff7777");
                        break;
                    }

                    await showProject(id);
                    break;
                }

                case "count": {
                    const projects = await getProjects();
                    print(`Total projects: ${projects.length}`);
                    break;
                }

                case "about":
                    print("Abbas Ali - Java & Minecraft Developer");
                    break;

                case "github":
                    print("https://github.com/abbflaabb");
                    break;

                case "clear":
                    output.replaceChildren();
                    break;

                default:
                    print(
                        `Command not found: ${command}`,
                        "#ff7777"
                    );
            }
        } catch (error) {
            console.error("Terminal error:", error);

            print(
                "Unable to load projects from works.html",
                "#ff7777"
            );
        }
    }

    form.addEventListener("submit", async event => {
        event.preventDefault();

        const command = input.value.trim();

        if (!command) return;

        input.value = "";

        print(`↪ ~ $ ${command}`, "#85dba2");

        await executeCommand(command);
    });
});
