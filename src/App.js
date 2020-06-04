import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";
import { useApolloClient, useSubscription } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token")
  );
  const client = useApolloClient();
  const { loading, data } = useQuery(ALL_BOOKS);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("login");
  };

  const updateCache = (book) => {
    const storeData = client.readQuery({ query: ALL_BOOKS });
    if (!storeData.allBooks.map((b) => b.id).includes(book.id)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: storeData.allBooks.concat(book) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded;
      window.alert(`New book added: ${book.title} by ${book.author.name}`);
      updateCache(book);
    },
  });

  return loading ? null : (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <span>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </span>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} books={data.allBooks} />

      <Login show={page === "login"} setToken={setToken} setPage={setPage} />

      <NewBook show={page === "add"} />

      <Recommend show={page === "recommend"} books={data.allBooks} />
    </div>
  );
};

export default App;
