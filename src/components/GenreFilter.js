import React from "react";
import { ALL_GENRES } from "../queries";
import { useQuery } from "@apollo/client";

const GenreFilter = ({ setFilter }) => {
  const { loading, data: genreData } = useQuery(ALL_GENRES);

  return loading ? null : (
    <div>
      {genreData.allGenres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
