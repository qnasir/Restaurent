let modal = document.getElementById("myModal");
let modalTitle = document.getElementById("modalTitle");
let ingredientsList = document.getElementById("ingredientsList");
let closeModal = document.getElementsByClassName("close")[0];
let recipe = document.getElementById("recipe")

function showIngredients(event) {
  let mealId = event;
  console.log("mealId: ", mealId);

  getMealDetails(mealId);
}

console.log("recipe: ", recipe);
async function getMealDetails(mealId) {
  try {
    let response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`
    );
    let dataRes = await response.data;
    let mealDetails = dataRes.meals;
    console.log("mealDetails: ", mealDetails);

    modalTitle.innerText = mealDetails[0].strMeal;
    ingredientsList.innerHTML = createIngredientsList(mealDetails);
    recipe.innerText = getRecipe(mealDetails)

    // Show the modal
    modal.style.display = "block";
  } catch (err) {
    console.error("Error fetching meal details:", err);
  }
}


function createIngredientsList(mealDetails) {
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    // Check if the ingredient exists and is not an empty string
    if (mealDetails[0][`strIngredient${i}`] && mealDetails[0][`strIngredient${i}`].trim() !== "") {
      ingredients.push(
        `<li>${mealDetails[0][`strMeasure${i}`]} ${mealDetails[0][`strIngredient${i}`]}</li>`
      );
    }
  } 
  return ingredients.join("");
}

function getRecipe(mealDetails){
  return mealDetails[0].strInstructions
  // console.log(mealDetails[0].strInstructions);
}

closeModal.onclick = function () {
  modal.style.display = "none";
};


window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};