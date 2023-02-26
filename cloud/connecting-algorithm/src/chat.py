from stream_chat import StreamChat, Channel

# Returns StreamChat chat client
def get_chat_client():
    # api_key = ...
    # api_secret = ...
    chat_client = StreamChat(api_key="STREAM_KEY", api_secret="STREAM_SECRET")

    return chat_client

# TODO: what if create channel between same two users
# Creates channel between two users
def create_channel(user1Id, user2Id):
    channel = Channel("messaging", None, custom_data=dict(members=[
        user1Id[5:],    # to get rid of #USER prefix
        user2Id[5:]
    ]))

    # Creates the channel
    channel.query()
