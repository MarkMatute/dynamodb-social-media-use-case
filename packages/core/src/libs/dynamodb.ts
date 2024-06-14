import AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";

const client = new AWS.DynamoDB.DocumentClient();

export default {
  get: (params: DocumentClient.GetItemInput) => client.get(params).promise(),
  query: (params: DocumentClient.QueryInput) => client.query(params).promise(),
};
