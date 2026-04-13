const jokeEl = document.querySelector('#joke')
const jokeBtn = document.querySelector('#joke-btn')

const buttonTexts = [
    "Get Another 🎲",
    "Tell me more 😄",
    "One more! 😁",
    "Hit me 🙃",
    "Again 🔄️",
    "Why do I do this? 🤦"
]

const fetchJoke = async () => {
    const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {Accept : "application/json"}
    })
    const data = await response.json()
    // console.log(data)
    jokeEl.textContent = data.joke

    //Random button text
    const randomIndex = Math.floor(Math.random() * buttonTexts.length)
    jokeBtn.textContent = buttonTexts[randomIndex]
}

//Test it 
// fetchJoke()

//Wire up the button
jokeBtn.addEventListener('click', fetchJoke)