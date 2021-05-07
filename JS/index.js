// Variables from HTML
const menuDiv = document.getElementById("menu");
let filterInput = document.getElementById('filterInput');
let filterButton = document.getElementById('filterButton');
let message = document.getElementById('message');
let showMenuButton = document.getElementById('showAllItems');

//URLS to fetch
var MENU_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/.json";

//Global variables
let restaurantMenu = [];

// Event listeners
window.addEventListener("load", loadingMenu);
showMenuButton.addEventListener('click', function (event) {
  event.preventDefault();
  loadingMenu();
  showMenuButton.style.display = "none";
});
filterButton.addEventListener('click', getFilteredMenu);


//constructor function for the menu
function Food(element, item) {
  this.image = element.imagine;
  this.name = element.nume;
  this.ingredients = element.ingrediente;
  this.id = item;
}


function loadingMenu() {
  getResource(MENU_SERVER_URL)
    .then(itemsResponse => {
      displayItemsFromMenu(itemsResponse.menu);
    })
    .then(function () {
      renderMenuBody()
    })
    .catch(function (error) {
      console.log("There was a network error", error);
    })
}

function getResource(url) {
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("An error occured while loading the page");
    })
}

function displayItemsFromMenu(food) {
  restaurantMenu = [];
  for (let items in food) {
    if (food !== null) {
      let itemsFromMenu = new Food(food[items], items);
      restaurantMenu.push(itemsFromMenu);
    }
  }
}

function renderMenuBody() {
  menuDiv.innerHTML = "";
  for (let i = 0; i < restaurantMenu.length; i++) {
    createFoodItem(restaurantMenu[i])
  }
}

function createFoodItem(item) {
  let itemContainer = document.createElement('div');
  itemContainer.setAttribute('class', "menuItem");
  itemContainer.setAttribute('id', item.id)
  menuDiv.appendChild(itemContainer);

  let imageContainer = document.createElement('div');
  imageContainer.innerHTML = "<img src='" + item.image + "'>";
  imageContainer.setAttribute('class', "img");
  itemContainer.appendChild(imageContainer);

  let nameContainer = document.createElement('p');
  nameContainer.innerText = "Name: " + item.name;
  nameContainer.classList.add("nameClass");
  itemContainer.appendChild(nameContainer);

  let ingredientsContainer = document.createElement('p');
  ingredientsContainer.innerText = "Ingredients: " + item.ingredients;
  itemContainer.appendChild(ingredientsContainer);

  let detailsButton = document.createElement('button');
  detailsButton.innerText = "Details";
  detailsButton.setAttribute('class', "detailsBtn");
  itemContainer.appendChild(detailsButton);
  detailsButton.addEventListener('click', function (event) {
    event.preventDefault();
    goToDetailsPage(item.id);
  });
}


function goToDetailsPage(idBtn) {
  window.location.href = "HTML/details.html?id=" + idBtn;
}


function getFilteredMenu() {
  checkFormValidity();
  filterMenu(filterInput.value);
  renderMenuBody();
}

function checkFormValidity() {
  if (filterInput.value === "") {
    filterInput.classList.add('invalid');
    setTimeout(() => {
      filterInput.classList.remove('invalid');
    }, 2000);
  } else {
    showButtonForMenu();
    filterInput.classList.add('ok');
    setTimeout(() => {
      filterInput.classList.remove('ok');
    }, 2000);
  }
}

function filterMenu(object) {
  let filteredObject = restaurantMenu.filter(function (menu) {
    return menu.ingredients.includes(object);
  });
  filterInput.value = "";
  displayFilteredMenu(filteredObject);
}


function displayFilteredMenu(filteredObject) {
  restaurantMenu = [];
  if (filteredObject.length !== 0) {
    for (let items in filteredObject) {
      let filteredItemsFromMenu = new FoodFiltered(filteredObject[items], items);
      restaurantMenu.push(filteredItemsFromMenu);
    }
  } else {
    message.classList.add('invalidMessage');
    setTimeout(() => {
      loadingMenu();
      showMenuButton.style.display = "none";
      message.classList.remove('invalidMessage');
    }, 3000);
  }
}

//constructor function for the filetered menu
function FoodFiltered(element, item) {
  this.image = element.image;
  this.name = element.name;
  this.ingredients = element.ingredients;
  this.id = item;
}

function showButtonForMenu() {
  showMenuButton.style.display = "inline-block";
}