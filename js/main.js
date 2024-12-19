// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", () => {
    const ingredientSearchInput = document.getElementById("ingredient-search");
    const ingredientSearchBtn = document.getElementById("ingredient-search-btn");
    const mealSearchInput = document.getElementById("meal-search");
    const mealSearchBtn = document.getElementById("meal-search-btn");
    const searchResults = document.getElementById("search-results");

    // Modal elements
    const modal = document.getElementById("recipe-modal");
    const closeBtn = document.getElementsByClassName("close")[0];
    const modalTitle = document.getElementById("modal-title");
    const modalInstructions = document.getElementById("modal-instructions");

    
    function openModal(title, instructions) {
        modalTitle.textContent = title;
        modalInstructions.innerHTML = instructions;  
        modal.style.display = "block";
    }

 
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }


    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Search by Ingredient
    ingredientSearchBtn.addEventListener("click", async () => {
        const ingredient = ingredientSearchInput.value.trim();
        if (!ingredient) {
            alert("Please enter an ingredient to search!");
            return;
        }
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
            const data = await response.json();
            displayResults(data.meals, `Results for ingredient: ${ingredient}`, false); 
        } catch (error) {
            console.error("Error fetching recipes by ingredient:", error);
            searchResults.innerHTML = `<p style="color: red;">No recipes found for ingredient: ${ingredient}</p>`;
        }
    });

    // Search by Meal Name
    mealSearchBtn.addEventListener("click", async () => {
        const mealName = mealSearchInput.value.trim();
        if (!mealName) {
            alert("Please enter a meal name to search!");
            return;
        }
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
            const data = await response.json();
            displayResults(data.meals, `Results for meal: ${mealName}`, true); 
        } catch (error) {
            console.error("Error fetching recipes by meal name:", error);
            searchResults.innerHTML = `<p style="color: red;">No recipes found for meal: ${mealName}</p>`;
        }
    });

    // Display Results
    function displayResults(meals, title, showRecipeButton) {
        if (!meals) {
            searchResults.innerHTML = `<p style="color: red;">No results found.</p>`;
            return;
        }

        searchResults.innerHTML = `<h3>${title}</h3>`;
        meals.forEach(meal => {
            const mealItem = document.createElement('div');
            mealItem.classList.add('meal-item');
            mealItem.innerHTML = `
                <h4>${meal.strMeal}</h4>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="max-width: 150px; border-radius: 10px;">
                ${showRecipeButton ? '<button class="view-recipe-btn">View Recipe</button>' : ''}
            `;

            // Event listener for opening modal (only if button is present)
            if (showRecipeButton) {
                mealItem.querySelector('.view-recipe-btn').addEventListener('click', function() {
                    openModal(meal.strMeal, meal.strInstructions);  
                });
            }

            searchResults.appendChild(mealItem);
        });
    }
});
