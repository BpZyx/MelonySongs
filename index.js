const songsTable = document.querySelector('#songs-table tbody');
const searchBox = document.querySelector('#search-box');
const clearSearchBtn = document.querySelector('#clear-search-btn');
const randomSongBtn = document.querySelector('#random-song-btn');

let songs = [];

fetch('songs.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n');
    const headers = rows[0].split(',');
    songs = [];

    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].split(',');
      if (cells.length === headers.length) {
        const song = {};
        for (let j = 0; j < headers.length; j++) {
          song[headers[j].trim()] = cells[j].trim();
        }
        songs.push(song);
      }
    }

    renderSongs(songs);
    searchBox.addEventListener('input', () => filterSongs(songs));
    clearSearchBtn.addEventListener('click', () => {
      searchBox.value = '';
      renderSongs(songs);
    });
    randomSongBtn.addEventListener('click', () => {
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      alert(`คุณสุ่มได้เพลง ${randomSong['Song Name']} ของ ${randomSong['Artist']}`);
    });
  });

function renderSongs(songs) {
  songsTable.innerHTML = '';
  for (const song of songs) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${song['Song Name']}</td>
      <td>${song['Artist']}</td>
      <td>${song['Release Date']}</td>
      <td><a href="${song['YouTube Link']}" target="_blank">คลิกเพื่อฟัง</a></td>
    `;
    songsTable.appendChild(row);
  }
}

function filterSongs(songs) {
  const searchText = searchBox.value.trim().toLowerCase();
  const filteredSongs = songs.filter(song => {
    return song['Song Name'].toLowerCase().includes(searchText) ||
          song['Artist'].toLowerCase().includes(searchText) ||
          song['Release Date'].toLowerCase().includes(searchText);
  });
  renderSongs(filteredSongs);
}
