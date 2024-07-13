document.addEventListener('DOMContentLoaded', () => {
    const favoritesContainer = document.getElementById('favorites-container');
    
    const loadFavorites = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favoritesContainer.innerHTML = '';
        favorites.forEach(champion => {
            const championCard = document.createElement('div');
            championCard.classList.add('champion-card');
            
            const championImg = document.createElement('img');
            championImg.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`;
            championImg.alt = champion.name;
            
            const championName = document.createElement('h2');
            championName.textContent = champion.name;
            
            const championTitle = document.createElement('p');
            championTitle.textContent = champion.title;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Usuń z ulubionych';
            removeButton.addEventListener('click', () => {
                removeFavorite(champion.id);
                Swal.fire({
                    title: "Sukces",
                    text: "Pomyślnie usunięto z ulubionych!",
                    icon: "success"
                  });
            });
            
            championCard.appendChild(championImg);
            championCard.appendChild(championName);
            championCard.appendChild(championTitle);
            championCard.appendChild(removeButton);
            favoritesContainer.appendChild(championCard);
        });
    };
    
    const removeFavorite = (championId) => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(fav => fav.id !== championId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites();
    };
    
    loadFavorites();
});
