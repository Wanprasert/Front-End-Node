document.addEventListener('DOMContentLoaded', () => {
    const playerIdSelect = document.getElementById('playerId');
  
    // Fetch data from the server
    fetch('/getPlayers')
      .then(response => response.json())
      .then(data => {
        // Populate the dropdown with playerIds
        data.forEach(playerId => {
          const option = document.createElement('option');
          option.value = playerId;
          option.textContent = playerId;
          playerIdSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching playerIds:', error));
  });
  