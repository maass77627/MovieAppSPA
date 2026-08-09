console.log("SCRIPT IS WORKING");

document.addEventListener("DOMContentLoaded", () => {

let characterContainer = document.getElementById(("charContainer"))
    let characters
    let likedCharacters = []
    let likedContainer = document.getElementById("liked-container")
    // likedCharacters.forEach((char) => {
    //    loadLikedCharacters(char)
    //   })

    let input = document.getElementById("search")
    input.addEventListener("input", () => {
        console.log("change")
        console.log(input.value)
        let value = input.value

        let filtered = characters.filter((char) => char.nickname.toLowerCase().includes(value)  )
        characterContainer.innerHTML = ""
        filtered.forEach((char) => loadCharacterCards(char))
    })


   fetch("https://potterapi-fedeperin.vercel.app/en/characters")
   .then((res) => res.json())
   .then((json) => {console.log(json)

    characters = json
      characters.forEach((char) => {
       loadCharacterCards(char)
      })
      })
    



function loadCharacterCards(character) {

console.log(character.image)

let button = document.createElement("button")
button.innerText = "add like"
button.addEventListener("click", () => {
    console.log("addlike")
    console.log(likedCharacters)
    if (likedCharacters.includes(character)) {
        likedCharacters = likedCharacters
    } else {
         likedCharacters.push(character)
    }

likedContainer.innerHTML = ""
likedCharacters.forEach((char) => {
       loadLikedCharacters(char)
      })
})

let h1 = document.createElement("h1")

h1.innerText = character.nickname
let house = document.createElement("p")
house.innerText = character.hogwartsHouse
    let div = document.createElement("div")
    div.className = "card"
    
    let p = document.createElement("p")
    p.innerText = character.name
   let image = document.createElement("img")
   image.className = "char-image"
   image.src = character.image
   div.appendChild(button)
   div.appendChild(h1)
   div.appendChild(p)
   div.appendChild(image)
   div.appendChild(house)
    div.appendChild(p)

    characterContainer.appendChild(div)

}

function loadLikedCharacters(character) {
    console.log(character)
    console.log("liked container")
    console.log(character.image)
    let card = document.createElement("div")
    card.className = "liked-card"
    let p = document.createElement("p")
    let image = document.createElement("img")
   image.className = "chartwo-image"
   image.src = character.image
    p.innerText = character.name
    card.appendChild(image)
    card.appendChild(p)
    likedContainer.appendChild(card)

}

})