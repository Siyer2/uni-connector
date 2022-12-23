# This file contains constants that will be used in lambda_handler()

# SET THIS TO YOUR LOCAL OPERATING SYSTEM
LOCAL_OPERATING_SYSTEM = 'windows'  # set to 'mac', 'windows' or 'linux'

# How many weeks we will take into account regarding repeat matches
MATCH_COOLDOWN = 5

# The userId of the 'Joker' user
JOKER_USER_ID = '81f3816a-edb5-4352-9f9a-953f23d2f6b1'

# Costs for the decision matrix
COST_SAME_FACULTY = 5
COST_PREV_MATCHED = [2 * i for i in range(MATCH_COOLDOWN, 0, -1)]