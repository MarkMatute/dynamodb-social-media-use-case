import { Api, StackContext, use } from "sst/constructs";
import { DynamodbStack } from "./DynamodbStack";

export function ApiStack({ stack }: StackContext) {
  const { table } = use(DynamodbStack);

  // api
  const api = new Api(stack, "SocialMediaApi", {
    defaults: {
      function: {
        bind: [table],
      },
      authorizer: "iam",
    },
    routes: {
      "GET /users/{userId}": "packages/functions/src/getUserInfoByUserID.main",
      "GET /users/{userId}/follower":
        "packages/functions/src/getFollowerListByUserID.main",
      "GET /users/{userId}/following":
        "packages/functions/src/getFollowingListByUserID.main",
      "GET /users/{userId}/post":
        "packages/functions/src/getPostListByUserID.main",
      "GET /posts/{postId}/likes":
        "packages/functions/src/getUserLikesByPostID.main",
      "GET /posts/{postId}/likescount":
        "packages/functions/src/getLikeCountByPostID.main",
      "GET /user/{userId}/timeline":
        "packages/functions/src/getTimelineByUserID.main",
    },
  });

  // outputs
  stack.addOutputs({
    apiUrl: api.url,
  });

  // return
  return {
    api,
  };
}
