import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env.local' });

const docConfig = {
  region: 'us-east-1',
  endpoint: 'http://localhost:8002',
  credentials: {
    accessKeyId: 'localKey',
    secretAccessKey: 'localSecret',
  },
};
const docClient =
  process.env.ENVIRONMENT === 'local'
    ? new DynamoDB.DocumentClient(docConfig)
    : new DynamoDB.DocumentClient();

async function getUsers() {
  const params = {
    TableName: 'User',
    KeyConditionExpression: 'id = :value',
    ExpressionAttributeValues: {
      ':value': '1',
    },
  };

  const userInDb = await docClient.query(params).promise();
  return userInDb;
}

export const lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
  const users = await getUsers();
  console.log(users);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello world',
    }),
  };
};
