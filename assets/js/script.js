document.getElementById('searchButton').addEventListener('click', () => {
    const pokemonName = document.getElementById('pokemonInput').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('pokemonName').innerText = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            document.getElementById('pokemonId').innerText = data.id;
            document.getElementById('pokemonHeight').innerText = data.height / 10 + ' m';
            document.getElementById('pokemonWeight').innerText = data.weight / 10 + ' kg';
            
            const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
            document.getElementById('pokemonTypes').innerText = types;

            document.getElementById('pokemonImage').src = data.sprites.front_default;
            document.getElementById('pokemonImage').alt = data.name;

            document.getElementById('pokemonInfo').style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Pokémon no encontrado');
        });
});


function loadPokemonCatalog() {
    const catalogContainer = document.getElementById('pokemonCatalog');

    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000') 
        .then(response => response.json())
        .then(data => {
            data.results.forEach(pokemon => {
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        const card = document.createElement('div');
                        card.className = 'catalog-card';
                        card.innerHTML = `
                            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                            <h2>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
                        `;
                        catalogContainer.appendChild(card);
                    });
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


window.onload = loadPokemonCatalog;
