'use strict';
// API KEY = https://www.omdbapi.com/?i=tt3896198&apikey=4c0208e7
const movieSearchBox = document.getElementById('movieSearchBox');
const searchList = document.getElementById('searchList');
const resultGrid = document.getElementById('resultGrid');

// Load movies from API
const loadMovie = async function (searchQuery) {
	try {
		const URL = `https://www.omdbapi.com/?s=${searchQuery}&page=1&apikey=4c0208e7`;
		const res = await fetch(URL);
		const data = await res.json();
		if (data.Response === 'True') displayMovieList(data.Search);
	} catch (err) {
		console.log(err.message);
	}
};

function findMovies() {
	let searchQuery = movieSearchBox.value.trim();
	if (searchQuery.length > 0) {
		searchList.classList.remove('hide-search-list');
		loadMovie(searchQuery);
	} else {
		searchList.classList.add('hide-search-list');
		searchList.innerHTML = '';
	}
}

function displayMovieList(movies) {
	searchList.innerHTML = '';
	let moviePoster;
	movies.forEach((movie) => {
		let movieListItem = document.createElement('div');
		movieListItem.dataset.id = movie.imdbID;
		movieListItem.classList.add('search-list-item');
		if (movie.Poster === 'N/A') {
			moviePoster = 'image_not_found.png';
		} else {
			moviePoster = movie.Poster;
		}
		movieListItem.innerHTML = `
			<div class="search-item-thumbnail">
				<img src="${moviePoster}" alt="movie image" />
			</div>
			<div class="search-item-info">
				<h3>${movie.Title}</h3>
				<p>${movie.Year}</p>
			</div>
		`;
		searchList.appendChild(movieListItem);
	});
	loadMovieDetails();
}

function loadMovieDetails() {
	const searchListMovies = searchList.querySelectorAll('.search-list-item');
	searchListMovies.forEach((movie) => {
		movie.addEventListener('click', async () => {
			searchList.classList.add('hide-search-list');
			movieSearchBox.value = '';
			const result = await fetch(
				`https://www.omdbapi.com/?i=${movie.dataset.id}&page=1&apikey=4c0208e7`
			);
			const movieDetails = await result.json();
			console.log(movieDetails);
			displayMovieDetails(movieDetails);
		});
	});
}

function displayMovieDetails(movie) {
	resultGrid.innerHTML = ` 
		<div class="movie-poster">
			<img src="${
				movie.Poster === 'N/A' ? 'image_not_found.png' : movie.Poster
			}" alt="movie poster" />
		</div>
		<div class="movie-info">
			<h3 class="movie-title">${movie.Title}</h3>
			<ul class="movie-misc-info">
				<li class="year">Year: ${movie.Year}</li>
				<li class="rated">Rated: ${movie.Rated}</li>
				<li class="released">Released: ${movie.Released}</li>
			</ul>
			<p class="genre"><b>Genre:</b> ${movie.Genre}</p>
			<p class="writer">
				<b>Writers:</b> ${movie.Writer}
			</p>
			<p class="actors">
				<b>Actors:</b> ${movie.Actors}
			</p>
			<p class="plot">
				<b>Plot:</b> ${movie.Plot}
			</p>
			<p class="language"><b>Language:</b> ${movie.Language}</p>
			<p class="awards">
				<b><i class="fas fa-award"></i></b> ${movie.Awards}
			</p>
		</div>
	`;
}

movieSearchBox.addEventListener('keyup', findMovies);
document.addEventListener('click', (e) => {
	if (e.target.className !== 'form-control') {
		searchList.classList.add('hide-search-list');
	}
	if (e.target.className === 'form-control') findMovies();
});
