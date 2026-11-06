(function () {

    "use strict";

    /* ================================
       LANGUAGE SYSTEM
    ================================= */

    function setLanguage(language) {

        /*
         * If the selected language does not exist,
         * fall back to English.
         */
        if (!translations[language]) {
            language = "en";
        }

        /* Save selected language */
        localStorage.setItem(
            "hcn-language",
            language
        );

        /* Update HTML language */
        document.documentElement.lang =
            language;

        /* ================================
           TRANSLATE CONTENT
        ================================= */

        document
            .querySelectorAll("[data-i18n]")
            .forEach(function (element) {

                const key =
                    element.getAttribute("data-i18n");

                if (
                    translations[language][key]
                ) {

                    element.textContent =
                        translations[language][key];

                }

            });

        /* ================================
           ACTIVE LANGUAGE BUTTON
        ================================= */

       
/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const currentPage = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

document.querySelectorAll(".nav-links a").forEach(link => {

    const href = link.getAttribute("href");

    // Remove any previously assigned active class
    link.classList.remove("active");

    // Match the current HTML page
    if (href && href.toLowerCase() === currentPage) {
        link.classList.add("active");
    }

});

// Special handling for the homepage
if (currentPage === "" || currentPage === "index.html") {

    const feedsLink = document.querySelector(
        '.nav-links a[data-i18n="nav.feeds"]'
    );

    if (feedsLink) {
        feedsLink.classList.add("active");
    }

}

    }


    /* ================================
       START
    ================================= */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            /* ================================
               SAVED LANGUAGE
            ================================= */

            const savedLanguage =
                localStorage.getItem("hcn-language")
                || "en";


            /* Apply language */
            setLanguage(savedLanguage);


            /* ================================
               LANGUAGE BUTTONS
            ================================= */

            document
                .querySelectorAll("[data-language]")
                .forEach(function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            setLanguage(
                                button.dataset.language
                            );

                        }
                    );

                });

        });

})();