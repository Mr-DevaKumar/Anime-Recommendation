// Fetch data from Jikan API
async function fetchAnimeData() {
    try {
        const response = await fetch('https://api.jikan.moe/v4/anime');
        const data = await response.json();
        const animeList = data.data;

        // Select the container where anime cards will be displayed
        const animeListContainer = document.getElementById('anime-list');

        // Loop through the anime data and generate the HTML structure for each anime card
        animeList.forEach(anime => {
            const animeCard = document.createElement('div');
            animeCard.classList.add('anime-card');

            animeCard.innerHTML = `
    <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
    <h2>${anime.title}</h2>
    <p>${anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : 'No description available'}</p>
  `;

            // Append the generated anime card to the anime list container
            animeListContainer.appendChild(animeCard);
        });
    } catch (error) {
        console.error('Error fetching anime data:', error);
    }
}

// Call the fetchAnimeData function to load data on page load
window.onload = fetchAnimeData;