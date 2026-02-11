import { useState, useEffect, useRef, useCallback } from "react";
import { useKey } from "../custom-hooks/useKey";
import Loader from "./Loader";
import StarRating from "../custom-hooks/StarRating";

const KEY = import.meta.env.VITE_API_KEY;
function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  const fallbackPoster = ""; // placeholder for future use

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId,
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);
  const handleAdd = useCallback(() => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating,
      countRatingDecisions: countRef.current,
      runtime: Number(runtime?.split(" ").at(0) || 0),
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }, [
    selectedId,
    title,
    year,
    poster,
    imdbRating,
    userRating,
    countRef,
    runtime,
    onAddWatched,
    onCloseMovie,
  ]);

  useKey("Escape", onCloseMovie);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie Wiki | ${title}`;
    return function () {
      document.title = "Movie Wiki";
      //console.log("Clean up 2");
    };
  }, [title]);
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <header>
          <button onClick={onCloseMovie} className="btn-back">
            &larr;
          </button>
          <img
            src={poster}
            alt={`${title} poster`}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <div className="details-overview">
            <h2>{title}</h2>
            <p>
              {released} &bull; {runtime}
            </p>
            <p>{genre}</p>
            <p>
              <span>⭐️</span>
              {imdbRating} IMDb rating
            </p>
          </div>
        </header>
      )}
      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to list
                </button>
              )}
            </>
          ) : (
            <p>
              You rated this movie {watchedUserRating}{" "}
              <span> {"⭐️".repeat(watchedUserRating)}</span>
            </p>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}
export default MovieDetails;
