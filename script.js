document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    if (query) {
        searchBusinesses(query);
    }
});

async function searchBusinesses(query) {
    const url = `/api/search?query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayResults(data.response.venues);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayResults(venues) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (venues.length === 0) {
        resultsContainer.innerHTML = '<p>No businesses found.</p>';
        return;
    }

    venues.forEach(venue => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `<h3>${venue.name}</h3><p>${venue.location.address || 'No address available'}</p>`;
        resultsContainer.appendChild(resultItem);
    });
}
