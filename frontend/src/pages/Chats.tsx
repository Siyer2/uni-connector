import { Backdrop, CircularProgress, Grid, Typography } from '@mui/material';
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

  const filters = { type: 'messaging', members: { $in: [user.primaryKey.slice(5)] } };
  const sort = [{ last_message_at: -1 as const }];

  const [client, setClient] = useState<StreamChat<DefaultGenerics>>();
  const [channels, setChannels] = useState<Array<StreamChannel<DefaultGenerics>>>();

  useEffect(() => {
    async function init() {
      const chatClient = getChatClient();

      await chatClient.connectUser(
        {
          id: user.primaryKey.slice(5), // removes USER# prefix
          name: user.name,
          // image: '',
        },
        user.chatToken
        // chatClient.devToken(user.primaryKey)
      );

      // Get user's channels
      const channels = await chatClient.queryChannels(filters, sort);

      setChannels(channels);
      setClient(chatClient);
    }

    init();

    if (client)
      return () => {
        const cleanup = async () => client.disconnectUser();
        cleanup();
      };
  }, []);

  if (!client)
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

  // User has no channels
  if (channels?.length === 0)
    return (
      <TopAppBar>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant={'h4'}>Come back on Tuesday to see your first match!</Typography>
        </Grid>
      </TopAppBar>
    );

  return (
    <TopAppBar display="inline">
      <Chat client={client} theme="messaging light">
        <ChannelList filters={filters} sort={sort} />
        <Channel>
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
