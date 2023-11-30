function toggleIngredients() {
    var ingredientsList = document.getElementById("ingredientsList");
    ingredientsList.style.display = (ingredientsList.style.display === 'none' || ingredientsList.style.display === '') ? 'block' : 'none';
}

function toggleRecipe() {
    var recipe = document.getElementById("recipe");
    recipe.style.display = (recipe.style.display === 'none' || recipe.style.display === '') ? 'block' : 'none';
}

function openTutorial() {
    var mealTitle = document.querySelector(".dish-title").textContent;
    var youtubeLink = `https://www.youtube.com/results?search_query=${mealTitle} recipe tutorial`;
    window.open(youtubeLink, '_blank');
}

function getRandomMeal() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const mealContainer = document.getElementById('meal-container');
            const meal = data.meals[0];

            // Build HTML to display meal details
            const html = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="dish-image">
                <h1 class="dish-title">${meal.strMeal}</h1>
                <button class="ingredients-button" onclick="toggleIngredients()">Show Ingredients</button>
                <ul class="ingredients-list hidden" id="ingredientsList">
                    ${generateIngredientsList(meal)}
                </ul>
                <button class="recipe-button" onclick="toggleRecipe()">View Recipe</button>
                <div class="hidden" id="recipe">${meal.strInstructions}</div>
                <button class="youtube-link" onclick="openTutorial()">Watch Tutorial</button>
            `;

            mealContainer.innerHTML = html;
        })
        .catch(error => console.error('Error fetching data:', error));
}

function generateIngredientsList(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredients.push(`<li>${measure} ${ingredient}</li>`);
        }
    }
    return ingredients.join('');
}

// Call getRandomMeal after the initial HTML has loaded
window.onload = getRandomMeal;

