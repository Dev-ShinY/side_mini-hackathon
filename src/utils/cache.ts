import { InMemoryCache } from "@apollo/client";

export const typePolicies = {};

export const cache = new InMemoryCache({ typePolicies });
