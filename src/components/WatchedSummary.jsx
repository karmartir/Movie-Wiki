import { useMemo } from "react";
const average = (arr) =>
  arr.length === 0 ? 0 : arr.reduce((acc, cur) => acc + cur / arr.length, 0);
function WatchedSummary({ watched }) {
  const avgImdbRating = useMemo(
    () => average(watched.map((movie) => movie.imdbRating || 0)).toFixed(2),
    [watched],
  );

  const avgUserRating = useMemo(
    () => average(watched.map((movie) => movie.userRating || 0)).toFixed(2),
    [watched],
  );

  const avgRuntime = useMemo(
    () => average(watched.map((movie) => movie.runtime || 0)).toFixed(),
    [watched],
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

export default WatchedSummary;
