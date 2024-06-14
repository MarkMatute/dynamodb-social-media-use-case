import { StackContext, Table } from "sst/constructs";

export function DynamodbStack({ stack }: StackContext) {
  // dynamodb
  const table = new Table(stack, "SocialMedia", {
    fields: {
      // primary keys
      pk: "string",
      sk: "string",

      // user count
      follower: "number",
      following: "number",
      post: "number",

      // user info
      name: "string",
      content: "string",
      imageUrl: "string",
      etc: "string",
    },
    primaryIndex: {
      partitionKey: "pk",
      sortKey: "sk",
    },
  });

  return {
    table,
  };
}
