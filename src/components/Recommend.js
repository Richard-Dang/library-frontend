import React, { useEffect } from "react";
import { FAVORITE_GENRE, ALL_BOOKS } from "../queries";
import { useQuery, useLazyQuery } from "@apollo/client";

const Recommend = ({ show, books }) => {
  const { loading, data: favoriteGenreData } = useQuery(FAVORITE_GENRE);
  const [
    getRecommendedBooks,
    { loading: recBooksLoading, data: recBooksData },
  ] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (favoriteGenreData) {
      getRecommendedBooks({
        variables: { genre: favoriteGenreData.me.favoriteGenre },
      });
    }
  }, [favoriteGenreData, getRecommendedBooks]);

  const filteredBooks = () =>
    recBooksLoading
      ? null
      : recBooksData.allBooks.map((b) => (
          <tr key={b.title}>
            <td>{b.title}</td>
            <td>{b.author.name}</td>
            <td>{b.published}</td>
          </tr>
        ));

  if (!show) return null;

  return loading ? null : (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenreData.me.favoriteGenre}</b>
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
