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