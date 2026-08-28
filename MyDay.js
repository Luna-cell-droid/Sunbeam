/* =========================================================
   PERFECT DAY — MY DAY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       TODAY'S DATE
       ===================================================== */

    const todayDate = document.getElementById("todayDate");

    if (todayDate) {

        const today = new Date();

        const date = today.toLocaleDateString("en-NZ", {
            weekday: "long",
            day: "numeric",
            month: "long"
        });

        todayDate.textContent = date;
    }


    /* =====================================================
       TO-DO LIST
       ===================================================== */

    const todoInput = document.getElementById("todoInput");
    const addTodo = document.getElementById("addTodo");
    const todoList = document.getElementById("todoList");

    let todos = JSON.parse(localStorage.getItem("perfectDayTodos")) || [];


    function saveTodos() {
        localStorage.setItem(
            "perfectDayTodos",
            JSON.stringify(todos)
        );
    }


    function displayTodos() {

        if (!todoList) return;

        todoList.innerHTML = "";

        todos.forEach(function (todo, index) {

            const li = document.createElement("li");

            li.innerHTML = `
                <span>${todo}</span>

                <button
                    class="delete-todo"
                    data-index="${index}"
                    aria-label="Delete task">
                    ×
                </button>
            `;

            todoList.appendChild(li);
        });
    }


    function createTodo() {

        if (!todoInput) return;

        const task = todoInput.value.trim();

        if (task === "") {
            return;
        }

        todos.push(task);

        saveTodos();
        displayTodos();

        todoInput.value = "";
        todoInput.focus();
    }


    if (addTodo) {
        addTodo.addEventListener("click", createTodo);
    }


    if (todoInput) {
        todoInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                createTodo();
            }

        });
    }


    if (todoList) {

        todoList.addEventListener("click", function (event) {

            if (
                event.target.classList.contains("delete-todo")
            ) {

                const index =
                    Number(event.target.dataset.index);

                todos.splice(index, 1);

                saveTodos();
                displayTodos();
            }

        });

    }


    displayTodos();


    /* =====================================================
       MOOD CHECK-IN
       ===================================================== */

    const moods = document.querySelectorAll(".day-mood");

    let savedMood =
        localStorage.getItem("perfectDayMood");


    moods.forEach(function (mood) {

        const moodName =
            mood.dataset.mood;


        if (moodName === savedMood) {
            mood.classList.add("selected");
        }


        mood.addEventListener("click", function () {

            moods.forEach(function (item) {
                item.classList.remove("selected");
            });

            mood.classList.add("selected");

            localStorage.setItem(
                "perfectDayMood",
                moodName
            );

        });

    });


    /* =====================================================
       GRATITUDE
       ===================================================== */

    const gratitude =
        document.getElementById("gratitude");

    const saveGratitude =
        document.getElementById("saveGratitude");


    if (gratitude) {

        gratitude.value =
            localStorage.getItem(
                "perfectDayGratitude"
            ) || "";

    }


    if (saveGratitude) {

        saveGratitude.addEventListener("click", function () {

            if (!gratitude) return;

            localStorage.setItem(
                "perfectDayGratitude",
                gratitude.value
            );

            saveGratitude.textContent =
                "Saved ✦";

            setTimeout(function () {

                saveGratitude.textContent =
                    "Save this moment ✦";

            }, 1500);

        });

    }


    /* =====================================================
       DAY REFLECTION
       ===================================================== */

    const reflection =
        document.getElementById("dayReflection");

    const saveReflection =
        document.getElementById("saveReflection");


    if (reflection) {

        reflection.value =
            localStorage.getItem(
                "perfectDayReflection"
            ) || "";

    }


    if (saveReflection) {

        saveReflection.addEventListener("click", function () {

            if (!reflection) return;

            localStorage.setItem(
                "perfectDayReflection",
                reflection.value
            );

            saveReflection.textContent =
                "Memory kept ♡";

            setTimeout(function () {

                saveReflection.textContent =
                    "Keep this memory ♡";

            }, 1500);

        });

    }

});