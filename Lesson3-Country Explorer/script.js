// Grab (Select) the elements we need
const input = document.querySelector("#country-input")
const searchBtn = document.querySelector("#search-btn")
const results = document.querySelector("#results")
const errorMsg = document.querySelector("#error-msg")

function renderCountries(countryData) {
    results.innerHTML = ""
}

const fetchCountry = async () => {
    const country = input.value.trim()
    if(!country) return //early terminate if it's empty
    const url = `https://restcountries.com/v3.1/name/${country}`
    const response = await fetch(url)
    const data = await response.json
    // console.log(response)
    // console.log(data)
    renderCountries(data) 
}

searchBtn.addEventListener("click", fetchCountry)
input.addEventListener("keydown", (e) => {
    if(e.key === `Enter`) fetchCountry()
})