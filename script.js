console.log("SCRIPT IS WORKING");

class Character {
  constructor(character) {
    this.name = character.fullName;
    this.nickname = character.nickname;
    this.house = character.hogwartsHouse;
    this.image = character.image;

    const savedData = localStorage.getItem(`character-${this.name}`)

  if (savedData) {
    const data = JSON.parse(savedData)
    this.points = data.points
    this.assignments = data.assignments
    this.house = data.house
  } else {
    this.points = 0
    this.assignments = []
  }
    
  }

  addPoints(amount) {
    this.points += amount;
    this.save()
  }

  removePoints(amount) {
    this.points -= amount;
    this.save()
  }

  changeHouse(house) {
    this.house = house;
    this.save()
  }

  addAssignment(spell) {
    this.assignments.push(spell)
    this.save()
  }

  save() {
     localStorage.setItem(`character-${this.name}`, JSON.stringify({
        points: this.points,
        assignments: this.assignments,
        house: this.house
      })
    );
  }

  
}


class House {
  constructor(house) {
    this.name = house.house;
    this.emoji = house.emoji;
    this.points = 0;
  }

  addPoints(amount) {
    this.points += amount;
  }

  removePoints(amount) {
    this.points -= amount;
  }
}



document.addEventListener("DOMContentLoaded", () => {     
    let characterContainer = document.getElementById(("charContainer"))
    let spellsContainer = document.getElementById(("spell-container"))
    let bookContainer = document.getElementById(("book-container"))
    let houseContainer = document.getElementById(("house-container"))
   
    let houseStanding = document.getElementById("house-standing")
    let bookwrap = document.getElementById("book-wrap")
    let characterSelect = document.getElementById("character-select")
    let selectedCharacter
    let assignment

    characterSelect.addEventListener("change", () => {
      console.log(characterSelect.value)
      selectedCharacter = characterSelect.value
    })
     
    let characters, spells, houses, books
    

    let spellbutton = document.getElementById("spell-button")
    spellbutton.addEventListener("click", () => {
             console.log("adding assignment")
             console.log(assignment)
             let character = characters.find((char) => char.name === selectedCharacter)
             character.addAssignment(assignment)
             loadCharacterCards(character)
             
    })

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

    
      characters.forEach((char) => {
       loadCharacterCards(char)
       loadCharacterSelect(char)
      })
      })
    

      fetch("https://potterapi-fedeperin.vercel.app/en/spells")
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
    spells = json
    spells.slice(0, 9).forEach((spell) => {
     loadSpells(spell)
    })
    
  });

  fetch("https://potterapi-fedeperin.vercel.app/en/houses")
  .then((res) => res.json())
  .then((json) => {

    houses = json.map((house) => {
      return new House(house)
    })
    // houses = json;
    console.log(houses);
    houses.forEach((house) => {
      // loadHouses(house)
      loadHouseStanding(house)
    })
    // loadHouses(house)
  });

  fetch("https://potterapi-fedeperin.vercel.app/en/books")
  .then((res) => res.json())
  .then((json) => {
    books = json;
    console.log(books);
    books.slice(0,6).forEach((book) => {
        loadBooksContainer(book)
    })
    
  });



function loadCharacterCards(character) {

console.log(character)

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

    let ptwo = document.createElement("p")
    ptwo.innerText = character.points
    console.log(character.assignments)
    let pthree = document.createElement("p")
    pthree.innerText = character.assignments.join(", ")

    let label = document.createElement("label")
    label.innerText = "Assignments:"
    let buttontwo = document.createElement("button")
    buttontwo.innerText = "+ 1 point"
    buttontwo.addEventListener("click", () => {
    character.addPoints(1)
    ptwo.innerText = character.points
    console.log(character)
})

 let buttonthree = document.createElement("button")
buttonthree.innerText = "- 1 point"
buttonthree.addEventListener("click", () => {
character.removePoints(1)
ptwo.innerText = character.points
console.log(character)

})

let select = document.createElement("select")
select.className = "select hidden"
select.addEventListener("change", () => {
  // select.classList.add("hidden")
  console.log(select.value)
  house.innerText = select.value
  character.changeHouse(select.value)
  loadCharacterCards(character)
})

houses?.forEach((house) => {
  // select.classList.remove("hidden")
    let option = document.createElement("option")
    option.innerText = house.name
    select.appendChild(option)
})


 let buttonfour = document.createElement("button")
 buttonfour.addEventListener("click", () => {
  if (select.classList.contains("hidden")) {
   select.classList.remove("hidden")
  } else {
    select.classList.add("hidden")
  }
 })
buttonfour.innerText = "change house"



   div.appendChild(button)
   div.appendChild(h1)
   div.appendChild(p)
   div.appendChild(image)
   div.appendChild(house)
   div.appendChild(ptwo)
   div.appendChild(p)
   div.appendChild(label)
   div.appendChild(pthree)
   div.appendChild(buttonthree)
   div.appendChild(buttontwo)
   div.appendChild(buttonfour)
   div.appendChild(select)

    characterContainer.appendChild(div)
    

}




function loadSpells(spell) {
console.log(spell)
 let spellsdiv = document.getElementById("spells")
let button = document.createElement("button")

button.className = "spell-button"


button.innerText = `${spell.spell} \n\n ${spell.use}`


    button.addEventListener("click", () => {
      console.log(button.innerText)
      if (button.style.background === "green") {
         button.style.background = "navy"
      } else {
        button.style.background = "green"
        assignment = spell.spell
      }
      
     })


      

spellsdiv.appendChild(button)


}


// function loadHouses(house) {
// let housecard = document.createElement("div")
// housecard.className = "house-card"
// let h1 = document.createElement("h5")
// h1.innerText = house.house
// let emoji = document.createElement("p")
// emoji.innerText = house.emoji

// let button = document.createElement("button")
// // housecard.appendChild(p)
// housecard.appendChild(h1)
// housecard.appendChild(emoji)
// houseContainer.appendChild(housecard)



// }

function loadHouseStanding(house) {
    let card
     console.log(house)
     switch(house.name){
        case "Gryffindor": 
        card = document.getElementById("griff")
        break
        case "Hufflepuff": 
         card = document.getElementById("huff")
        break
        case "Ravenclaw": 
         card = document.getElementById("rav")
        break
        case "Slytherin": 
         card = document.getElementById("slyth")
        break
     }
    
     let h1 = document.createElement("h1")
console.log(house.points)
h1.innerText = house.points

 let h2 = document.createElement("h2")
h2.innerText = "points"

let button = document.createElement("button")
button.className = "add-btn"
button.innerText = "+ 1 point"

button.addEventListener("click", () => {
house.addPoints(1)
h1.innerText = house.points

})

let buttontwo = document.createElement("button")
buttontwo.innerText = "- 1 point"

buttontwo.addEventListener("click", () => {
house.removePoints(1)
h1.innerText = house.points

})
buttontwo.className = "minus-btn"
card.appendChild(h2)
card.appendChild(h1)
card.appendChild(button)
card.appendChild(buttontwo)


}



function loadBooksContainer(book) {
console.log(book)
// let div = document.createElement("div")
// div.className = "book-wrap"
let image = document.createElement("img")
image.className = "book-image"
image.src = book.cover
bookwrap.appendChild(image)
// bookContainer.appendChild(div)
}

function loadCharacterSelect(char) {
  let option = document.createElement("option")
  option.innerText = char.name
  characterSelect.appendChild(option)
}

})