const pokedex = document.getElementById('pokedex');
const pokeCache = {};

const fetchPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
  const res = await fetch(url);
  const data = await res.json();
  const pokemon = data.results.map((result, index) => ({
    ...result,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
      1}.png`
  }));

  // USING PROMISES
  //   const promises = [];
  //   for (let i = 1; i <= 50; i += 1) {
  //     const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  //     promises.push(fetch(url).then(res => res.json()));
  //   }
  //   Promise.all(promises).then(results => {
  //     const pokemon = results.map(data => ({
  //       name: data.name,
  //       id: data.id,
  //       image: data.sprites.front_default,
  //       type: data.types.map(type => type.type.name).join(', ')
  //     }));

  displayPokemon(pokemon);
  //   });
};

const displayPokemon = pokemon => {
  const html = pokemon
    .map(
      pok => `
  <li class="card" onclick="selectPokemon(${pok.id})">
    <img class="card-image" src="${pok.image}" />
    <h3 class="card-title">${pok.id}. ${pok.name}</h3>
  </li>
  `
    )
    .join('');

  pokedex.innerHTML = html;
};

const selectPokemon = async id => {
  if (!pokeCache[id]) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pok = await res.json();
    pokeCache[id] = pok;
    console.log(pokeCache);
    displayPopup(pok);
  }
  displayPopup(pokeCache[id]);
};

const displayPopup = pok => {
  const type = pok.types.map(type => type.type.name).join(', ');
  const image = pok.sprites.front_default;
  const html = `
  <div class="popup">
    <button id="closeButton" onclick="closePopup()">Close</button>
      <div class="card" onclick="selectPokemon(${pok.id})">
      <img class="card-image" src="${image}" />
      <h3 class="card-title">${pok.id}. ${pok.name}</h3>
      <p><small>Height: </small>${pok.height} | <small>Weight: </small>${pok.weight} | <small>Type: </small>${type}
    </div>
  </div>
  
  `;
  pokedex.innerHTML = html + pokedex.innerHTML;
  console.log(html);
};

const closePopup = () => {
  const popup = document.querySelector('.popup');
  popup.parentElement.removeChild(popup);
};
fetchPokemon();
