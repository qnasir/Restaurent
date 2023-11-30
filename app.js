// Search Result Meal
function generateIngredientsAndRecipe(mealId) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const ingredients = generateIngredientsList(meal);
            const recipe = meal.strInstructions;
            return { ingredients, recipe };
        })
        .catch(error => {
            console.error('Error fetching detailed data:', error);
            return { ingredients: '', recipe: '' }; // Return empty strings if there's an error
        });
}

function searchMeals() {
    const searchInput = document.getElementById('searchInput').value;
    const MealContainer = document.getElementById('MealContainer');
    const result = document.querySelector(".result");
    result.style.display = "block";

    // Clear previous search results
    MealContainer.innerHTML = '';

    // Fetch meals based on the search category
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            console.log("meals: ", meals);

            // Display each meal in the container
            meals.forEach(async meal => {
                const mealCard = document.createElement('div');
                const { ingredients, recipe } = await generateIngredientsAndRecipe(meal.idMeal);

                mealCard.innerHTML = `
                    <div id="mealCard">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="dish-image">
                        <h1 class="dish-title">${meal.strMeal}</h1>
                        <button class="ingredients-button" onclick="toggleIngredients()">Show Ingredients</button>
                        <ul class="ingredients-list hidden" id="ingredientsList">
                            ${ingredients}
                        </ul>
                        <button class="recipe-button" onclick="toggleRecipe()">View Recipe</button>
                        <div class="hidden" id="Recipe">${recipe}</div>
                        <button class="youtube-link" onclick="openTutorial('${meal.strMeal}')">Watch Tutorial</button>
                    </div>
                `;
                MealContainer.appendChild(mealCard);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}