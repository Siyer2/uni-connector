import {
  StreamChat,
  Channel as StreamChannel,
  DefaultGenerics,
} from 'stream-chat';

export function getChatClient(): StreamChat<DefaultGenerics> {
  const apiKey = process.env.REACT_APP_STREAM_PUBLIC_KEY
    ? process.env.REACT_APP_STREAM_PUBLIC_KEY
    : '';

  return StreamChat.getInstance(apiKey);
}
