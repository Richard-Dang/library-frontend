import React, { useState } from "react";
import GenreFilter from "./GenreFilter";

const Books = ({ show, books }) => {
  const [filter, setFilter] = useState("");

  if (!show) {
    return null;
  }

  const filteredBooks = () => {
    if (filter) {
      books = books.filter((b) => b.genres.includes(filter));
    }

    return books.map((b) => (
      <tr key={b.title}>
        <td>{b.title}</td>
        <td>{b.author.name}</td>
        <td>{b.published}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>books</h2>

      <p>
        in genre <b>{filter}</b>
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
      <GenreFilter setFilter={setFilter} />
    </div>
  );
};

export default Books;
