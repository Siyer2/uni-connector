import json
import os
import boto3
import requests

# SET THIS TO YOUR LOCAL OPERATING SYSTEM
LOCAL_OPERATING_SYSTEM = 'mac'  # set to 'mac', 'windows' or 'linux'


def lambda_handler(event, context):
    try:
        client = get_client()

        # Get all users using EntityTypeIndex GSI where entityType = 'user'
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
        print(allUsersQuery.get('Items'))

        testUserId = '17d2f33d-67e0-40ab-977e-73d1580e990d'

        # Get user from dynamo
        response = client.get_item(
            TableName='TuesHey',
            Key={
                'primaryKey': {
                    'S': 'USER#' + testUserId
                },
                'sortKey': {
                    'S': 'METADATA#' + testUserId
                }
            }
        )
        print(response.get('Item'))
    except requests.RequestException as e:
        print(e)

        raise e

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "hello world",
        }),
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
