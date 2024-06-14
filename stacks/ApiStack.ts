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
    },
    routes: {
      "GET /users/{userId}": "packages/functions/src/getUserInfoByUserID.main",
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
