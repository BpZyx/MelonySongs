Papa.parse('songs.csv', {
  download: true,
  header: true,
  complete: function(results) {
    var tableBody = document.querySelector('tbody');
    results.data.forEach(function(row) {
      var tableRow = document.createElement('tr');
      tableRow.innerHTML = '<td>' + row['Song Name'] + '</td>' +
                           '<td>' + row['Artist'] + '</td>' +
                           '<td>' + row['Release Date'] + '</td>' +
                           '<td><a href="' + row['YouTube Link'] + '">Watch on YouTube</a></td>';
      tableBody.appendChild(tableRow);
    });
  }
});
