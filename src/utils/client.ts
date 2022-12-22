import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateRestaurantInput = {
  beginTime?: InputMaybe<Scalars["String"]>;
  dist?: InputMaybe<Scalars["Float"]>;
  endTime?: InputMaybe<Scalars["String"]>;
  landAddress?: InputMaybe<Scalars["String"]>;
  lastVisitAt?: InputMaybe<Scalars["String"]>;
  lat?: InputMaybe<Scalars["Float"]>;
  localRate?: InputMaybe<Scalars["Float"]>;
  lon?: InputMaybe<Scalars["Float"]>;
  name: Scalars["String"];
  reviewCount?: InputMaybe<Scalars["Float"]>;
  reviewRateAvg?: InputMaybe<Scalars["Float"]>;
  roadAddress?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Scalars["String"]>;
  thumbnailUrl?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createRestaurant: Restaurant;
  updateRestaurant: Restaurant;
  upsertNeeds: Needs;
};

export type MutationCreateRestaurantArgs = {
  input: CreateRestaurantInput;
};

export type MutationUpdateRestaurantArgs = {
  input: UpdateRestaurantInput;
};

export type MutationUpsertNeedsArgs = {
  input: UpdateNeedsInput;
};

export type Needs = {
  __typename?: "Needs";
  chn: Scalars["Float"];
  date: Scalars["String"];
  flour: Scalars["Float"];
  jpn: Scalars["Float"];
  kor: Scalars["Float"];
};

export type Query = {
  __typename?: "Query";
  getNeeds?: Maybe<Needs>;
  getRestaurantByName?: Maybe<Restaurant>;
  recommendRestaurants?: Maybe<Array<Restaurant>>;
};

export type QueryGetNeedsArgs = {
  input: Scalars["String"];
};

export type QueryGetRestaurantByNameArgs = {
  input: Scalars["String"];
};

export type QueryRecommendRestaurantsArgs = {
  input: RecommendRestaurantInput;
};

export type RecommendRestaurantInput = {
  date: Scalars["String"];
  startIndex?: Scalars["Float"];
};

export type Restaurant = {
  map: any;
  __typename?: "Restaurant";
  beginTime?: Maybe<Scalars["String"]>;
  dist?: Maybe<Scalars["Float"]>;
  endTime?: Maybe<Scalars["String"]>;
  id: Scalars["Float"];
  landAddress?: Maybe<Scalars["String"]>;
  lastVisitAt?: Maybe<Scalars["String"]>;
  lat?: Maybe<Scalars["Float"]>;
  localRate?: Maybe<Scalars["Float"]>;
  lon?: Maybe<Scalars["Float"]>;
  name: Scalars["String"];
  reviewCount?: Maybe<Scalars["Float"]>;
  reviewRateAvg?: Maybe<Scalars["Float"]>;
  roadAddress?: Maybe<Scalars["String"]>;
  score?: Maybe<Scalars["Float"]>;
  tags?: Maybe<Scalars["String"]>;
  thumbnailUrl?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type UpdateNeedsInput = {
  chn?: InputMaybe<Scalars["Float"]>;
  date?: InputMaybe<Scalars["String"]>;
  flour?: InputMaybe<Scalars["Float"]>;
  jpn?: InputMaybe<Scalars["Float"]>;
  kor?: InputMaybe<Scalars["Float"]>;
};

export type UpdateRestaurantInput = {
  beginTime?: InputMaybe<Scalars["String"]>;
  dist?: InputMaybe<Scalars["Float"]>;
  endTime?: InputMaybe<Scalars["String"]>;
  id: Scalars["Float"];
  landAddress?: InputMaybe<Scalars["String"]>;
  lastVisitAt?: InputMaybe<Scalars["String"]>;
  lat?: InputMaybe<Scalars["Float"]>;
  localRate?: InputMaybe<Scalars["Float"]>;
  lon?: InputMaybe<Scalars["Float"]>;
  name?: InputMaybe<Scalars["String"]>;
  reviewCount?: InputMaybe<Scalars["Float"]>;
  reviewRateAvg?: InputMaybe<Scalars["Float"]>;
  roadAddress?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Scalars["String"]>;
  thumbnailUrl?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Scalars["String"]>;
};

export type UpsertNeedsMutationVariables = Exact<{
  input: UpdateNeedsInput;
}>;

export type UpsertNeedsMutation = {
  __typename?: "Mutation";
  upsertNeeds: {
    __typename?: "Needs";
    date: string;
    kor: number;
    chn: number;
    jpn: number;
    flour: number;
  };
};

export type GetNeedsQueryVariables = Exact<{
  input: Scalars["String"];
}>;

export type GetNeedsQuery = {
  __typename?: "Query";
  getNeeds?: {
    __typename?: "Needs";
    date: string;
    kor: number;
    chn: number;
    jpn: number;
    flour: number;
  } | null;
};

export type RecommendRestaurantsQueryVariables = Exact<{
  input: RecommendRestaurantInput;
}>;

export type RecommendRestaurantsQuery = {
  __typename?: "Query";
  recommendRestaurants?: Array<{
    __typename?: "Restaurant";
    id: number;
    name: string;
    landAddress?: string | null;
    roadAddress?: string | null;
    type?: string | null;
    lon?: number | null;
    lat?: number | null;
    dist?: number | null;
    tags?: string | null;
    beginTime?: string | null;
    endTime?: string | null;
    reviewRateAvg?: number | null;
    reviewCount?: number | null;
    thumbnailUrl?: string | null;
    localRate?: number | null;
    lastVisitAt?: string | null;
    score?: number | null;
  }> | null;
};

export const UpsertNeedsDocument = gql`
  mutation upsertNeeds($input: UpdateNeedsInput!) {
    upsertNeeds(input: $input) {
      date
      kor
      chn
      jpn
      flour
    }
  }
`;
export type UpsertNeedsMutationFn = Apollo.MutationFunction<
  UpsertNeedsMutation,
  UpsertNeedsMutationVariables
>;

/**
 * __useUpsertNeedsMutation__
 *
 * To run a mutation, you first call `useUpsertNeedsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertNeedsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertNeedsMutation, { data, loading, error }] = useUpsertNeedsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertNeedsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertNeedsMutation,
    UpsertNeedsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpsertNeedsMutation, UpsertNeedsMutationVariables>(
    UpsertNeedsDocument,
    options
  );
}
export type UpsertNeedsMutationHookResult = ReturnType<
  typeof useUpsertNeedsMutation
>;
export type UpsertNeedsMutationResult =
  Apollo.MutationResult<UpsertNeedsMutation>;
export type UpsertNeedsMutationOptions = Apollo.BaseMutationOptions<
  UpsertNeedsMutation,
  UpsertNeedsMutationVariables
>;
export const GetNeedsDocument = gql`
  query getNeeds($input: String!) {
    getNeeds(input: $input) {
      date
      kor
      chn
      jpn
      flour
    }
  }
`;

/**
 * __useGetNeedsQuery__
 *
 * To run a query within a React component, call `useGetNeedsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNeedsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNeedsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetNeedsQuery(
  baseOptions: Apollo.QueryHookOptions<GetNeedsQuery, GetNeedsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetNeedsQuery, GetNeedsQueryVariables>(
    GetNeedsDocument,
    options
  );
}
export function useGetNeedsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetNeedsQuery,
    GetNeedsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetNeedsQuery, GetNeedsQueryVariables>(
    GetNeedsDocument,
    options
  );
}
export type GetNeedsQueryHookResult = ReturnType<typeof useGetNeedsQuery>;
export type GetNeedsLazyQueryHookResult = ReturnType<
  typeof useGetNeedsLazyQuery
>;
export type GetNeedsQueryResult = Apollo.QueryResult<
  GetNeedsQuery,
  GetNeedsQueryVariables
>;
export const RecommendRestaurantsDocument = gql`
  query recommendRestaurants($input: RecommendRestaurantInput!) {
    recommendRestaurants(input: $input) {
      id
      name
      landAddress
      roadAddress
      type
      lon
      lat
      dist
      tags
      beginTime
      endTime
      reviewRateAvg
      reviewCount
      thumbnailUrl
      localRate
      lastVisitAt
      score
    }
  }
`;

/**
 * __useRecommendRestaurantsQuery__
 *
 * To run a query within a React component, call `useRecommendRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecommendRestaurantsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRecommendRestaurantsQuery(
  baseOptions: Apollo.QueryHookOptions<
    RecommendRestaurantsQuery,
    RecommendRestaurantsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    RecommendRestaurantsQuery,
    RecommendRestaurantsQueryVariables
  >(RecommendRestaurantsDocument, options);
}
export function useRecommendRestaurantsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RecommendRestaurantsQuery,
    RecommendRestaurantsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    RecommendRestaurantsQuery,
    RecommendRestaurantsQueryVariables
  >(RecommendRestaurantsDocument, options);
}
export type RecommendRestaurantsQueryHookResult = ReturnType<
  typeof useRecommendRestaurantsQuery
>;
export type RecommendRestaurantsLazyQueryHookResult = ReturnType<
  typeof useRecommendRestaurantsLazyQuery
>;
export type RecommendRestaurantsQueryResult = Apollo.QueryResult<
  RecommendRestaurantsQuery,
  RecommendRestaurantsQueryVariables
>;
