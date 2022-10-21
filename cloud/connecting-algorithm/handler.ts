import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 * Lambda that runs the connecting algorithm
 * To run locally (starting from project root):
 * - cd cloud
 * - npm run start
 */
export const handler = async (): // event: APIGatewayProxyEvent
Promise<APIGatewayProxyResult> => {
  console.log('here');

  return {
    statusCode: 200,
    body: 'hello',
  };
};
