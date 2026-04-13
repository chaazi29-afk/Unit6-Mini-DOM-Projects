const input = document.querySelector("#username-input")
const searchBtn = document.querySelector("#search-btn")
const profileCard = document.querySelector("#profile-card")
const errorMsg = document.querySelector("#error-msg")

const fetchUser = async () => {
    const username = input.value.trim()
    if(!username) return // Don't fetch if input is empty

    //Show loading state
    errorMsg.classList.add("hidden")
    profileCard.innerHTML = "🔄️ Loading..."
    profileCard.classList.remove("hidden")

    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json()
    // console.log(data)
    //if there is an error with response
    if(response.status === 404){
        errorMsg.classList.remove("hidden")
        errorMsg.textContent = `❌ User "${username}" not found!`
        return
    }
    renderProfile(data)
}

searchBtn.addEventListener('click', fetchUser)
input.addEventListener("keydown", (e) => {
    if(e.key === "Enter") fetchUser()
})

function renderProfile(data){
    profileCard.classList.remove("hidden")
    profileCard.innerHTML = `
    <img src="${data.avatar_url}" class="avatar" />
    `
}

