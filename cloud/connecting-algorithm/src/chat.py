# This file contains helper functions to use the stream chat client

from stream_chat import StreamChat

# Returns StreamChat chat client
def get_chat_client():
    # api_key = ...
    # api_secret = ...
    chat_client = StreamChat(api_key="STREAM_KEY", api_secret="STREAM_SECRET")

    return chat_client


# TODO: check for case if existing channel between the matched users
# TODO: add more info (e.g. hobbies) in opening message

# Creates channel between two users
def create_channel(client, user1Id, user2Id):
    channel = client.channel("messaging", None, custom_data=dict(members=[
        user1Id[5:],    # to get rid of #USER prefix
        user2Id[5:]
    ]))
    channel.create()

    message = {
        "text": f"Hi, we're connecting {user1Id} with {user2Id} this week!"
    }
    # Sent from one of the users for now
    channel.send_message({"pinned": True, "text": message}, user1Id[5:])

    return
