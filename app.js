// POKEDEX PROJECT

//NOTE: These functions run from bottom to top, as running them happens from top to bottom. Ex. The createPokeCard function is executed in the getPokemonData function which is executed in the getPokemon function which is not executed in another function but is executed in the last line of code.

const pokeContainer = document.querySelector(`#container`);
// Using the first 150 Pokemon (AKA Objects) in the PokeAPI
const numOfPokemon = 150;

// The createPokeCard function creates a new card (AKA Section element) and adds the new card to the webpage/document inside of the div with the id of "container"
// NOTE: The value/argument that will be passed in for the "pokemon" parameter will be the response received from an Axios request to the PokeAPI
function createPokeCard(pokemon){
  const pokeCard = document.createElement(`section`); //creates section element
  pokeCard.classList.add(`pokemon`); // adds class to the section element
  pokeContainer.append(pokeCard); // adds a new card to the div with an id of container on the page
  // Setting the innerHTML for the new card using the data/object that is passed into the "pokemon" parameter. Also, using the toUpperCase method on the pokemon name so it will display in UPPERCASE text.
  pokeCard.innerHTML = `
  <div class= "img-container">
    <img src="${pokemon.data.sprites.front_shiny}" alt="${pokemon.data.name}" >
  </div>
  <h3 class ="name">${pokemon.data.name.toUpperCase()}</h3>
  `;
}

// The getPokemonData function makes an Axios GET request to the PokeAPI using a specific pokemon ID/Number then takes the returned data and passes it into the createPokeCard function
// NOTE: The argument/value passed into the "id" parameter will be a number created in the loop in the next function (AKA The getPokemon function)
async function getPokemonData(id){
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`; // creates the API endpoint
  const pokemonData = await axios.get(url); // makes the API request and sets to a variable
  console.log(pokemonData);
  console.log(pokemonData.data.sprites.front_shiny);
  console.log(pokemonData.data.name);
  createPokeCard(pokemonData); // runs the createPokeCard function with the pokemonData as a parameter (the response from making the API request)
}

// The getPokemon function loops through all the pokemon IDs and runs/executes the getPokemonData function for each ID
// NOTE: Using async/await on this function because the code in the getPokemonData function is asynchronous (There is an Axios request in that function)
async function  getPokemon(){
  for(i = 1; i <= numOfPokemon; i++){
    console.log(i);
    await getPokemonData(i); //running the getPokemonData function with the numofPokemon loop results as a parameter which loops through all 150 of the pokemon and lets the pokemon load in order on the page
  }
}
// Running/Executing the getPokemon function which runs/executes the getPokemonData function each time through the loop
getPokemon();