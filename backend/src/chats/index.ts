import { StreamChat } from 'stream-chat';

export function getChatUserToken(user_id: string): string {
  // Define values.
  const api_key = process.env.REACT_APP_STREAM_API_KEY;
  const api_secret = process.env.REACT_APP_STREAM_API_SECRET;

  // Initialize a Server Client
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  // Create User Token
  const token = serverClient.createToken(user_id);

  return token;
}
