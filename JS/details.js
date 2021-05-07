//HTML variables
let sectionContainer = document.querySelector('section');
let pageTitle = document.getElementById("detailsTitle")

//Url 
var MENU_ITEM_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/menu/";

// Global variables
const queryString = window.location.search;
let urlParam = new URLSearchParams(queryString);
let idRecieved = urlParam.get('id');

window.addEventListener("load", getValuesFromPage)


function getValuesFromPage() {
  fetch(MENU_ITEM_SERVER_URL + idRecieved+ ".json", {
    method: "GET"
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
  })
  .then(responseItem => {
    displayItem(responseItem);
  })
}

function displayItem(item) {
  pageTitle.innerText = `Details about: ${item.nume}`

  let homeButton = document.createElement("button");
  homeButton.classList.add("homeBtn");
  homeButton.innerText = "Home page"
  homeButton.addEventListener("click", goBackHome);
  sectionContainer.appendChild(homeButton);

  let itemContainer = document.createElement('div');
  itemContainer.setAttribute('class', "menuItem");
  sectionContainer.appendChild(itemContainer);

  let imageContainer = document.createElement('div');
  imageContainer.innerHTML = "<img src='" + item.imagine + "'>";
  imageContainer.setAttribute('class', "img");
  itemContainer.appendChild(imageContainer);

  let nameContainer = document.createElement('p');
  nameContainer.innerHTML = "<span>Name:</span> " + item.nume;
  nameContainer.classList.add("nameClass");
  itemContainer.appendChild(nameContainer);

  let ingredientsContainer = document.createElement('p');
  ingredientsContainer.innerHTML = "<span>Ingredients:</span> " + item.ingrediente;
  itemContainer.appendChild(ingredientsContainer);

  let ingredientsRecipe = document.createElement('p');
  ingredientsRecipe.innerHTML = "<span>Reteta:</span> " + item.reteta;
  itemContainer.appendChild(ingredientsRecipe);
}

function goBackHome() {
  window.location.href = "../index.html";
}