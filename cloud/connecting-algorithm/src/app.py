import json
import os
import boto3
import requests
import datetime

import constants
import database
import match_logic

# SET THIS TO YOUR LOCAL OPERATING SYSTEM
LOCAL_OPERATING_SYSTEM = 'windows'  # set to 'mac', 'windows' or 'linux'
USERS_PER_FACULTY = 100
MATCHES_PER_USER = 20
FACULTIES = ['artsDesignAndArchitecture',
             'medicineAndHealth',
             'business',
             'engineering',
             'science',
             'lawAndJustice']
OLDEST_MATCH_DATE = 15  # in weeks ago from today


def lambda_handler(event, context):

    try:
        client = get_client()

        # Delete TuesHey table and wait for it to finish
        client.delete_table(TableName="TuesHey")
        waiter = client.get_waiter('table_not_exists')
        waiter.wait(TableName="TuesHey")

        # Create TuesHey table and wait for it to finish
        client.create_table(
            TableName="TuesHey",
            KeySchema=[
                {
                    'AttributeName': 'primaryKey',
                    'KeyType': 'HASH'
                },
                {
                    'AttributeName': 'sortKey',
                    'KeyType': 'RANGE'
                }
            ],
            AttributeDefinitions=[
                {
                    "AttributeName": "primaryKey",
                    "AttributeType": "S"
                },
                {
                    "AttributeName": "sortKey",
                    "AttributeType": "S"
                },
                {
                    "AttributeName": "entityType",
                    "AttributeType": "S"
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            },
            GlobalSecondaryIndexes=[
                {
                    'IndexName': 'EntityTypeIndex',
                    'KeySchema': [
                        {
                            'AttributeName': 'entityType',
                            'KeyType': 'HASH'
                        },
                        {
                            'AttributeName': 'sortKey',
                            'KeyType': 'RANGE'
                        }
                    ],
                    'Projection': {
                        'ProjectionType': 'ALL'
                    },
                    'ProvisionedThroughput': {
                        'ReadCapacityUnits': 5,
                        'WriteCapacityUnits': 5
                    }
                }
            ]
        )
        waiter = client.get_waiter('table_exists')
        waiter.wait(TableName="TuesHey")

        dummyUuidFile = open('uuids.json')
        dummyUuids = json.load(dummyUuidFile)

        dummyUserFile = open('users.json')
        dummyUsers = json.load(dummyUserFile)

        # Create USERS_PER_FACULTY users in each faculty
        users = []
        for faculty in FACULTIES:
            for i in range(USERS_PER_FACULTY):
                dummyUser = dummyUsers[i *
                                       len(FACULTIES) + FACULTIES.index(faculty)]

                user = {
                    'primaryKey': {"S": 'USER#' + dummyUser.get('userId')},
                    'sortKey': {"S": 'METADATA#' + dummyUser.get('userId')},
                    'faculty': {"S": faculty},
                    'name': {"S": dummyUser.get('name')},
                    'entityType': {"S": 'user'},
                }

                users.append(user)

                # Add the user to the database
                client.put_item(
                    TableName="TuesHey",
                    Item=user
                )

        # For each user, create MATCHES_PER_USER matches where user2Id is a user in a different faculty
        for user in users:
            for i in range(MATCHES_PER_USER):
                # Find a user in a different faculty
                user2 = None
                while user2 is None or user2.get('faculty').get('S') == user.get('faculty').get('S'):
                    user2 = users[i]
                    i += 1

                # Get the last Tuesday date
                today = datetime.date.today()
                tuesday = today + datetime.timedelta((0 - today.weekday()) % 7)

                # Get a random number from 1 to OLDEST_MATCH_DATE
                random = i % OLDEST_MATCH_DATE + 1

                # Get the tuesday minus random weeks in isoformat
                tuesday = (
                    tuesday - datetime.timedelta(weeks=random)).isoformat()

                # Get random uuid from uuids.json
                matchId = dummyUuids[i % len(dummyUuids)]

                # Create a match
                match1 = {
                    'primaryKey': {"S": 'USER#' + user.get('primaryKey').get('S')},
                    'sortKey': {"S": 'MATCH#' + tuesday + matchId},
                    'user2Id': {"S": user2.get('primaryKey').get('S')},
                    'user2Faculty': {"S": user2.get('faculty').get('S')},
                    'entityType': {"S": 'match'},
                    'date': {"S": tuesday},
                }
                match2 = {
                    'primaryKey': {"S": 'USER#' + user2.get('primaryKey').get('S')},
                    'sortKey': {"S": 'MATCH#' + tuesday + matchId},
                    'user2Id': {"S": user.get('primaryKey').get('S')},
                    'user2Faculty': {"S": user.get('faculty').get('S')},
                    'entityType': {"S": 'match'},
                    'date': {"S": tuesday},
                }

                # Add the match to the database
                client.put_item(
                    TableName="TuesHey",
                    Item=match1
                )
                client.put_item(
                    TableName="TuesHey",
                    Item=match2
                )

    except requests.RequestException as e:
        print(e)

        raise e

    return {
        "statusCode": 200
    }


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
