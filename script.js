console.log("SCRIPT IS WORKING");




class Timer {
  constructor(seconds, timerDiv) {
    this.seconds = seconds;
    this.timerDiv = timerDiv
    this.interval = null;
  }

  start() {
    this.interval = setInterval(() => {
      this.seconds--;
      this.timerDiv.innerText = this.seconds
        
      console.log(this.seconds);

      if (this.seconds <= 0) {
        this.stop();
        console.log("Time's up!");
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }
}



class PointClass {
  constructor(name) {
    this.points = points
    this.name = name

  }


  addPoints(amount) {
    this.points += amount;
    this.save()
  }

  removePoints(amount) {
    this.points -= amount;
    this.save()
  }

 


}

class Character extends PointClass {
  static all = []
  constructor(character) {
    super(character.fullName)
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

  Character.all.push(this)
  
    
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

  static highestScore() {
  let newcharacter = Character.all.reduce((highest, character) => {
    return character.points > highest.points ? character : highest;
  });

  return newcharacter.name;
}

  
}


class House extends PointClass {
  static all = []
 

  constructor(house) {
    super(house.house)
    this.emoji = house.emoji;
    let data = localStorage.getItem(`house-${this.name}`)
    if (data) {
      let newdata = JSON.parse(data)
      this.points = newdata.points
    } else {
      this.points = 0;
    }
    
    House.all.push(this)
  }


  save() {
    localStorage.setItem(`house-${this.name}`, JSON.stringify({
        points: this.points,

    }))
  }

static highestScore() {
  let newhouse = House.all.reduce((highest, house) => {
    return house.points > highest.points ? house : highest;
  });

  return newhouse.name;
}
 
}



document.addEventListener("DOMContentLoaded", () => {     
    let characterContainer = document.getElementById(("charContainer"))
    let spellsContainer = document.getElementById(("spell-container"))
    let bookContainer = document.getElementById(("book-container"))
    let houseContainer = document.getElementById(("house-container"))
    let timerDiv = document.getElementById("timer")
    let houseStanding = document.getElementById("house-standing")
    let pointLeader = document.getElementById("point-leader")
    let bookwrap = document.getElementById("book-wrap")
    let characterSelect = document.getElementById("character-select")
    let timerWrap = document.getElementById("timer-div")
    let houseCount = document.getElementById("house-count")
    
    let characterCount = document.getElementById("character-count")
    
    let selectedCharacter
    let assignment
      const timer = new Timer(60, timerDiv);
      const stopButton = document.createElement("button")
      stopButton.innerText = "stop"
      const startButton = document.createElement("button")
       startButton.innerText = "start"
       startButton.addEventListener("click", () => timer.start())
        stopButton.addEventListener("click", () => timer.stop())
       timerWrap.appendChild(startButton)
       timerWrap.appendChild(stopButton)

       timer.stop()
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
       characterCount.innerText = Character.all.length;
    
      characters.forEach((char) => {
       loadCharacterCards(char)
       loadCharacterSelect(char)
       
      })
      console.log("Character.all:", Character.all)
      console.log("characters:", characters)
      loadPointLeaders()
     
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
    houseCount.innerText = House.all.length;
    console.log(houses);
    houses.forEach((house) => {
     
      loadHouseStanding(house)
    })
    
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
 
  console.log(select.value)
  house.innerText = select.value
  character.changeHouse(select.value)
  loadCharacterCards(character)
})

houses?.forEach((house) => {
  
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
localStorage.setItem(`character-${this.name}`)
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

let image = document.createElement("img")
image.className = "book-image"
image.src = book.cover
bookwrap.appendChild(image)

}

function loadCharacterSelect(char) {
  let option = document.createElement("option")
  option.innerText = char.name
  characterSelect.appendChild(option)
}

function loadPointLeaders() {
  let label = document.createElement("label")
  label.innerText =  "Student:"
   let labeltwo = document.createElement("label")
   labeltwo.innerText =  "House:"
  let hp = document.createElement("p")
  hp.innerText =  Character.highestScore()
  let ptwo = document.createElement("p")
  ptwo.innerText = House.highestScore()
  pointLeader.appendChild(label)
 pointLeader.appendChild(hp)
 pointLeader.appendChild(labeltwo)
 pointLeader.appendChild(ptwo)
}

})