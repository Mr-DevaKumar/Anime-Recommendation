// script.js

// Function to fetch recommendations based on user input
async function getAnimeRecommendations() {
    const mood = document.getElementById('mood').value; // Get the selected mood from the form
    const url = `https://api.jikan.moe/v4/anime?q=${mood}&limit=5`; // Fetch anime by mood (search term)

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check if the response is successful
        if (data.data && data.data.length > 0) {
            displayRecommendations(data.data);
        } else {
            displayRecommendations([]);
        }
    } catch (error) {
        console.error('Error fetching anime data:', error);
    }
}

// Function to display the recommendations
function displayRecommendations(animeList) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = ''; // Clear previous recommendations

    if (animeList.length === 0) {
        recommendationsDiv.innerHTML = '<p>No recommendations found. Try adjusting your filters.</p>';
        return;
    }

    animeList.forEach(anime => {
        const card = document.createElement('div');
        card.classList.add('anime-card');

        const title = anime.title;
        const imageUrl = anime.images.jpg.image_url || 'https://via.placeholder.com/200x300?text=No+Image';
        const description = anime.synopsis || 'No description available.';

        card.innerHTML = `
        <img src="${imageUrl}" alt="${title}">
        <h3>${title}</h3>
        <p>${description.slice(0, 100)}...</p>
        <button class="save-btn" data-id="${anime.mal_id}">Save to Watchlist</button>
      `;

        recommendationsDiv.appendChild(card);

        // Add functionality to save to watchlist (using localStorage for example)
        card.querySelector('.save-btn').addEventListener('click', () => saveToWatchlist(anime));
    });
}

// Function to save anime to watchlist (localStorage for now)
function saveToWatchlist(anime) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (!watchlist.some(item => item.mal_id === anime.mal_id)) {
        watchlist.push(anime);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        alert(`${anime.title} added to your watchlist!`);
    } else {
        alert(`${anime.title} is already in your watchlist.`);
    }
}

// Event listener for form submission
document.getElementById('preferences-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from reloading the page
    getAnimeRecommendations();
});
