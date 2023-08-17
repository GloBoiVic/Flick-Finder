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
}

/*
	function loadMovieDetails
	Get all the current movies on the page
	Loop through the movies and add click Listener
		On click of a movie, hide the search list
		Empty search box value
		Then fetch the movie using the imdbID we put on each movie
*/

// function loadMovieDetails() {
// 	const
// }
