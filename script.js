document.addEventListener('DOMContentLoaded', () => {
    const championsContainer = document.getElementById('champions-container');
    
    const saveFavorite = (champion) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.some(fav => fav.id === champion.id)) {
            favorites.push(champion);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    };

    fetch('https://ddragon.leagueoflegends.com/cdn/12.10.1/data/en_US/champion.json')
        .then(response => response.json())
        .then(data => {
            const champions = data.data;
            for (let champion in champions) {
                const championData = champions[champion];
                
                const championCard = document.createElement('div');
                championCard.classList.add('champion-card');
                
                const championImg = document.createElement('img');
                championImg.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championData.id}_0.jpg`;
                championImg.alt = championData.name;
                
                const championName = document.createElement('h2');
                championName.textContent = championData.name;
                
                const championTitle = document.createElement('p');
                championTitle.textContent = championData.title;
                
                const championLink = document.createElement('a');
                championLink.href = `champion.html?id=${championData.id}`;
                championLink.appendChild(championImg);
                championLink.appendChild(championName);
                championLink.appendChild(championTitle);
                
                const favoriteButton = document.createElement('button');
                favoriteButton.textContent = 'Dodaj do ulubionych';
                favoriteButton.addEventListener('click', () => {
                    saveFavorite(championData);
                    Swal.fire({
                        title: "Sukces",
                        text: "Pomyślnie dodano do ulubionych!",
                        icon: "success"
                      });
                });
                
                championCard.appendChild(championLink);
                championCard.appendChild(favoriteButton);
                championsContainer.appendChild(championCard);
            }
        })
        .catch(error => console.error('Error fetching champion data:', error));
});
