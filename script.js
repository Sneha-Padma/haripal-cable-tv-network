
/* =========================================================
   HCN MASTER NAVIGATION CONTROLLER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menu = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    /* MOBILE MENU */

    if (menu && nav) {

        menu.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("active");

            menu.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

        // Close menu after clicking a navigation link

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

                menu.setAttribute("aria-expanded", "false");

            });

        });

        // Close menu with Escape key

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                nav.classList.remove("active");

                menu.setAttribute("aria-expanded", "false");

            }

        });

    }


    /* AUTOMATIC ACTIVE NAVIGATION */

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    if (nav) {

        nav.querySelectorAll("a").forEach(link => {

            const href = link.getAttribute("href");

            link.classList.remove("active");

            if (href && href.toLowerCase() === currentPage) {

                link.classList.add("active");

                link.setAttribute("aria-current", "page");

            } else {

                link.removeAttribute("aria-current");

            }

        });

        // Homepage Feeds selection

        if (currentPage === "" || currentPage === "index.html") {

            const feeds = nav.querySelector(
                '[data-i18n="nav.feeds"]'
            );

            if (feeds) {
                feeds.classList.add("active");
                feeds.setAttribute("aria-current", "page");
            }

        }

    }

});
