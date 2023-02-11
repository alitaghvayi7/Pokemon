const pokemonContainer = document.querySelector('.pokemon-container');
const loading = document.querySelector('.loading');
const searchInput = document.querySelector('.search-input');

let pokemons = [];
let fetchData = true;


window.addEventListener('load', async () => {
    
    await getPokemonsFromApi();

    const divs = pokemons.map((poke) => {
        return generatePokemons(poke.imageUrl, poke.name);
    });

    hiddenLoading();

    divs.forEach((div) => {
        pokemonContainer.append(div);
    });
});

searchInput.addEventListener('input', filteringPokemons);

async function getPokemonsFromApi() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
    const result = await response.json();

    result.results.forEach((pokeItem, index) => {
        const url = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index + 1}.svg`;
        pokemons.push({ ...pokeItem, imageUrl: url });
    });
}

function filteringPokemons(event) {
    pokemonContainer.textContent = "";

    const newResults = pokemons.filter((pokemon) => {
        return pokemon.name.includes(event.target.value);
    });

    if(!newResults.length){
        pokemonContainer.textContent = "No Item To Show ";
        return
    }

    const divs = newResults.map((poke) => {
        return generatePokemons(poke.imageUrl, poke.name);
    });

    divs.forEach((div) => {
        pokemonContainer.append(div);
    });

}


function showLoading() {
    loading.style.display = 'flex'
}

function hiddenLoading() {
    loading.style.display = 'none'
}

function generatePokemons(imageUrl, name) {
    const pokemonItem = document.createElement('div');
    pokemonItem.className = 'pokemon-item';

    const imagePokemonContainer = document.createElement('div');
    imagePokemonContainer.className = 'image-item-container';

    const image = document.createElement('img');
    image.setAttribute('src', imageUrl);

    imagePokemonContainer.append(image);

    const nameEl = document.createElement('h1');
    nameEl.className = 'pokemon-name';
    nameEl.textContent = name;

    pokemonItem.append(imagePokemonContainer);
    pokemonItem.append(nameEl);
    return pokemonItem;
}
