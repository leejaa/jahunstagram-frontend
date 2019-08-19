// import ApolloClient from "apollo-boost";
// import { defaults, resolvers } from "./LocalState";
// import { backendURL } from "../env";

import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, split, Observable } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
//import ApolloClient from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BACKEND_URL, SOCKET_URL } from "../env";



// export default new ApolloClient({
//   uri: backendURL,
//   clientState: {
//     defaults,
//     resolvers
//   },
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`
//   }
// });




const httpLink = new HttpLink({
  uri: BACKEND_URL
});

const wsLink = new WebSocketLink({
  uri: SOCKET_URL,
  options: {
    reconnect: true
  }
});

const cache = new InMemoryCache();

const request = async (operation) => {
  const token = await localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}`
    }
  });
};

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    requestLink,
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
  ]),
  cache: cache,
  resolvers: {
    Query: {
      isLoggedIn: () => {
        return Boolean(localStorage.getItem("token")) || false;
      }
    }
    ,Mutation: {
      logUserIn: (_, { token }, { cache }) => {
        localStorage.setItem("token", token);
        cache.writeData({
          data: {
            isLoggedIn: true
          }
        });
        return token;
      },
      logUserOut: (_, __, { cache }) => {
        localStorage.removeItem("token");
        window.location = "/";
        return null;
      }
    }
  }
});

export default client;
