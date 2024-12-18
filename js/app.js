import { fetchCategories, fetchRecipesByCategory, fetchRecipeDetails, fetchRandomRecipe } from "./apiHandler.js";
import { renderCategories, renderRecipeDetails, renderRandomRecipe } from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
    const categoriesContainer = document.getElementById("categories-container");
    const recipeContent = document.getElementById("recipe-content");
    const randomRecipeContent = document.getElementById("random-recipe-content");
    const randomRecipeBtn = document.getElementById("random-recipe-btn");

    // Load categories on page load
    const categories = await fetchCategories();
    renderCategories(categories, categoriesContainer);

    // Handle category selection
    document.addEventListener("categorySelected", async (event) => {
        const recipes = await fetchRecipesByCategory(event.detail);
        renderCategories(recipes, categoriesContainer); // Replace categories with recipes for simplicity
    });

    // Handle random recipe button
    randomRecipeBtn.addEventListener("click", async () => {
        const randomRecipe = await fetchRandomRecipe();
        renderRandomRecipe(randomRecipe, randomRecipeContent);
    });
});
