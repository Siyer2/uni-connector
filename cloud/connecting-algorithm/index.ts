import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 * Lambda that runs the connecting algorithm
 * To run locally (starting from project root):
 * - cd cloud
 * - npm run start
 */
export const handler = async (): // event: APIGatewayProxyEvent
Promise<APIGatewayProxyResult> => {
  console.log('testhere');

  return {
    statusCode: 200,
    body: 'hello',
  };
};
