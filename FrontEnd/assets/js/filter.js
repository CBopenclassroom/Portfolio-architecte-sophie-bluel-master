async function getCategories() {
    const categories = await fetch("http://localhost:5678/api/categories");
    const categoriesJson = await categories.json();
    return categoriesJson;
}

getCategories()

async function displayCategories() {
    const categories = await getCategories();
    const categoriesContainer = document.querySelector(".filter");
    const filterButton = document.createElement("button")
    filterButton.innerHTML = "Tous"
    filterButton.setAttribute("id", "0")
    filterButton.classList.add("filter-button")
    filterButton.classList.add("button-selected")
    categoriesContainer.appendChild(filterButton)
    filterButton.addEventListener("click", function () {
        document.querySelector(".button-selected").classList.remove("button-selected")
        filterButton.classList.add("button-selected")
        displayProjects(0)
    })

    for (let i = 0; i < categories.length; i++) {
        const filterButton = document.createElement("button")
        filterButton.setAttribute("id", categories[i].id)
        filterButton.innerHTML = categories[i].name
        filterButton.classList.add("filter-button")
        categoriesContainer.appendChild(filterButton)

        filterButton.addEventListener("click", function () {
            document.querySelector(".button-selected").classList.add("filter-button")
            document.querySelector(".button-selected").classList.remove("button-selected")
            filterButton.classList.add("button-selected")
            displayProjects(filterButton.id)
        })
    }

}


displayCategories()


async function buttonsManagements() {
    const buttonT = document.getElementById("0")

}



