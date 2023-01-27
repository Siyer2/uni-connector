import { Backdrop, CircularProgress } from '@mui/material';
import TopAppBar from '../components/TopAppBar';
import { useEffect, useState } from 'react';

import { StreamChat, DefaultGenerics } from 'stream-chat';
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  ChannelList,
} from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';
import './Chats.css';

import { getChatClient, getChannel } from '../functions/chats';

export const Chats = () => {
  const [client, setClient] = useState<any>(null);
  const [channel, setChannel] = useState<any>(null);

  const user = {
    id: 'john',
    name: 'John',
    image: 'https://getstream.imgix.net/images/random_svg/FS.png',
  };

  useEffect(() => {
    async function init() {
      const chatClient = getChatClient();

      // Dev Token for now, would need to use appSecret to create real userToken
      await chatClient.connectUser(user, chatClient.devToken(user.id));

      const channel = getChannel(chatClient, user.id);

      await channel.watch();

      setChannel(channel);
      setClient(chatClient);
    }

    init();

    if (client) return () => client.disconnectUser();
  }, []);

  const filters = { type: 'messaging', members: { $in: [user.id] } };
  const sort = [{ last_message_at: -1 as const }];

  if (!channel || !client)
    return (
      <TopAppBar>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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
