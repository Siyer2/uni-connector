import { StreamChat, DefaultGenerics } from 'stream-chat';

export function getChatClient(): StreamChat<DefaultGenerics> {
  const apiKey = process.env.REACT_APP_STREAM_API_KEY
    ? process.env.REACT_APP_STREAM_API_KEY
    : '';

  return StreamChat.getInstance(apiKey);
}

export function getChannel(
  chatClient: StreamChat<DefaultGenerics>,
  userID: string
) {
  return chatClient.channel('messaging', 'react-talk', {
    image: 'https://www.drupal.org/files/project-images/react.png',
    name: 'Talk about React',
    members: [userID],
  });
}
