const inputId = document.querySelector(".inputId")
const btnRedirect = document.querySelector("button.redirect")

btnRedirect.addEventListener("click", () => {
    location.href = `http://localhost:8000/scene/${inputId.id}`
})
