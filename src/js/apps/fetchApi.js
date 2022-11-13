const API_KEY = 'd0441be4fdc25d632a912102339ee4f4';
async function fetchAllMovies() {
  const url = 'https://api.themoviedb.org/3/trending/all/day';
  const param = new URLSearchParams({
    api_key: API_KEY,
    total_pages: 1,
    total_results: 12,
    adult: true,
  });
  const rest = await fetch(`${url}?${param}`);
  const response = await rest.json();
  return response;
}

// ===================================================================
async function fetchMoviesGenres() {
  const url = 'https://api.themoviedb.org/3/genre/movie/list';
  const param = new URLSearchParams({
    api_key: API_KEY,
  });

  const rest = await fetch(`${url}?${param}`);
  const response = await rest.json();
  return response;
}

// ===================================================================
async function fetchTVShowGenres() {
  const url = 'https://api.themoviedb.org/3/genre/tv/list';
  const param = new URLSearchParams({
    api_key: API_KEY,
  });

  const rest = await fetch(`${url}?${param}`);
  const response = await rest.json();
  return response;
}

// ===================================================================
async function fetchAboutMovies(movieID) {
  const url = `https://api.themoviedb.org/3/movie/${movieID}`;

  const param = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
  });

  const rest = await fetch(`${url}?${param}`);
  const response = await rest.json();
  return response;
}

export {
  fetchAllMovies,
  fetchMoviesGenres,
  fetchTVShowGenres,
  fetchAboutMovies,
  API_KEY,
};
