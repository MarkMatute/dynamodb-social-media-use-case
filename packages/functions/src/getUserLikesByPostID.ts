import { APIGatewayProxyEvent } from "aws-lambda";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";
import { Table } from "sst/node/table";
import dynamoDb from "@social-media-use-case/core/libs/dynamodb";

export async function main(event: APIGatewayProxyEvent) {
  try {
    const postId = event.pathParameters?.postId;

    const params: DocumentClient.QueryInput = {
      TableName: Table.SocialMedia.tableName,
      ScanIndexForward: true,
      ConsistentRead: false,
      KeyConditionExpression: "pk = :userId",
      ExpressionAttributeValues: {
        ":userId": `p#${postId}#likelist`,
      },
    };

    const result = await dynamoDb.query(params);

    if (!result.Items) {
      throw new Error("Item not found.");
    }

    const response = result.Items.map((p) => p.sk);

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
