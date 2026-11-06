
/* =========================================================
   HARIPAL CABLE TV NETWORK
   MULTILINGUAL LANGUAGE ENGINE
========================================================= */

function applyLanguage(language) {

    const translations = window.HCN_TRANSLATIONS;

    if (!translations) {
        console.error("HCN: Translation dictionary not loaded!");
        return;
    }

    const dictionary = translations[language];

    if (!dictionary) {
        console.error("HCN: Language not found:", language);
        return;
    }

    document.documentElement.lang = language;

    // Translate all elements containing data-i18n
    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");

        if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
            element.textContent = dictionary[key];
        }

    });

    // Remember language temporarily for page navigation
    try {
        sessionStorage.setItem("hcn-language", language);
    } catch (error) {
        console.warn("HCN: Session storage unavailable.");
    }

    updateLanguageButton(language);

    console.log("HCN: Applied language:", language);
}


/* =========================================================
   UPDATE LANGUAGE BUTTON
========================================================= */

function updateLanguageButton(language) {

    document.querySelectorAll(".language-option").forEach(option => {

        option.classList.toggle(
            "active",
            option.dataset.lang === language
        );

    });

}


/* =========================================================
   INITIALIZE LANGUAGE SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* LANGUAGE DROPDOWN */

    const selector = document.querySelector(".language-selector");
    const toggle = document.querySelector(".language-toggle");

    // Attach dropdown events only if selector exists
    if (selector && toggle) {

        toggle.addEventListener("click", function (event) {

            event.stopPropagation();

            const isOpen = selector.classList.toggle("open");

            toggle.setAttribute("aria-expanded", String(isOpen));

        });

        selector.querySelectorAll(".language-option").forEach(option => {

            option.addEventListener("click", function (event) {

                event.stopPropagation();

                applyLanguage(this.dataset.lang);

                selector.classList.remove("open");

                toggle.setAttribute("aria-expanded", "false");

            });

        });

        document.addEventListener("click", function (event) {

            if (!selector.contains(event.target)) {

                selector.classList.remove("open");

                toggle.setAttribute("aria-expanded", "false");

            }

        });

    }


    /* LOAD LANGUAGE */

    let currentLanguage = "en";

    const navigationEntry =
        performance.getEntriesByType("navigation")[0];

    const isReload =
        navigationEntry && navigationEntry.type === "reload";

    try {

        if (isReload) {

            sessionStorage.removeItem("hcn-language");

            currentLanguage = "en";

        } else {

            currentLanguage =
                sessionStorage.getItem("hcn-language") || "en";

        }

    } catch (error) {

        console.warn("HCN: Could not access session storage.");

    }

    if (!window.HCN_TRANSLATIONS[currentLanguage]) {
        currentLanguage = "en";
    }

    applyLanguage(currentLanguage);

});
