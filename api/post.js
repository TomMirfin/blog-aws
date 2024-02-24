import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { v4 as uuid } from "uuid";
import {
  UpdateCommand,
  PutCommand,
  DynamoDBDocumentClient,
  ScanCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north" });

const docClient = DynamoDBDocumentClient.from(client);

export const fetchPosts = async () => {
  const command = new ScanCommand({
    ExpressionAttributeNames: { "#T": "title", "#B": "body" },
    ProjectionExpression: "id, #T, #B",
    TableName: "blogPosts",
  });

  try {
    const results = await docClient.send(command);
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const createPost = async ({ title, body }) => {
  const uuid = uuid();
  const command = new PutCommand({
    TableName: "blogPosts",
    Item: {
      id: uuid,
      title,
      body,
    },
  });

  try {
    const results = await docClient.send(command);
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const updatePost = async ({ id, title, body }) => {
  const command = new UpdateCommand({
    tableName: "blogPosts",
    key: { id },
    ExpressionAttributeNames: {
      "#T": "title",
      "#B": "body",
    },
    UpdateExpression: "SET #T = :t, #B = :b",
    ExpressionAttributeValues: {
      ":t": title,
      ":b": body,
    },
    ReturnValues: "ALL_NEW",
  });

  try {
    const results = await docClient.send(command);
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const deletePosts = async (id) => {
  const command = new DeleteCommand({
    tableName: "blogPosts",
    key: { id },
  });

  try {
    const results = await docClient.send(command);
    return results;
  } catch (error) {
    console.error(error);
  }
};
