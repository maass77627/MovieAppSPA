console.log("SCRIPT IS WORKING");

class Character {
  constructor(character) {
    this.name = character.fullName;
    this.nickname = character.nickname;
    this.house = character.hogwartsHouse;
    this.birthdate = character.birthdate;
    this.children = character.children;
    this.image = character.image;
    this.actor = character.interpretedBy;
  }

  getDisplayName() {
    return this.nickname
      ? `${this.name} "${this.nickname}"`
      : this.name;
  }

//   isHouse(house) {
//     return this.house === house;
//   }
}

document.addEventListener("DOMContentLoaded", () => {

let characterContainer = document.getElementById(("charContainer"))
    let characters, spells, houses, books
    let likedCharacters = JSON.parse(localStorage.getItem("liked")) || []
    let likedContainer = document.getElementById("liked-container")
    

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

       characters = json.map((char) => {
        return new Character(char)
       })

    // characters = json
      characters.forEach((char) => {
       loadCharacterCards(char)
      })
      })
    

      fetch("https://potterapi-fedeperin.vercel.app/en/spells")
  .then((res) => res.json())
  .then((spells) => {
    console.log(spells);
    spells = json
    spells.forEach((spell) => {
     loadSpells(spell)
    })
    
  });

  fetch("https://potterapi-fedeperin.vercel.app/en/houses")
  .then((res) => res.json())
  .then((json) => {
    houses = json;
    console.log(houses);
  });

  fetch("https://potterapi-fedeperin.vercel.app/en/books")
  .then((res) => res.json())
  .then((json) => {
    books = json;
    console.log(books);
  });



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
house.innerText = character.house
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
    let button = document.createElement("button")
    button.addEventListener("click", () => {
        console.log("deleting")
       likedCharacters = likedCharacters.filter((char) => char.id !== character.id)
       localStorage.setItem("liked", JSON.stringify(likedCharacters))
       card.remove()
       likedCharacters.forEach((char) => loadLikedCharacters(char))
      
    })
    button.innerText = "delete"
    let p = document.createElement("p")
    let image = document.createElement("img")
   image.className = "chartwo-image"
   image.src = character.image
    p.innerText = character.nickname
    card.appendChild(button)
    card.appendChild(image)
    card.appendChild(p)
    likedContainer.appendChild(card)

}

function loadSpells(spell) {


}



})