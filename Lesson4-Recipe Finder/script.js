let searchTimer
const input = document.querySelector("#search-input");
const results = document.querySelector("#results");
const Status = document.querySelector("#status");
const fetchRecipes = async (query) => {
    Status.textContent = "Loading... 🔄️";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.meals === null)
    console.log(data) // to see data on console
};
input.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    clearTimeout(searchTimer); // cancel old timer
    if (!query) return;
    searchTimer = setTimeout(() => { // start new 500ms timer
        fetchRecipes(query); }, 500);
});

