import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = ({ show }) => {
  const { loading, data } = useQuery(ALL_AUTHORS, {
    onCompleted: (data) => {
      if (data.allAuthors[0]) {
        setName(data.allAuthors[0].name);
      }
    },
  });
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [editAuthor, { data: editAuthorData }] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: ({ networkError }) => {
      if (networkError) {
        console.log("Edit author mutation error:", networkError.result.errors);
      }
    },
  });

  const handleSetBirthYear = (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, born: parseInt(born) } });
    setName("");
    setBorn("");
  };

  useEffect(() => {
    if (editAuthorData && editAuthorData.editAuthor === null) {
      console.error("Author not found");
    }
  }, [editAuthorData]);

  if (!show) {
    return null;
  }

  return loading ? null : (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.numBooks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={handleSetBirthYear}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {data.allAuthors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
