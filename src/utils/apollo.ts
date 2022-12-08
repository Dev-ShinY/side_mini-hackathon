import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const DARK_MODE = "DARK_MODE";

export const darkModeVar = makeVar(Boolean(""));

export const enableDarkMode = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem(DARK_MODE, "enabled");
    darkModeVar(true);
  }
};

export const disableDarkMode = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
  }
};

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_APOLLO_ULI,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
