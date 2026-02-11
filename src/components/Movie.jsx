function Movie({
  movie: { Poster, Title, Year, imdbID },
  onSelectMovie,
  onPosterError,
}) {
  const handleClick = () => {
    onSelectMovie(imdbID);
  };
  return (
    <li onClick={handleClick}>
      <img
        src={Poster}
        alt={`${Title} poster`}
        onError={() => onPosterError(imdbID)}
      />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
