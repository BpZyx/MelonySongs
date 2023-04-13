// Load songs data from CSV file
const loadSongs = async () => {
  try {
    const response = await fetch('songs.csv');
    const data = await response.text();
    return Papa.parse(data, { header: true }).data;
  } catch (error) {
    console.error(error);
  }
};

// Render songs list
const renderSongs = (songs) => {
  const tableBody = document.querySelector('#songs-table tbody');
  tableBody.innerHTML = '';

  songs.forEach((song) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = song['Song Name'];
    row.appendChild(nameCell);

    const artistCell = document.createElement('td');
    artistCell.textContent = song['Artist'];
    row.appendChild(artistCell);

    const dateCell = document.createElement('td');
    dateCell.textContent = song['Release Date'];
    row.appendChild(dateCell);

    const linkCell = document.createElement('td');
    const link = document.createElement('a');
    link.textContent = 'Play';
    link.href = song['YouTube Link'];
    link.target = '_blank';
    linkCell.appendChild(link);
    row.appendChild(linkCell);

    tableBody.appendChild(row);
  });
};

// Handle search input
const handleSearch = (event, songs) => {
  const searchText = event.target.value.toLowerCase();
  const filteredSongs = songs.filter(
    (song) =>
      song['Song Name'].toLowerCase().includes(searchText) ||
      song['Artist'].toLowerCase().includes(searchText)
  );
  renderSongs(filteredSongs);
};

// Load and render songs list
window.addEventListener('DOMContentLoaded', async () => {
  const songs = await loadSongs();
  renderSongs(songs);

  const searchInput = document.querySelector('#search-input');
  searchInput.addEventListener('input', (event) => handleSearch(event, songs));
});
