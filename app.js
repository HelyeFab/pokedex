// DOM Objects
const mainScreen = document.querySelector(".main-screen");
const pokeName = document.querySelector(".poke-name");
const pokeId = document.querySelector(".poke-id");
const pokeFrontImage = document.querySelector(".poke-front-image");
const pokeBackImage = document.querySelector(".poke-back-image");
const pokeTypeOne = document.querySelector(".poke-type-one");
const pokeTypeTwo = document.querySelector(".poke-type-two");
const pokeWeight = document.querySelector(".poke-weight");
const pokeHeight = document.querySelector(".poke-height");
const dPadRight = document.querySelector(".d-pad__cell.right");
const dPadLeft = document.querySelector(".d-pad__cell.left");
const listItems = document.querySelectorAll(".list-item");
const leftBtn = document.querySelector(".left-button");
const rightBtn = document.querySelector(".right-button");




const TYPES = [
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy"
];

let prevUrl = null;
let nextUrl = null;
// !Functions 
const capitalise = (str) => str[0].toUpperCase() + str.substring(1);




const resetScreen = () => {
  mainScreen.classList.remove("hide");
  for (const type of TYPES) {
    mainScreen.classList.remove(type);
  }
};

const fetchPokeList = url => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const { results, previous, next } = data;
      prevUrl = previous;
      nextUrl = next;

      for (let i = 0; i < listItems.length; i++) {
        const listItem = listItems[i];
        const resultData = results[i];

        if (resultData) {
          const { name, url } = resultData;
          const urlArray = url.split("/");

          const id = urlArray[urlArray.length - 2];

          listItem.textContent = `${id}. ${capitalise(name)} `;
        } else {
          listItem.textContent = "";
        }
      }
    });
}


const fetchPokemonSelected = targetedPokemonId => {

  fetch(`https://pokeapi.co/api/v2/pokemon/${targetedPokemonId}`)
    .then((res) => res.json())
    .then((data) => {
      resetScreen();

      pokeName.textContent = capitalise(data["name"]);
      pokeId.textContent = "#" + data["id"].toString().padStart(3, "0");
      pokeWeight.textContent = data["weight"];
      pokeHeight.textContent = data["height"];
      const dataTypes = data["types"];
      const dataFirstType = dataTypes[0];
      const dataSecondType = dataTypes[1];
      pokeTypeOne.textContent = capitalise(dataFirstType["type"]["name"]);
      if (dataSecondType) {
        pokeTypeTwo.classList.remove("hide");
        pokeTypeTwo.textContent = capitalise(dataSecondType["type"]["name"]);
      } else {
        pokeTypeTwo.classList.add("hide");
        pokeTypeTwo.textContent = "";
      }
      pokeFrontImage.src = data["sprites"]["front_default"] || "";
      pokeBackImage.src = data["sprites"]["back_default"] || "";
      mainScreen.classList.add(dataFirstType["type"]["name"]);
    });
};

const handleRightBtnClick = () => {
  if (nextUrl) {
    fetchPokeList(nextUrl);
    
  }
};

const handleLeftBtnClick = () => {
  if (prevUrl) {
    fetchPokeList(prevUrl);
  }
};

const handleListItemClick = (e) => {
  if (!e.target) return
  
  const targetedPokemon = e.target;
  
  if (!targetedPokemon.textContent) return 
  const targetedPokemonId = targetedPokemon.textContent.split('.')[0];
  fetchPokemonSelected(targetedPokemonId);

  ;

};

// let counter = 0;
// dPadRight.addEventListener("click", () => {
//   counter++;
//   fetch(`https://pokeapi.co/api/v2/pokemon/${counter}`)
//     .then((res) => res.json())
//     .then((data) => {
//       resetScreen();

//       pokeName.textContent = capitalise(data["name"]);
//       pokeId.textContent = "#" + data["id"].toString().padStart(3, "0");
//       pokeWeight.textContent = data["weight"];
//       pokeHeight.textContent = data["height"];
//       const dataTypes = data["types"];
//       const dataFirstType = dataTypes[0];
//       const dataSecondType = dataTypes[1];
//       pokeTypeOne.textContent = capitalise(dataFirstType["type"]["name"]);
//       if (dataSecondType) {
//         pokeTypeTwo.classList.remove("hide");
//         pokeTypeTwo.textContent = capitalise(dataSecondType["type"]["name"]);
//       } else {
//         pokeTypeTwo.classList.add("hide");
//         pokeTypeTwo.textContent = "";
//       }
//       pokeFrontImage.src = data["sprites"]["front_default"] || "";
//       pokeBackImage.src = data["sprites"]["back_default"] || "";
//       mainScreen.classList.add(dataFirstType["type"]["name"]);
//     });

// });



// dPadLeft.addEventListener('click', () => {
//   counter--;
//   if (counter === 0) {
//     return
//   } else {
//      fetch(`https://pokeapi.co/api/v2/pokemon/${counter}`)
//        .then((res) => res.json())
//        .then((data) => {
//          resetScreen();

//          pokeName.textContent = capitalise(data["name"]);
//          pokeId.textContent = "#" + data["id"].toString().padStart(3, "0");
//          pokeWeight.textContent = data["weight"];
//          pokeHeight.textContent = data["height"];
//          const dataTypes = data["types"];
//          const dataFirstType = dataTypes[0];
//          const dataSecondType = dataTypes[1];
//          pokeTypeOne.textContent = capitalise(dataFirstType["type"]["name"]);
//          if (dataSecondType) {
//            pokeTypeTwo.classList.remove("hide");
//            pokeTypeTwo.textContent = capitalise(dataSecondType["type"]["name"]);
//          } else {
//            pokeTypeTwo.classList.add("hide");
//            pokeTypeTwo.textContent = "";
//          }
//          pokeFrontImage.src = data["sprites"]["front_default"] || "";
//          pokeBackImage.src = data["sprites"]["back_default"] || "";
//          mainScreen.classList.add(dataFirstType["type"]["name"]);
//        });

//   }
 

// })

// get data for right side of screen
// from function fetchPokeList




leftBtn.addEventListener("click", handleLeftBtnClick);
rightBtn.addEventListener("click", handleRightBtnClick);
for (const listItem of listItems) {
  
  listItem.addEventListener('click', handleListItemClick);
}

// Initialise app
fetchPokeList("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");