import TopAppBar from '../components/TopAppBar';
import { useEffect, useState } from 'react';

import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator,
  ChannelList,
} from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';
import './Chats.css';

const apiKey = process.env.REACT_APP_STREAM_API_KEY
  ? process.env.REACT_APP_STREAM_API_KEY
  : '';

const user = {
  id: 'john',
  name: 'John',
  image: 'https://getstream.imgix.net/images/random_svg/FS.png',
};

const filters = { type: 'messaging', members: { $in: [user.id] } };
const sort = [{ last_message_at: -1 as const }];

export const Chats = () => {
  const [client, setClient] = useState<any>(null);
  const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance(apiKey);

      // Dev Token for now, would need to use appSecret to create real userToken
      await chatClient.connectUser(user, chatClient.devToken(user.id));

      const channel = chatClient.channel('messaging', 'react-talk', {
        image: 'https://www.drupal.org/files/project-images/react.png',
        name: 'Talk about React',
        members: [user.id],
      });

      await channel.watch();

      setChannel(channel);
      setClient(chatClient);
    }

    init();

    if (client) return () => client.disconnectUser();
  }, []);

  if (!channel || !client)
    return (
      <TopAppBar>
        <LoadingIndicator />
      </TopAppBar>
    );

  return (
    <TopAppBar display="inline">
      <Chat client={client} theme="messaging light">
        <ChannelList filters={filters} sort={sort} />
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </TopAppBar>
  );
};
