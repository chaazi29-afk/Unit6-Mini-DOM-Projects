let searchTimer
const input = document.querySelector("#search-input");
const results = document.querySelector("#results");
const Status = document.querySelector("#status");
const renderRecipes = (meals) => {
    results.innerHTML = "";
    meals.forEach((meal) => {
        let ingredients = []
        for (let i = 1; i <= 20; i++) {
            const ing = meal[`strIngredient${i}`]; const measure = meal[`strMeasure${i}`];
            if (ing && ing.trim() !== "") {
                ingredients.push(`${measure.trim()} ${ing.trim()}`);
            }
        }
        const card = document.createElement("div");
        card.classList.add("recipe-card");
        card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <h2>${meal.strMeal}</h2> <p class="meta">🌍 ${meal.strArea} • 🍴 ${meal.strCategory}</p>
        <div class="details">
            <h3>Ingredients</h3> <ul>${ingredients.map(i => `<li>• ${i}</li>`).join("")}</ul>
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
        </div>
        `;
        card.addEventListener("click", () => {
            card.classList.toggle("expanded");
        });
        results.appendChild(card);
    });
};
const fetchRecipes = async (query) => {
    Status.textContent = "Loading... 🔄️";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.meals === null) {
        results.innerHTML = "";
        Status.textContent = `❌ No recipes found for "${query}"`;
        return;
    }
    Status.textContent = `✅ Found ${data.meals.length} recipes`
    renderRecipes(data.meals) // CHANGED from console.log
};
input.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    clearTimeout(searchTimer); // cancel old timer
    if (query === "") return;
    searchTimer = setTimeout(() => { // start new 500ms timer
        fetchRecipes(query); }, 500);
});

