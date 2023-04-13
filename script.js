let songTable = document.getElementById("songTable");
let songData = [];

function loadTable() {
  Papa.parse("songs.csv", {
    download: true,
    header: true,
    complete: function(results) {
      songData = results.data;
      displayTable(songData);
    }
  });
}

function displayTable(data) {
  let tableBody = songTable.querySelector("tbody");
  tableBody.innerHTML = "";
  data.forEach(function(song) {
    let row = document.createElement("tr");
    let name = document.createElement("td");
    let artist = document.createElement("td");
    let releaseDate = document.createElement("td");
    let link = document.createElement("td");
    let linkButton = document.createElement("a");

    name.innerText = song["ชื่อเพลง"];
    artist.innerText = song["ศิลปิน"];
    releaseDate.innerText = song["วันที่ร้อง"];

    linkButton.href = song["YouTube Link"];
    linkButton.innerText = "เปิดเพลง";
    linkButton.target = "_blank";

    link.appendChild(linkButton);

    row.appendChild(name);
    row.appendChild(artist);
    row.appendChild(releaseDate);
    row.appendChild(link);
    tableBody.appendChild(row);
  });
}

function search() {
  let filter = document.getElementById("searchInput").value.toUpperCase();
  let filteredData = songData.filter(function(song) {
    return song["ชื่อเพลง"].toUpperCase().indexOf(filter) > -1 || song["ศิลปิน"].toUpperCase().indexOf(filter) > -1;
  });
  displayTable(filteredData);
}

function clearSearch() {
  document.getElementById("searchInput").value = "";
  displayTable(songData);
}

loadTable();
