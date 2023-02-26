# This file contains helper functions to get data from the database

import os
import boto3
import constants

# Returns boto3 client
def get_client():
    isLocalEnvironment = os.environ['ENVIRONMENT'] == 'local'

    endpoint_url = "http://docker.for.mac.localhost:8002/"
    if (isLocalEnvironment):
        if constants.LOCAL_OPERATING_SYSTEM == 'linux':
            # linux
            endpoint_url = "http://127.0.0.1:8002/"
        elif constants.LOCAL_OPERATING_SYSTEM == 'mac':
            # OS X
            endpoint_url = "http://docker.for.mac.localhost:8002/"
        elif constants.LOCAL_OPERATING_SYSTEM == 'windows':
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

# Get all users using EntityTypeIndex GSI where entityType = 'user'
def getAllUsers(client):
    allUsersQuery = client.query(
        TableName='TuesHey',
        IndexName='EntityTypeIndex',
        KeyConditionExpression='entityType = :entityType',
        ExpressionAttributeValues={
            ':entityType': {
                'S': 'user'
            }
        }
    )

    return allUsersQuery.get('Items')

# Get all matches of specific user after match_limit from most to least recent
def getUserMatchHistory(client, user, iso_date_match_limit):
    matchHistoryQuery = client.query(
        TableName='TuesHey',
        KeyConditionExpression='primaryKey = :primarykeyval AND '\
                                'sortKey BETWEEN :sortkeyval1 AND :sortkeyval2',
        ExpressionAttributeValues={
            ':primarykeyval': {
                'S': user['primaryKey']['S']
            },
            ':sortkeyval1': {
                'S': 'MATCH#' + iso_date_match_limit 
            },
            ':sortkeyval2': {
                'S': 'METADATA'
            }
        },
        ScanIndexForward=False
    )   

    return matchHistoryQuery.get('Items')


# TODO: change function names & variables to snake_case
# TODO: update index.ts in backend/src/user to include 'entityType'

# Put a singular match in the table 
def add_match_entry(client, user1Id, user2Id, iso_date):
    client.put_item(
        TableName='TuesHey',
        Item={
            'primaryKey': {
                'S': user1Id
            },
            'sortKey': {
                'S': 'MATCH#' + iso_date
            },
            'entityType': {
                'S': 'match'
            },
            'user2Id': {
                'S': user2Id
            },
            'meetingLink': {
                'S': ''
            }
        }
    )

# Put two entries for a match in the table
# new_match = {
#     'user1Id': users[i]['primaryKey']['S'],
#     'user1Faculty': users[i]['faculty']['S'],
#     'user2Id': users[j]['primaryKey']['S'],
#     'user2Faculty': users[j]['faculty']['S']
# }
def add_match(client, match, iso_date):
    add_match_entry(client, match['user1Id'], match['user2Id'], iso_date)
    add_match_entry(client, match['user2Id'], match['user1Id'], iso_date)