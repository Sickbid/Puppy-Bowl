const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');


const cohortName = '2302-ACC-ET-WEB-PT-D';

const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;


const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}players`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}players/${playerId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const player = await response.json();
        return player;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(`${APIURL}players`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerObj),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newPlayer = await response.json();
        return newPlayer;
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}players/${playerId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(`Player #${playerId} successfully removed.`);
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

const renderAllPlayers = (playerList) => {
    try {
        let playerContainerHTML = '';
        playerList.forEach((player) => {
            playerContainerHTML += `
                <div class="player-card">
                    <img src="${player.imageUrl}" alt="${player.name}">
                    <h2>${player.name}</h2>
                    <p>Breed: ${player.breed}</p>
                    <p>Status: ${player.status}</p>
                    <button onclick="fetchSinglePlayer(${player.id})">See details</button>
                    <button onclick="removePlayer(${player.id})">Remove from roster</button>
                </div>
            `;
        });

        playerContainer.innerHTML = playerContainerHTML;
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


const renderNewPlayerForm = () => {
    try {
        let playerContainerHTML = '';
        playerList.forEach((player) => {
            playerContainerHTML += `
                <div class="player-card">
                    <img src="${player.imageUrl}" alt="${player.name}">
                    <h2>${player.name}</h2>
                    <p>Breed: ${player.breed}</p>
                    <p>Status: ${player.status}</p>
                    <button class="details-button" data-id="${player.id}">See details</button>
                    <button class="remove-button" data-id="${player.id}">Remove from roster</button>
                </div>
            `;
        });
        playerContainer.innerHTML = playerContainerHTML;
        const detailButtons = document.querySelectorAll('.details-button');
        const removeButtons = document.querySelectorAll('.remove-button');

        detailButtons.forEach(button => {
            button.addEventListener('click', () => {
                fetchSinglePlayer(button.dataset.id);
            });
        });
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                removePlayer(button.dataset.id);
            });
        });
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();
