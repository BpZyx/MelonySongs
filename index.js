// Load the songs from the CSV file
function loadSongs() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "songs.csv");
  xhr.onload = () => {
    const csvData = xhr.responseText;
    const songs = parseCSV(csvData);
    displaySongs(songs);
  };
  xhr.send();
}

// Parse CSV data into an array of objects
function parseCSV(csvData) {
  const lines = csvData.split("\n");
  const headers = lines[0].split(",");
  const songs = [];
  for (let i = 1; i < lines.length; i++) {
    const songData = lines[i].split(",");
    const song = {};
    for (let j = 0; j < headers.length; j++) {
      song[headers[j]] = songData[j];
    }
    songs.push(song);
  }
  return songs;
}

// Display the list of songs in the HTML table
function displaySongs(songs) {
  const table = document.getElementById("song-list");
  table.innerHTML = "";
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    const row = table.insertRow();
    const nameCell = row.insertCell();
    const artistCell = row.insertCell();
    const dateCell = row.insertCell();
    const linkCell = row.insertCell();
    nameCell.textContent = song["Song Name"];
    artistCell.textContent = song["Artist"];
    dateCell.textContent = formatDate(song["Release Date"]);
    const link = document.createElement("a");
    link.href = song["YouTube Link"];
    link.target = "_blank";
    link.textContent = "Play";
    linkCell.appendChild(link);
  }
}

// Format the date in the "DD MMM YYYY" format
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options).replace(/,/g, "");
}

// Search for songs that match the search term
function searchSongs() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase();
  const table = document.getElementById("song-list");
  const rows = table.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    const nameCell = rows[i].getElementsByTagName("td")[0];
    const artistCell = rows[i].getElementsByTagName("td")[1];
    if (nameCell || artistCell) {
      const name = nameCell.textContent.toLowerCase();
      const artist = artistCell.textContent.toLowerCase();
      if (name.includes(searchTerm) || artist.includes(searchTerm)) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }
}

// Clear the search input and display all songs
function clearSearch() {
  const searchTerm = document.getElementById("search-input").value;
  if (searchTerm) {
    document.getElementById("search-input").value = "";
    displaySongs(songs);
  }
}

// Load the songs when the page is loaded
window.addEventListener("load", () => {
  loadSongs();

  // Add event listener for the search button
  const searchBtn = document.getElementById("search-btn");
  searchBtn.addEventListener("click", searchSongs);

  // Add event listener for the clear button
  const clearBtn = document.getElementById("clear-btn");
  clearBtn.addEventListener("click", clearSearch);
});
