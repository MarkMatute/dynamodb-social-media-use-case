import { SSTConfig } from "sst";
import { DynamodbStack } from "./stacks/DynamodbStack";
import { ApiStack } from "./stacks/ApiStack";
import { AuthStack } from "./stacks/AuthStack";

export default {
  config(_input) {
    return {
      name: "social-media-use-case",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(DynamodbStack).stack(ApiStack).stack(AuthStack);
  },
} satisfies SSTConfig;
