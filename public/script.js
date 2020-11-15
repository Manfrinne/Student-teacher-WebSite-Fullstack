// Verificar window tree HTML/JavaScript
const currentPage = window.location.pathname
const menuItens = document.querySelectorAll("header .links a")

for (item of menuItens) {
  // O método '.includes' vai me retornar um bolean value.
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active")
  }
}
