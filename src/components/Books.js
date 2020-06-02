import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import GenreFilter from "./GenreFilter";

const Books = ({ show }) => {
  const { loading, data } = useQuery(ALL_BOOKS);
  const [filter, setFilter] = useState("");

  if (!show) {
    return null;
  }

  const filteredBooks = () => {
    let books = data.allBooks;
    if (filter) {
      books = data.allBooks.filter((b) => b.genres.includes(filter));
    }

    return books.map((b) => (
      <tr key={b.title}>
        <td>{b.title}</td>
        <td>{b.author.name}</td>
        <td>{b.published}</td>
      </tr>
    ));
  };

  return loading ? null : (
    <div>
      <h2>books</h2>

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
      <GenreFilter setFilter={setFilter} />
    </div>
  );
};

export default Books;
