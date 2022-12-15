import { gql, useReactiveVar } from "@apollo/client";
import { Button, message } from "antd";
import { useState } from "react";
import { restaurantIndex } from "../src/utils/apollo";
import {
  Restaurant,
  useRecommendRestaurantsQuery,
  useUpsertNeedsMutation,
} from "../src/utils/client";

gql`
  mutation upsertNeeds($input: UpdateNeedsInput!) {
    upsertNeeds(input: $input) {
      date
      kor
      chn
      jpn
      flour
    }
  }

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

interface IPropsNeeds {
  needsList: Array<any>;
}

export const SubmitBtn = (props: IPropsNeeds) => {
  const indexN = useReactiveVar(restaurantIndex);

  const [recommendRestaurants, setRecommendRestaurants] =
    useState<Restaurant>();

  // apollo
  const [upsertNeeds] = useUpsertNeedsMutation();

  const { refetch: refetchRecommend } = useRecommendRestaurantsQuery({
    variables: {
      input: {
        date:
          new Date().getFullYear() +
          "-" +
          ("0" + (new Date().getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + new Date().getDate()).slice(-2),
        startIndex: (indexN - 1) * 5,
      },
    },
    onCompleted(data) {
      setRecommendRestaurants((data as any).recommendRestaurants);
    },
  });

  return (
    <Button
      onClick={async () => {
        await upsertNeeds({
          variables: {
            input: {
              date:
                new Date().getFullYear() +
                "-" +
                ("0" + (new Date().getMonth() + 1)).slice(-2) +
                "-" +
                ("0" + new Date().getDate()).slice(-2),
              kor: props.needsList.filter(function (item) {
                return item.title === "한식";
              })[0].value,
              chn: props.needsList.filter(function (item) {
                return item.title === "중식";
              })[0].value,
              jpn: props.needsList.filter(function (item) {
                return item.title === "일식";
              })[0].value,
              flour: props.needsList.filter(function (item) {
                return item.title === "분식";
              })[0].value,
            },
          },
          onCompleted(data: any) {
            console.log("success!!", data);
          },
        });
        message.info("success!!");
      }}
    >
      Submit
    </Button>
  );
};
