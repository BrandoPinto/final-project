export const renderCategories = (categories, container) => {
    container.innerHTML = "";
    categories.forEach((category) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "category";
        categoryDiv.innerHTML = `
            <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
            <p>${category.strCategory}</p>
        `;
        categoryDiv.addEventListener("click", () => {
            const event = new CustomEvent("categorySelected", { detail: category.strCategory });
            document.dispatchEvent(event);
        });
        container.appendChild(categoryDiv);
    });
};

export const renderRecipeDetails = (recipe, container) => {
    container.innerHTML = `
        <h3>${recipe.strMeal}</h3>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <p><strong>Category:</strong> ${recipe.strCategory}</p>
        <p><strong>Instructions:</strong> ${recipe.strInstructions}</p>
        <ul>
            ${Object.keys(recipe)
                .filter((key) => key.startsWith("strIngredient") && recipe[key])
                .map((key) => `<li>${recipe[key]}</li>`)
                .join("")}
        </ul>
    `;
};

export const renderRandomRecipe = (recipe, container) => {
    renderRecipeDetails(recipe, container);
};
