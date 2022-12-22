import json
import os
import boto3
import requests
import datetime
from ortools.sat.python import cp_model

import constants
import database

# SET THIS TO YOUR LOCAL OPERATING SYSTEM
LOCAL_OPERATING_SYSTEM = 'windows'  # set to 'mac', 'windows' or 'linux'


def lambda_handler(event, context):
    matches = []
    
    try:
        client = get_client()

        # Get all users from database
        users = database.getAllUsers(client)

        # Remove 'Joker' user if there are an odd number of users to be matched
        if len(users) % 2 == 1:
            users = [user for user in users if user['primaryKey']['S'] != ('USER#' + constants.JOKER_USER_ID)]

        prev_matches = []
        for user in users:
            # Generate date of which last match will be considered
            today = datetime.date.today()
            match_limit = today - datetime.timedelta(days=7*constants.MATCH_COOLDOWN)
            iso_date_match_limit = match_limit.isoformat()

            # Get match history for user from most to least recent
            prev_matches_for_user = database.getUserMatchHistory(client, user, iso_date_match_limit)

            # Append to prev_matches a list of the IDs of the users the current user was matched with
            prev_matches.append([match['user2Id']['S'] for match in prev_matches_for_user])


        # Creates the model
        model = cp_model.CpModel()

        # Creates the variables
        x = {}
        costs = {}

        num_users = len(users)
        for i in range(num_users):
            for j in range(num_users):
                if j <= i:
                    x[i, j] = model.NewIntVar(0, 0, f'x[{i},{j}]')
                    costs[i, j] = 0
                else:
                    x[i, j] = (model.NewBoolVar(f'x[{i},{j}]')) 
                    costs[i, j] = eval_cost(users[i], users[j], prev_matches[i])

        # Creates the constraints
        for i in range(num_users):
            model.Add(
                sum((x[i, j] + x[j, i] for j in range(num_users))) == 1
            )
        
        # Create objective function
        objective = []
        for i in range(num_users):
            for j in range(num_users):
                objective.append(costs[i, j] * x[i, j])
        model.Minimize(sum(objective))

        # Creates a solver and solves the model
        solver = cp_model.CpSolver()
        status = solver.Solve(model)

        # Return array of all matches 
        if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
            print('Solution found.')
            print(f'Total cost = {solver.ObjectiveValue()}')
            for i in range(num_users):
                for j in range(i, num_users):
                    if solver.BooleanValue(x[i, j]):
                        new_match = {
                            'user1Id': users[i]['primaryKey']['S'],
                            'user1Faculty': users[i]['faculty']['S'],
                            'user2Id': users[j]['primaryKey']['S'],
                            'user2Faculty': users[j]['faculty']['S']
                        }
                        matches.append(new_match)
        else:
            print('No solution found.')

    except requests.RequestException as e:
        print(e)

        raise e

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": matches,
        }),
    }


# This will evaluate the potential 'cost' that a certain match between user1 and user2 will incur
def eval_cost(user1, user2, prev_matches):
    cost = 0

    # If both users are from the same faculty
    if user1['faculty']['S'] == user2['faculty']['S']:
        cost += constants.COST_SAME_FACULTY

    if user2['primaryKey']['S'] not in prev_matches: 
        # If users have not been matched within the MATCH_COOLDOWN period
        pass
    else:
        # If users have been matched within the MATCH_COOLDOWN period, add a cost that corresponds
        # to the recency of the match - i.e. maximum if both users' last match was each other
        cost += constants.COST_PREV_MATCHED[prev_matches.index(user2['primaryKey']['S'])]

    return cost

def get_client():
    isLocalEnvironment = os.environ['ENVIRONMENT'] == 'local'

    endpoint_url = "http://docker.for.mac.localhost:8002/"
    if (isLocalEnvironment):
        if LOCAL_OPERATING_SYSTEM == 'linux':
            # linux
            endpoint_url = "http://127.0.0.1:8002/"
        elif LOCAL_OPERATING_SYSTEM == 'mac':
            # OS X
            endpoint_url = "http://docker.for.mac.localhost:8002/"
        elif LOCAL_OPERATING_SYSTEM == 'windows':
            # Windows
            endpoint_url = "http://docker.for.windows.localhost:8002/"

    # Create dynamo client based on environment
    client = boto3.client(
        'dynamodb',
        region_name='us-east-1' if isLocalEnvironment else 'ap-southeast-2',
        endpoint_url=endpoint_url if isLocalEnvironment else None,
        aws_access_key_id='localKey' if isLocalEnvironment else None,
        aws_secret_access_key='localSecret' if isLocalEnvironment else None,
    )

    return client
