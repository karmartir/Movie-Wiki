import {
  NavBar,
  NumResults,
  Search,
  MovieDetails,
  MovieList,
  WatchedSummary,
  WatchedMoviesList,
  Box,
  Main,
  Loader,
  ErrorMessage,
} from "./components";
import { useState, useCallback, useMemo } from "react";
import { useMovies } from "./custom-hooks/useMovies";
import { useLocalStorageState } from "./custom-hooks/useLocalStorageState";

// const tempQuery = "interstellar";
export default function App() {
  const [query, setQuery] = useState(""); // default for initial fetch
  const [selectedId, setSelectedId] = useState(null);
  const [brokenPosters, setBrokenPosters] = useState(new Set());
  //custom hooks:
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const visibleMovies = useMemo(
    () =>
      movies.filter(
        (movie) =>
          movie.Poster &&
          movie.Poster !== "N/A" &&
          !brokenPosters.has(movie.imdbID),
      ),
    [movies, brokenPosters],
  );
  const handleSelectMovie = useCallback(
    (id) => setSelectedId((prev) => (id === prev ? null : id)),
    [],
  );

  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    setQuery("");
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar className="nav-bar">
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={visibleMovies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList
              movies={visibleMovies}
              onSelectMovie={handleSelectMovie}
              onPosterError={(id) =>
                setBrokenPosters((prev) => new Set(prev).add(id))
              }
            />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
