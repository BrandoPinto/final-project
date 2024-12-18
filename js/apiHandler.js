// Función para buscar recetas por ingrediente
export async function searchByIngredient(ingredient) {
    if (!ingredient) {
        throw new Error('No ingredient provided');
    }

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        return data.meals;
    } catch (error) {
        console.error('Error fetching recipes by ingredient:', error);
        throw error;
    }
}

// Función para buscar recetas por nombre de comida
export async function searchByMealName(mealName) {
    if (!mealName) {
        throw new Error('No meal name provided');
    }

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
        const data = await response.json();
        return data.meals;
    } catch (error) {
        console.error('Error fetching recipes by meal name:', error);
        throw error;
    }
}
