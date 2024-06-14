import dynamodb from "@social-media-use-case/core/libs/dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Table } from "sst/node/table";

export async function main(event: APIGatewayProxyEvent) {
  try {
    const userId = event.pathParameters?.userId;

    const params: DocumentClient.QueryInput = {
      TableName: Table.SocialMedia.tableName,
      ScanIndexForward: true,
      ConsistentRead: false,
      KeyConditionExpression: "pk = :userId",
      ExpressionAttributeValues: {
        ":userId": `u#${userId}#post`,
      },
    };

    const result = await dynamodb.query(params);

    if (!result.Items) {
      throw new Error("Item not found.");
    }

    const response = result.Items.map((i) => i.sk);

    return {
      statusCode: 200,
      body: JSON.stringify(response),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong.",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
}
