// SEARCH RESULT MEAL
let searchValue = document.getElementById("searchInput");

const resultContainer = document.getElementById("meals")

searchValue.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    fetchMeals();
    navigator()
  }
});

function navigator() {
    let resultDiv = document.getElementById("meals");
    resultDiv.scrollIntoView({ behavior: "smooth" });
  }

function fetchMeals() {
    const searchInput = document.getElementById('searchInput').value;
    const result = document.querySelector(".result");
    result.style.display = "block";

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInput}`;

    // Clear previous results
    document.getElementById('meals').innerHTML = '';

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const mealsContainer = document.getElementById('meals');

            // Iterate through each meal and create a card
            data.meals.forEach(meal => {
                mealsContainer.innerHTML += `
                    <div class="meal-card">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image">
                        <h1 class="youtubeteach">${meal.strMeal}</p>
                        <button class="ingredients-button" onclick="Ingredients('${meal.idMeal}')">Show Ingredients</button>
                        <button class="recipe-button" onclick="Recipe('${meal.idMeal}')">View Recipe</button>
                        <button class="youtube-link" onclick="Tutorial()">Watch Tutorial</button>
                    </div>
                `;

                
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// FETCH INGRIDIENTS
function Ingredients(mealId) {
    const ingredientsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    // Fetch ingredients data from the API
    fetch(ingredientsUrl)
        .then(response => response.json())
        .then(data => {
            const ingredientsContent = document.getElementById('getIngridient');
            ingredientsContent.innerHTML = '';

            // Display ingredients in the modal
            const ingredients = data.meals[0];
            for (let i = 1; i <= 20; i++) {
                const ingredient = ingredients[`strIngredient${i}`];
                const measure = ingredients[`strMeasure${i}`];

                if (ingredient && measure) {
                    ingredientsContent.innerHTML += `<p>${measure} ${ingredient}</p>`;
                }
            }

            // Show the modal
            document.getElementById('ingredientsModal').style.display = 'flex';
        })
        .catch(error => console.error('Error fetching ingredients:', error));
}


// FETCH RECIPIE
function Recipe(mealId) {
    const recipieUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    // Fetch recipe data from the API
    fetch(recipieUrl)
        .then(response => response.json())
        .then(data => {
            const recipieContent = document.getElementById('getRecipie');
            recipieContent.innerHTML = '';

            // Display instructions in the modal
            const recipies = data.meals[0];
            const instructions = recipies.strInstructions;
            recipieContent.innerHTML = `<p>${instructions}</p>`;

            // Show the modal
            document.getElementById('recipieModal').style.display = 'flex';
        })
        .catch(error => console.error('Error fetching recipe:', error));
}

// Function to close the recipe modal
function closeModal() {
    document.getElementById('recipieModal').style.display = 'none';
    document.getElementById('ingredientsModal').style.display = 'none';
}

function Tutorial() {
    var youtubeteach = document.querySelector(".youtubeteach").textContent;
    var youtubeLink = `https://www.youtube.com/results?search_query=${youtubeteach} recipe tutorial`;
    window.open(youtubeLink, '_blank');
}