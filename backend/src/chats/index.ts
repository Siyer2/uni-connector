import { StreamChat } from 'stream-chat';

export function getChatUserToken(user_id: string): string {
  // Define values
  const apiKey = process.env.REACT_APP_STREAM_PUBLIC_KEY;
  const apiSecret = process.env.REACT_APP_STREAM_API_SECRET;

  // Initialize a Server Client
  const serverClient = StreamChat.getInstance(apiKey, apiSecret);
  // Create User Token
  const token = serverClient.createToken(user_id);

  return token;
}
