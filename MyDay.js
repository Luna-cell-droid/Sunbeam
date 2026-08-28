/* =========================================================
   PERFECT DAY — MY DAY
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    /* =====================================================
       GROWTH SYSTEM
       ===================================================== */
    let growth =
        Number(localStorage.getItem("perfectDayGrowth")) || 0;

    function addGrowth(amount) {

        growth += amount;

        localStorage.setItem(
            "perfectDayGrowth",
            growth
        );
    }
    /* =====================================================
       TODAY'S DATE
       ===================================================== */
    const todayDate =
        document.getElementById("todayDate");
    if (todayDate) {
        const today = new Date();
        todayDate.textContent =
            today.toLocaleDateString("en-NZ", {
                weekday: "long",
                day: "numeric",
                month: "long"
            });
    }
    /* =====================================================
       TO-DO LIST
       ===================================================== */
    const todoInput =
        document.getElementById("todoInput");

    const addTodo =
        document.getElementById("addTodo");

    const todoList =
        document.getElementById("todoList");


    let todos =
        JSON.parse(
            localStorage.getItem("perfectDayTodos")
        ) || [];
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
            const li =
                document.createElement("li");
            li.innerHTML = `
                <label class="todo-item">
                    <input
                        type="checkbox"
                        class="todo-checkbox"
                        data-index="${index}"
                        ${todo.completed ? "checked" : ""}
                    >

                    <span class="${todo.completed ? "completed" : ""}">
                        ${todo.text}
                    </span>
                </label>

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

        const task =
            todoInput.value.trim();


        if (task === "") return;


        todos.push({
            text: task,
            completed: false
        });


        saveTodos();

        displayTodos();

        todoInput.value = "";

        todoInput.focus();

    }


    if (addTodo) {

        addTodo.addEventListener(
            "click",
            createTodo
        );

    }


    if (todoInput) {

        todoInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {
                    createTodo();
                }

            }
        );

    }


    if (todoList) {

        todoList.addEventListener(
            "click",
            function (event) {


                /* Complete task */

                if (
                    event.target.classList.contains(
                        "todo-checkbox"
                    )
                ) {

                    const index =
                        Number(
                            event.target.dataset.index
                        );


                    if (
                        !todos[index].completed
                    ) {

                        todos[index].completed =
                            true;

                        addGrowth(10);

                    }


                    saveTodos();

                    displayTodos();

                }


                /* Delete task */

                if (
                    event.target.classList.contains(
                        "delete-todo"
                    )
                ) {

                    const index =
                        Number(
                            event.target.dataset.index
                        );


                    todos.splice(index, 1);

                    saveTodos();

                    displayTodos();

                }

            }
        );

    }


    displayTodos();



    /* =====================================================
       MOOD
       ===================================================== */

    const moods =
        document.querySelectorAll(".day-mood");


    const savedMood =
        localStorage.getItem(
            "perfectDayMood"
        );


    moods.forEach(function (mood) {

        const moodName =
            mood.dataset.mood;


        if (moodName === savedMood) {

            mood.classList.add("selected");

        }


        mood.addEventListener(
            "click",
            function () {


                moods.forEach(function (item) {

                    item.classList.remove(
                        "selected"
                    );

                });


                mood.classList.add("selected");


                /* Only award growth the first
                   time today's mood is chosen */

                if (!savedMood) {

                    addGrowth(5);

                }


                localStorage.setItem(
                    "perfectDayMood",
                    moodName
                );

            }
        );

    });



    /* =====================================================
       GRATITUDE
       ===================================================== */

    const gratitude =
        document.getElementById(
            "gratitude"
        );


    const saveGratitude =
        document.getElementById(
            "saveGratitude"
        );


    if (gratitude) {

        gratitude.value =
            localStorage.getItem(
                "perfectDayGratitude"
            ) || "";

    }


    if (saveGratitude) {

        saveGratitude.addEventListener(
            "click",
            function () {

                if (!gratitude) return;


                const text =
                    gratitude.value.trim();


                if (text === "") return;


                const previous =
                    localStorage.getItem(
                        "perfectDayGratitude"
                    );


                if (!previous) {

                    addGrowth(5);

                }


                localStorage.setItem(
                    "perfectDayGratitude",
                    text
                );


                saveGratitude.textContent =
                    "Saved ✦";


                setTimeout(function () {

                    saveGratitude.textContent =
                        "Save this moment ✦";

                }, 1500);

            }
        );

    }



    /* =====================================================
       REFLECTION
       ===================================================== */

    const reflection =
        document.getElementById(
            "dayReflection"
        );


    const saveReflection =
        document.getElementById(
            "saveReflection"
        );


    if (reflection) {

        reflection.value =
            localStorage.getItem(
                "perfectDayReflection"
            ) || "";

    }


    if (saveReflection) {

        saveReflection.addEventListener(
            "click",
            function () {

                if (!reflection) return;


                const text =
                    reflection.value.trim();


                if (text === "") return;


                const previous =
                    localStorage.getItem(
                        "perfectDayReflection"
                    );


                if (!previous) {

                    addGrowth(5);

                }


                localStorage.setItem(
                    "perfectDayReflection",
                    text
                );


                saveReflection.textContent =
                    "Memory kept ♡";


                setTimeout(function () {

                    saveReflection.textContent =
                        "Keep this memory ♡";

                }, 1500);

            }
        );

    }

});