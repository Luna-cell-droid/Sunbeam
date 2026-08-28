document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       GARDEN ELEMENTS
       ===================================================== */

    const gardenPlant = document.getElementById("gardenPlant");
    const plantStage = document.getElementById("plantStage");
    const plantMessage = document.getElementById("plantMessage");

    const growthNumber = document.getElementById("growthNumber");
    const growthProgress = document.getElementById("growthProgress");

    const gardenDays = document.getElementById("gardenDays");
    const gardenActions = document.getElementById("gardenActions");
    const gardenGrowth = document.getElementById("gardenGrowth");

    const waterPlant = document.getElementById("waterPlant");
    const sunPlant = document.getElementById("sunPlant");
    const talkPlant = document.getElementById("talkPlant");

    const resetGarden = document.getElementById("resetGarden");


    /* =====================================================
       GET SAVED GARDEN DATA
       ===================================================== */

    let growth =
        Number(localStorage.getItem("perfectDayGrowth")) || 0;

    let actions =
        Number(localStorage.getItem("perfectDayActions")) || 0;

    let days =
        Number(localStorage.getItem("perfectDayDays")) || 0;


    /* =====================================================
       SAVE GARDEN
       ===================================================== */

    function saveGarden() {

        localStorage.setItem(
            "perfectDayGrowth",
            growth
        );

        localStorage.setItem(
            "perfectDayActions",
            actions
        );

        localStorage.setItem(
            "perfectDayDays",
            days
        );
    }


    /* =====================================================
       UPDATE PLANT
       ===================================================== */

    function updateGarden() {

        const percentage = Math.min(growth, 100);


        /* ---------- PLANT STAGE ---------- */

        if (growth < 20) {

            gardenPlant.textContent = "🌱";

            plantStage.textContent =
                "Tiny Seedling";

            plantMessage.textContent =
                "Your little plant is waiting for some love.";

        }

        else if (growth < 50) {

            gardenPlant.textContent = "🌿";

            plantStage.textContent =
                "Little Sprout";

            plantMessage.textContent =
                "Look! Your little plant is starting to grow.";

        }

        else if (growth < 80) {

            gardenPlant.textContent = "🪴";

            plantStage.textContent =
                "Growing Plant";

            plantMessage.textContent =
                "Your plant is getting stronger every day.";

        }

        else if (growth < 100) {

            gardenPlant.textContent = "🌷";

            plantStage.textContent =
                "Budding Flower";

            plantMessage.textContent =
                "A little flower is getting ready to bloom.";

        }

        else {

            gardenPlant.textContent = "🌸";

            plantStage.textContent =
                "Blooming Flower";

            plantMessage.textContent =
                "You helped your little garden bloom!";

        }


        /* ---------- GROWTH ---------- */

        growthNumber.textContent =
            percentage + " / 100";

        growthProgress.style.width =
            percentage + "%";

        gardenGrowth.textContent =
            percentage + "%";


        /* ---------- STATS ---------- */

        gardenActions.textContent =
            actions;

        gardenDays.textContent =
            days;
    }


    /* =====================================================
       WATER
       ===================================================== */

    if (waterPlant) {

        waterPlant.addEventListener("click", function () {

            growth += 2;
            actions += 1;

            saveGarden();
            updateGarden();

            plantMessage.textContent =
                "Your plant loved the water! 💧";

        });
    }


    /* =====================================================
       SUNLIGHT
       ===================================================== */

    if (sunPlant) {

        sunPlant.addEventListener("click", function () {

            growth += 2;
            actions += 1;

            saveGarden();
            updateGarden();

            plantMessage.textContent =
                "Your plant is enjoying the sunshine! ☀️";

        });
    }


    /* =====================================================
       TALK
       ===================================================== */

    if (talkPlant) {

        talkPlant.addEventListener("click", function () {

            growth += 1;
            actions += 1;

            saveGarden();
            updateGarden();

            plantMessage.textContent =
                "Your plant likes hearing from you. 💬";

        });
    }


    /* =====================================================
       RESET GARDEN
       ===================================================== */

    if (resetGarden) {

        resetGarden.addEventListener("click", function () {

            const confirmReset = confirm(
                "Start a new garden? Your current plant growth will be reset."
            );

            if (!confirmReset) {
                return;
            }


            /* DELETE ALL GARDEN DATA */

            localStorage.removeItem(
                "perfectDayGrowth"
            );

            localStorage.removeItem(
                "perfectDayActions"
            );

            localStorage.removeItem(
                "perfectDayDays"
            );


            /* IMPORTANT:
               Reload the page so the old variables
               cannot come back. */

            window.location.reload();

        });

    }


    /* =====================================================
       INITIAL DISPLAY
       ===================================================== */

    updateGarden();

});