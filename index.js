const tableBody = document.querySelector('#table-body');
const searchBox = document.querySelector('#search-box');
const clearBtn = document.querySelector('#clear-btn');
let data = [];

// Load data from CSV file
fetch('songs.csv')
  .then(response => response.text())
  .then(text => {
    const rows = text.split('\n');
    rows.forEach((row, index) => {
      if (index !== 0) {
        const columns = row.split(',');
        data.push({
          name: columns[0],
          artist: columns[1],
          date: columns[2],
          link: columns[3]
        });
      }
    });
    displayData(data);
  });

// Display data in table
function displayData(data) {
  tableBody.innerHTML = '';
  data.forEach(song => {
    const row = document.createElement('tr');
    const nameCol = document.createElement('td');
    const artistCol = document.createElement('td');
    const dateCol = document.createElement('td');
    const linkCol = document.createElement('td');
    const link = document.createElement('a');
    
    nameCol.textContent = song.name;
    artistCol.textContent = song.artist;
    dateCol.textContent = song.date;
    link.textContent = 'Listen';
    link.href = song.link;
    link.target = '_blank';
    linkCol.appendChild(link);

    row.appendChild(nameCol);
    row.appendChild(artistCol);
    row.appendChild(dateCol);
    row.appendChild(linkCol);
    tableBody.appendChild(row);
  });
}

// Filter table based on search query
function searchTable(query) {
  const filteredData = data.filter(song => {
    return song.name.toLowerCase().includes(query.toLowerCase()) ||
           song.artist.toLowerCase().includes(query.toLowerCase());
  });
  displayData(filteredData);
}

// Clear search box and display all data
function clearSearch() {
  searchBox.value = '';
  displayData(data);
}

// Event listeners
searchBox.addEventListener('input', e => {
  searchTable(e.target.value);
});

clearBtn.addEventListener('click', clearSearch);
