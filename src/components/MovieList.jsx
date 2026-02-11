import Movie from "./Movie";
function MovieList({ movies, onSelectMovie, onPosterError }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={onSelectMovie}
          onPosterError={onPosterError}
        />
      ))}
    </ul>
  );
}

export default MovieList;
