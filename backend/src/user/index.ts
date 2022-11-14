import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { User } from './types';

/**
 * Update the user if it already exists
 * Create the user if it doesn't exist
 * @param db
 * @param updatedUser - id property is required
 */
export async function updateUser(
  db: DocumentClient,
  updatedUser: User
): Promise<void> {
  const params: DocumentClient.PutItemInput = {
    TableName: 'User',
    Item: updatedUser,
  };

  await db.put(params).promise();
}

/**
 * Get the user from the database using the id
 * @param db
 * @param id
 */
export async function getUser(db: DocumentClient, id: string): Promise<User> {
  const response = await db
    .get({
      TableName: 'User',
      Key: {
        id,
      },
    })
    .promise();

  const user = response.Item;

  return user as User;
}
