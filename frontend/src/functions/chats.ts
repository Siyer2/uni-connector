import {
  StreamChat,
  Channel as StreamChannel,
  DefaultGenerics,
} from 'stream-chat';

export function getChatClient(): StreamChat<DefaultGenerics> {
  const apiKey = process.env.REACT_APP_STREAM_API_KEY
    ? process.env.REACT_APP_STREAM_API_KEY
    : '';

  return StreamChat.getInstance(apiKey);
}

export function getChannel(
  chatClient: StreamChat<DefaultGenerics>,
  users: Array<string>,
  userName: string
): StreamChannel<DefaultGenerics> {
  return chatClient.channel('messaging', {
    name: userName,
    members: [...users],
  });
}
