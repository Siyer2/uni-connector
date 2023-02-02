import { Backdrop, CircularProgress } from '@mui/material';
import TopAppBar from '../components/TopAppBar';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  StreamChat,
  Channel as StreamChannel,
  DefaultGenerics,
} from 'stream-chat';
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
  const { state } = useLocation();
  const { user } = state;

  const [client, setClient] = useState<StreamChat<DefaultGenerics>>();
  const [channel, setChannel] = useState<StreamChannel<DefaultGenerics>>();

  useEffect(() => {
    async function init() {
      const chatClient = getChatClient();

      await chatClient.connectUser(
        {
          id: user.primaryKey,
          name: user.name,
          // image: '',
        },
        user.chatToken
        // chatClient.devToken(user.primaryKey)
      );

      const channel = getChannel(chatClient, user.primaryKey, user.name);

      await channel.watch();

      setChannel(channel);
      setClient(chatClient);
    }

    init();

    if (client)
      return () => {
        const cleanup = async () => client.disconnectUser();
        cleanup();
      };
  }, []);

  const filters = { type: 'messaging', members: { $in: [user.primaryKey] } };
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
