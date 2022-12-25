import json
import requests
import datetime

import constants
import database
import match_logic
from profiler import profile, print_stats


@profile
def lambda_handler(event, context):
    matches = []

    try:
        client = database.get_client()

        # Get all users from database
        users = database.getAllUsers(client)

        # Remove 'Joker' user if there are an odd number of users to be matched
        if len(users) % 2 == 1:
            users = [user for user in users if user['primaryKey']
                     ['S'] != ('USER#' + constants.JOKER_USER_ID)]

        # Get previous match history for each user
        prev_matches = []
        for user in users:
            # Generate date of which last match will be considered
            today = datetime.date.today()
            match_limit = today - \
                datetime.timedelta(days=7*constants.MATCH_COOLDOWN)
            iso_date_match_limit = match_limit.isoformat()

            # Get match history for user from most to least recent
            prev_matches_for_user = database.getUserMatchHistory(
                client, user, iso_date_match_limit)

            # Append to prev_matches a list of the IDs of the users the current user was matched with
            prev_matches.append(prev_matches_for_user)

        matches = match_logic.generate_matches(users, prev_matches)

    except requests.RequestException as e:
        print(e)

        raise e

    print_stats()

    return {
        "statusCode": 200,
        # "body": json.dumps({
        #     "message": matches,
        # }),
    }
