import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("graphQLErrors", graphQLErrors);
  }
  if (networkError) {
    console.log("networkError", networkError);
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("library-user-token");
  return {
    headers: { ...headers, authorization: token ? `bearer ${token}` : null },
  };
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
});

const link = ApolloLink.from([errorLink, authLink, httpLink]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
