document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // GET ELEMENTS FROM HTML
    // =========================================

    const quoteCards = document.querySelectorAll(".quote-card");

    const previousButton = document.getElementById("previousQuote");
    const nextButton = document.getElementById("nextQuote");

    const quoteCounter = document.getElementById("quoteCounter");

    const saveButton = document.getElementById("saveQuote");
    const savedQuotesContainer = document.getElementById("savedQuotes");


    // =========================================
    // CURRENT QUOTE
    // =========================================

    let currentQuote = 0;


    // =========================================
    // SHOW A QUOTE
    // =========================================

    function showQuote(index) {

        // Hide every quote
        quoteCards.forEach(function (card) {

            card.classList.remove("active");

        });


        // Show the selected quote
        quoteCards[index].classList.add("active");


        // Update counter
        quoteCounter.textContent =
            (index + 1) + " / " + quoteCards.length;

    }


    // =========================================
    // NEXT BUTTON →
    // =========================================

    nextButton.addEventListener("click", function () {

        currentQuote = currentQuote + 1;


        // If we reach the last quote,
        // go back to the first one

        if (currentQuote >= quoteCards.length) {

            currentQuote = 0;

        }


        showQuote(currentQuote);

    });


    // =========================================
    // PREVIOUS BUTTON ←
    // =========================================

    previousButton.addEventListener("click", function () {

        currentQuote = currentQuote - 1;


        // If we go before the first quote,
        // go to the last quote

        if (currentQuote < 0) {

            currentQuote = quoteCards.length - 1;

        }


        showQuote(currentQuote);

    });


    // =========================================
    // SAVED QUOTES
    // =========================================

    let savedQuotes =
        JSON.parse(
            localStorage.getItem("perfectDayQuotes")
        ) || [];


    // =========================================
    // SAVE CURRENT QUOTE
    // =========================================

    saveButton.addEventListener("click", function () {

        // Get the currently visible card
        const currentCard =
            quoteCards[currentQuote];


        // Get its image
        const image =
            currentCard
                .querySelector("img")
                .getAttribute("src");


        // Check if already saved
        const alreadySaved =
            savedQuotes.includes(image);


        if (alreadySaved) {

            saveButton.textContent =
                "Already saved ♡";

        }

        else {

            // Add image to favourites
            savedQuotes.push(image);


            // Save it in browser storage
            localStorage.setItem(
                "perfectDayQuotes",
                JSON.stringify(savedQuotes)
            );


            saveButton.textContent =
                "Saved ♡";


            // Refresh favourites
            displaySavedQuotes();

        }


        // Change button back after a moment
        setTimeout(function () {

            saveButton.textContent =
                "♡ Save this one";

        }, 1500);

    });


    // =========================================
    // DISPLAY SAVED QUOTES
    // =========================================

    function displaySavedQuotes() {

        // Clear current favourites
        savedQuotesContainer.innerHTML = "";


        // If there are no saved quotes
        if (savedQuotes.length === 0) {

            savedQuotesContainer.innerHTML = `

                <div class="empty-quotes">

                    <span>♡</span>

                    <p>
                        Your favourite quotes
                        will appear here.
                    </p>

                </div>

            `;

            return;

        }


        // Create a card for every saved quote
        savedQuotes.forEach(function (image, index) {

            const savedCard =
                document.createElement("div");


            savedCard.className =
                "saved-quote-card";


            savedCard.innerHTML = `

                <img
                    src="${image}"
                    alt="Saved quote">


                <button
                    class="remove-quote"
                    data-index="${index}">

                    Remove ♡

                </button>

            `;


            savedQuotesContainer.appendChild(savedCard);

        });

    }


    // =========================================
    // REMOVE A SAVED QUOTE
    // =========================================

    savedQuotesContainer.addEventListener(
        "click",
        function (event) {

            // Make sure the remove button was clicked
            if (
                !event.target.classList.contains(
                    "remove-quote"
                )
            ) {

                return;

            }


            // Find which quote was clicked
            const index =
                Number(
                    event.target.dataset.index
                );


            // Remove it
            savedQuotes.splice(index, 1);


            // Update browser storage
            localStorage.setItem(
                "perfectDayQuotes",
                JSON.stringify(savedQuotes)
            );


            // Refresh the favourites
            displaySavedQuotes();

        }
    );


    // =========================================
    // START THE PAGE
    // =========================================

    if (quoteCards.length > 0) {

        showQuote(currentQuote);

    }


    displaySavedQuotes();

});