function toggleRecipe() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
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
            var neededData = []
            neededData.push(meal)
            console.log(neededData)

            // Display instructions in the modal
            const recipies = data.meals[0];
            const instructions = recipies.strInstructions;
            recipieRandomContent.innerHTML = `<p>${instructions}</p>`;

            var ingredients = data.meals[0];
            for (let i = 1; i <= 20; i++) {
                const ingredient = ingredients[`strIngredient${i}`];
                const measure = ingredients[`strMeasure${i}`];

                if (ingredient && measure) {
                    ingredientsRandomContent.innerHTML += `<p>${measure} ${ingredient}</p>`;
                }
            }
            // Build HTML to display meal details
            const html = `
                <img src="${meal.strMealThumb}" alt="${neededData.strMeal}" class="dish-image">
                <h1 class="dish-title">${meal.strMeal}</h1>
                <button class="ingredients-button" onclick="document.getElementById('ingredientsRandomModal').style.display = 'flex'">Show Ingredients</button>
                <button class="recipe-button" onclick="document.getElementById('recipieRandomModal').style.display = 'flex'">View Recipe</button>
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

// Closing the modal
function closeRandomModal() {
    document.getElementById('recipieRandomModal').style.display = 'none';
    document.getElementById('ingredientsRandomModal').style.display = 'none';
}

// Call getRandomMeal after the initial HTML has loaded
window.onload = getRandomMeal;

