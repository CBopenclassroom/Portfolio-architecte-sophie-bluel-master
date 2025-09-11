async function displayProjectsInModal() {
   const projects = await getProjects();
   const galleryContainer = document.querySelector(".modal-gallery");
   galleryContainer.innerHTML = null
   for (let i = 0; i < projects.length; i++) {
      const figure = document.createElement("figure");
      const pictures = document.createElement("img")
      figure.classList.add("modal-gallery-figure")
      pictures.src = projects[i].imageUrl
      galleryContainer.appendChild(figure);
      figure.appendChild(pictures);
      const icon = document.createElement("i");
      icon.classList.add("fas", "fa-trash-alt")
      figure.appendChild(icon);
      icon.addEventListener("click", function () {
         deleteProject(projects[i].id)
      })
   }
}


async function deleteProject(id) {
   const token = "Bearer " + localStorage.getItem("token")
   try {
      const result = await fetch("http://localhost:5678/api/works/" + id, {
         method: "DELETE",
         headers: {
            "Authorization": token,
            "Content-Type": "application/json"
         }
      })
      if (!result.ok) {
         throw new Error("Erreur de suppression")
      }
      document.getElementById("error-message").innerHTML = null
      displayProjects(0)
      displayProjectsInModal()
   } catch (error) {
      console.error(error)
      document.getElementById("error-message").innerHTML = "Erreur lors de la suppression du projet"
   }

}

displayProjectsInModal()


const modificationButton = document.getElementById("modification-button")
const addProjectsButton = document.querySelector(".add-project-button")
const returnToOldModal = document.querySelector(".js-modal-return")

modificationButton.addEventListener("click", function () {
   openModal("modal-main")
})

returnToOldModal.addEventListener("click", function () {
   closeModal()
   openModal("modal-main")
})

addProjectsButton.addEventListener("click", function () {
   closeModal()
   resetSendWorkForm(document.getElementById("new-project"))
   openModal("modal-add-projects")
})

function openModal(id) {
   const target = document.getElementById(id)
   target.style.display = "flex"
   target.removeAttribute("aria-hidden")
   target.setAttribute("aria-modal", "true")
   modal = target
   modal.addEventListener("click", closeModal)
   modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
   modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
}

function closeModal() {
   modal.style.display = "none"
   modal.setAttribute("aria-hidden", "true")
   modal.removeAttribute("aria-modal")
   modal.removeEventListener("click", closeModal)
   modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
   modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
   modal = null
}

const stopPropagation = function (e) {
   e.stopPropagation()
}

function triggerUploadProject() {
   const uploadProjectButton = document.querySelector(".add-picture-button")
   const uploadProjectFile = document.getElementById("project-file")
   uploadProjectButton.addEventListener("click", function () {
      uploadProjectFile.click()
   })
}

triggerUploadProject()

function handleFileSelection() {
   const uploadProjectFile = document.getElementById("project-file")
   uploadProjectFile.addEventListener("change", function (e) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      console.log(url)
      if (file.type.includes("image")) {
         const previewImg = document.getElementById("project-preview")
         previewImg.setAttribute("src", url)
         previewImg.classList.remove("hidden")
         document.getElementById("preview-container").classList.add("hidden")
      }
      return
   })
}

handleFileSelection()


async function displayCategoriesInInput() {
   const categories = await getCategories();
   const categoriesDataList = document.getElementById("category");
   for (let i = 0; i < categories.length; i++) {
      const option = document.createElement("option")
      option.setAttribute("value", categories[i].id)
      option.innerHTML = categories[i].name
      categoriesDataList.appendChild(option)
   }
   categoriesDataList.selectedIndex = -1;
}

displayCategoriesInInput()

function sendNewProject() {
   const token = "Bearer " + localStorage.getItem("token")
   const errorMessage = document.getElementById("error-sending")
   const form = document.getElementById("new-project")
   form.addEventListener("submit", async function (event) {
      event.preventDefault()
      const formData = new FormData(form)
      const result = await fetch("http://localhost:5678/api/works", {
         method: "POST",
         headers: { "Authorization": token },
         body: formData
      })

      if (!result.ok) {
         errorMessage.innerText = "Erreur lors de l'envoie"
         resetSendWorkForm(form)
      } else {
         displayProjectsInModal()
         displayProjects(0)
         resetSendWorkForm(form)
         closeModal()
      }

   })
}

sendNewProject()

function resetSendWorkForm(form) {
   const categoriesDataList = document.getElementById("category");
   const previewImg = document.getElementById("project-preview")
   const submitButton = document.querySelector(".add-confirmation-button")
   form.reset()
   categoriesDataList.selectedIndex = -1;
   previewImg.setAttribute("src", "")
   previewImg.classList.add("hidden")
   document.getElementById("preview-container").classList.remove("hidden")
   submitButton.classList.add("disabled-button")
   submitButton.disabled = true


}

function handleUploadSubmitButton() {
   const file = document.getElementById("project-file")
   const title = document.getElementById("title")
   const category = document.getElementById("category")
   const submitButton = document.querySelector(".add-confirmation-button")
   const checkFields = () => {
      if (file.files.length > 0 && title.value && category.value) {
         submitButton.disabled = false
         submitButton.classList.remove("disabled-button")
      } else {
         submitButton.disabled = true
         submitButton.classList.add("disabled-button")
      }
   }
   file.addEventListener("change", checkFields)
   title.addEventListener("input", checkFields)
   category.addEventListener("change", checkFields)

}

handleUploadSubmitButton()
