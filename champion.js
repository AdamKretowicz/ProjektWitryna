document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const championId = urlParams.get('id');

    const championNameElement = document.getElementById('champion-name');
    const championTitleElement = document.getElementById('champion-title');
    const championImageElement = document.getElementById('champion-image');
    const championDescriptionElement = document.getElementById('champion-description');
    const skinsContainer = document.getElementById('skins-container');

    fetch(`https://ddragon.leagueoflegends.com/cdn/12.10.1/data/en_US/champion/${championId}.json`)
        .then(response => response.json())
        .then(data => {
            const championData = data.data[championId];

            championNameElement.textContent = championData.name;
            championTitleElement.textContent = championData.title;
            championImageElement.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg`;
            championDescriptionElement.textContent = championData.lore;

            championData.skins.forEach(skin => {
                const skinCard = document.createElement('div');
                skinCard.classList.add('skin-card');

                const skinImg = document.createElement('img');
                skinImg.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_${skin.num}.jpg`;
                skinImg.alt = skin.name;

                const skinName = document.createElement('p');
                skinName.textContent = skin.name;

                skinCard.appendChild(skinImg);
                skinCard.appendChild(skinName);
                skinsContainer.appendChild(skinCard);
            });

            // Akordeon
            const acc = document.getElementsByClassName('accordion');
            for (let i = 0; i < acc.length; i++) {
                acc[i].addEventListener('click', function () {
                    this.classList.toggle('active');
                    const panel = this.nextElementSibling;
                    if (panel.style.display === 'block') {
                        panel.style.display = 'none';
                    } else {
                        panel.style.display = 'block';
                    }
                });
            }
        })
        .catch(error => console.error('Error fetching champion data:', error));
});
