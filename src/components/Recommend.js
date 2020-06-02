import React from "react";
import { FAVORITE_GENRE } from "../queries";
import { useQuery } from "@apollo/client";

const Recommend = ({ show, books }) => {
  const { loading, data } = useQuery(FAVORITE_GENRE);

  const filteredBooks = () => {
    const favoriteGenre = data.me.favoriteGenre;
    if (favoriteGenre) {
      books = books.filter((b) => b.genres.includes(favoriteGenre));
    }

    return books.map((b) => (
      <tr key={b.title}>
        <td>{b.title}</td>
        <td>{b.author.name}</td>
        <td>{b.published}</td>
      </tr>
    ));
  };

  if (!show) return null;

  return loading ? null : (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{data.me.favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks()}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
