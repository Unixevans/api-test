function SearchMovies() {
  $('#movie-list').html('');
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      'apikey': '1a81ed53',
      's': $('#search-input').val()
    },
    success: function (hasil) {
      if (hasil.Response == "True") {
        let movies = hasil.Search;
        $.each(movies, function (i, data) {
          $('#movie-list').append(`
          <div class="col-md-4">
            <div class="card mb-3">
              <img src="` + data.Poster + `" class="card-img-top" alt="...">
              <div class="card-body">
              <h5 class="card-title">` + data.Title + `</h5>
              <h6 class="card-subtitle mb-2 text-muted">` + data.Year + `</h6>
              <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` + data.imdbID + `" style="text-decoration:none;">See detail</a>
              </div>
            </div>
          </div>
          `)
        })
        $('#search-input').val('');
      } else {
        $('#movie-list').html(`
        <div class="col">
          <h2 class="text-center">` + hasil.Error + `</h2>
        </div>`);
      }
    }
  });
}
$("#search-button").on("click", function () {
  SearchMovies();
});

$('#search-input').on('keyup', function (e) {
  if (e.keyCode === 13) {
    SearchMovies();
  }
})
$('#movie-list').on('click', '.see-detail', function () {
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      'apikey': '1a81ed53',
      'i': $(this).data('id')
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $('.modal-body').html(`
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-4">
              <img src="` + movie.Poster + `" class="img-fluid">
            </div>
            <div class="col-md-8">
              <ul class="list-group">
                <li class="list-group-item"><h3>` + movie.Title + `</h3></li>
                <li class="list-group-item">` + movie.Released + `</li>
                <li class="list-group-item">` + movie.Genre + `</li>
                <li class="list-group-item">` + movie.Actors + `</li>
                <li class="list-group-item">` + movie.Runtime + `</li>
                <li class="list-group-item">` + movie.Country + `</li>
                <li class="list-group-item">` + movie.Plot + `</li>
              </ul>
            </div>
          </div>
        </div>
      `)
      }
    }


  });
});