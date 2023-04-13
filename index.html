// Load songs from CSV file
let songs;
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      // Parse CSV data
      const csvData = xhr.responseText;
      songs = Papa.parse(csvData, { header: true }).data;

      // Filter songs by search term
      function filterSongs(searchTerm) {
        if (!searchTerm) {
          return songs;
        }
        const term = searchTerm.toLowerCase();
        return songs.filter(song =>
          song.title.toLowerCase().includes(term) ||
          song.artist.toLowerCase().includes(term) ||
          song.date.toLowerCase().includes(term)
        );
      }

      // Render songs
      function renderSongs(searchTerm) {
        const filteredSongs = filterSongs(searchTerm);
        const songList = document.getElementById("song-list");
        songList.innerHTML = "";
        if (filteredSongs.length > 0) {
          filteredSongs.forEach(song => {
            const songItem = document.createElement("li");
            songItem.innerHTML = `
              <div class="song-item">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
                <div class="song-date">${song.date}</div>
                <div class="song-link"><a href="${song.youtube_link}" target="_blank">Listen</a></div>
              </div>
            `;
            songList.appendChild(songItem);
          });
        } else {
          const noResults = document.createElement("li");
          noResults.innerText = "No results found.";
          songList.appendChild(noResults);
        }
      }

      // Handle search form submit
      const searchForm = document.getElementById("search-form");
      searchForm.addEventListener("submit", event => {
        event.preventDefault();
        const searchTerm = document.getElementById("search-term").value;
        renderSongs(searchTerm);
      });

      // Render all songs on page load
      renderSongs("");
    } else {
      console.log("Failed to load songs CSV file.");
    }
  }
};
xhr.open("GET", "songs.csv");
xhr.send();
