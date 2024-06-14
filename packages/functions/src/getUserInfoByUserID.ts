import { User } from "@social-media-use-case/core/domain-models/user";
import dynamoDb from "@social-media-use-case/core/libs/dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";
import { Table } from "sst/node/table";

export async function main(event: APIGatewayProxyEvent) {
  const userId = event.pathParameters?.userId;

  const params: DocumentClient.QueryInput = {
    TableName: Table.SocialMedia.tableName,
    ScanIndexForward: true,
    ConsistentRead: false,
    KeyConditionExpression: "pk = :userId",
    ExpressionAttributeValues: {
      ":userId": `u#${userId}`,
    },
  };

  const result = await dynamoDb.query(params);

  if (!result.Items) {
    throw new Error("Item not found.");
  }

  const response = result.Items.reduce((acc, item) => {
    acc[item.sk] = item;
    return acc;
  }, {}) as User;

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: userId,
      ...response,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
}
