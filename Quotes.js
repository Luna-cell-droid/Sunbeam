/* =========================================================
   PERFECT DAY — QUOTE GARDEN
========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       QUOTES

       Change the image names to match your images.
    ===================================================== */

    const quotes = [

        {
            image: "images/quote1.jpg",

            quote:
                "You don't have to have everything figured out today.",

            author:
                "— A little reminder"
        },


        {
            image: "images/quote2.jpg",

            quote:
                "Small steps still take you somewhere.",

            author:
                "— Perfect Day"
        },


        {
            image: "images/quote3.jpg",

            quote:
                "There is something lovely about simply being here.",

            author:
                "— A little reminder"
        },


        {
            image: "images/quote4.jpg",

            quote:
                "Let today be enough.",

            author:
                "— Perfect Day"
        },


        {
            image: "images/quote5.jpg",

            quote:
                "You are allowed to enjoy the little things.",

            author:
                "— A little reminder"
        }

    ];



    /* =====================================================
       GET HTML ELEMENTS
    ===================================================== */

    const quoteCard =
        document.getElementById("quoteCard");


    const quoteImage =
        document.getElementById("quoteImage");


    const cardQuote =
        document.getElementById("cardQuote");


    const cardAuthor =
        document.getElementById("cardAuthor");


    const quoteCounter =
        document.getElementById("quoteCounter");


    const previousQuote =
        document.getElementById("previousQuote");


    const nextQuote =
        document.getElementById("nextQuote");


    const saveQuote =
        document.getElementById("saveQuote");


    const savedQuotes =
        document.getElementById("savedQuotes");



    /* =====================================================
       CURRENT CARD
    ===================================================== */

    let currentQuote = 0;



    /* =====================================================
       SHOW QUOTE
    ===================================================== */

    function showQuote(index, direction = "next") {


        const quote =
            quotes[index];


        /* Animation */

        quoteCard.classList.remove(
            "quote-slide-next",
            "quote-slide-previous"
        );


        void quoteCard.offsetWidth;


        if (direction === "next") {

            quoteCard.classList.add(
                "quote-slide-next"
            );

        } else {

            quoteCard.classList.add(
                "quote-slide-previous"
            );

        }


        /* Change content */

        setTimeout(function () {

            quoteImage.src =
                quote.image;

            quoteImage.alt =
                "Quote card " + (index + 1);


            cardQuote.textContent =
                quote.quote;


            cardAuthor.textContent =
                quote.author;


            quoteCounter.textContent =
                `${index + 1} / ${quotes.length}`;


        }, 100);


    }



    /* =====================================================
       NEXT
    ===================================================== */

    function nextCard() {


        currentQuote++;


        if (currentQuote >= quotes.length) {

            currentQuote = 0;

        }


        showQuote(
            currentQuote,
            "next"
        );

    }



    /* =====================================================
       PREVIOUS
    ===================================================== */

    function previousCard() {


        currentQuote--;


        if (currentQuote < 0) {

            currentQuote =
                quotes.length - 1;

        }


        showQuote(
            currentQuote,
            "previous"
        );

    }



    /* =====================================================
       BUTTONS
    ===================================================== */

    nextQuote.addEventListener(
        "click",
        nextCard
    );


    previousQuote.addEventListener(
        "click",
        previousCard
    );



    /* =====================================================
       KEYBOARD SUPPORT

       Left arrow = previous
       Right arrow = next
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {


            if (event.key === "ArrowRight") {

                nextCard();

            }


            if (event.key === "ArrowLeft") {

                previousCard();

            }

        }
    );



    /* =====================================================
       SWIPE SUPPORT
    ===================================================== */

    let touchStartX = 0;

    let touchEndX = 0;



    quoteCard.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );



    quoteCard.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;


            handleSwipe();

        },
        { passive: true }
    );



    function handleSwipe() {


        const distance =
            touchEndX - touchStartX;


        /* Ignore tiny movements */

        if (Math.abs(distance) < 50) {

            return;

        }


        /* Swipe left */

        if (distance < 0) {

            nextCard();

        }


        /* Swipe right */

        else {

            previousCard();

        }

    }



    /* =====================================================
       FAVOURITES
    ===================================================== */


    let favourites =
        JSON.parse(
            localStorage.getItem(
                "perfectDayFavouriteQuotes"
            )
        ) || [];



    /* =====================================================
       SAVE FAVOURITES
    ===================================================== */

    function saveFavourites() {


        localStorage.setItem(
            "perfectDayFavouriteQuotes",
            JSON.stringify(favourites)
        );

    }



    /* =====================================================
       SAVE CURRENT QUOTE
    ===================================================== */

    saveQuote.addEventListener(
        "click",
        function () {


            const quote =
                quotes[currentQuote];


            const alreadySaved =
                favourites.some(
                    function (favourite) {

                        return (
                            favourite.image ===
                            quote.image
                        );

                    }
                );


            if (alreadySaved) {


                saveQuote.textContent =
                    "Already saved ♡";


                setTimeout(
                    function () {

                        saveQuote.textContent =
                            "♡ Save this one";

                    },
                    1500
                );


                return;

            }


            /* Add favourite */

            favourites.push(quote);


            saveFavourites();


            displaySavedQuotes();


            /* Button feedback */

            saveQuote.textContent =
                "Saved ♡";


            setTimeout(
                function () {

                    saveQuote.textContent =
                        "♡ Save this one";

                },
                1500
            );

        }
    );



    /* =====================================================
       DISPLAY SAVED QUOTES
    ===================================================== */

    function displaySavedQuotes() {


        savedQuotes.innerHTML = "";


        /* Nothing saved */

        if (favourites.length === 0) {


            savedQuotes.innerHTML = `

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



        /* Create each saved card */

        favourites.forEach(
            function (quote, index) {


                const card =
                    document.createElement("article");


                card.className =
                    "saved-quote-card";


                card.innerHTML = `

                    <img
                        src="${quote.image}"
                        alt="Saved quote">


                    <div class="saved-quote-text">

                        <p>
                            “${quote.quote}”
                        </p>


                        <span>
                            ${quote.author}
                        </span>


                        <button
                            class="remove-quote"
                            data-index="${index}">

                            Remove ♡

                        </button>

                    </div>

                `;


                savedQuotes.appendChild(card);

            }
        );

    }



    /* =====================================================
       REMOVE FAVOURITE
    ===================================================== */

    savedQuotes.addEventListener(
        "click",
        function (event) {


            if (
                !event.target.classList.contains(
                    "remove-quote"
                )
            ) {

                return;

            }


            const index =
                Number(
                    event.target.dataset.index
                );


            favourites.splice(
                index,
                1
            );


            saveFavourites();


            displaySavedQuotes();

        }
    );



    /* =====================================================
       INITIALISE
    ===================================================== */

    showQuote(
        currentQuote,
        "next"
    );


    displaySavedQuotes();

});