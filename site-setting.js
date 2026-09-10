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

        document
            .querySelectorAll("[data-language]")
            .forEach(function (button) {

                button.classList.toggle(
                    "active",
                    button.dataset.language === language
                );

            });

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