

async function getProjects() {
    const projects = await fetch("http://localhost:5678/api/works");
    const projectsJson = await projects.json();
    return projectsJson;
}


getProjects()


async function displayProjects(idCategory) {
    const projects = await getProjects();
    const filteredProjects = projects.filter((project) => project.categoryId == idCategory || idCategory == 0)
    const galleryContainer = document.querySelector(".gallery");
    galleryContainer.innerHTML = null
    for (let i = 0; i < filteredProjects.length; i++) {
        const figure = document.createElement("figure");
        const pictures = document.createElement("img")
        const caption = document.createElement("figcaption")
        caption.innerHTML = filteredProjects[i].title
        pictures.setAttribute("src", "")
        pictures.src = filteredProjects[i].imageUrl
        galleryContainer.appendChild(figure);
        figure.appendChild(pictures);
        figure.appendChild(caption);
    }
}


displayProjects(0)

