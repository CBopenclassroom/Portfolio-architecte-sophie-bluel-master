async function getCategories() {
    const categories = await fetch("http://localhost:5678/api/categories");
    const categoriesJson = await categories.json();
    console.log(categoriesJson)
    return categoriesJson;
}

getCategories()

async function displayCategories() {
    const categories = await getCategories();
    const categoriesContainer = document.querySelector(".filter");
    const filterButtonTousInfos = {id:"0", name:"Tous"}

    const filterButtonTous = createFilterButton(filterButtonTousInfos)
    filterButtonTous.classList.add("button-selected")
    
    categoriesContainer.appendChild(filterButtonTous)


    for (let i = 0; i < categories.length; i++) {
        const filterButton = createFilterButton(categories[i])
        categoriesContainer.appendChild(filterButton)
    }

}

function createFilterButton(infos) {
    const filterButton = document.createElement("button")
    filterButton.setAttribute("id", infos.id)
    filterButton.innerHTML = infos.name
    filterButton.classList.add("filter-button")

    filterButton.addEventListener("click", function () {
        document.querySelector(".button-selected").classList.remove("button-selected")
        filterButton.classList.add("button-selected")
        displayProjects(filterButton.id)
    })
    return (filterButton)
}


displayCategories()


async function buttonsManagements() {
    const buttonT = document.getElementById("0")

}



