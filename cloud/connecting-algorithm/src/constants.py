# This file contains constants that will be used in lambda_handler()

# How many weeks we will take into account regarding repeat matches
MATCH_COOLDOWN = 5

# The userId of the 'Joker' user
JOKER_USER_ID = '17d2f33d-67e0-40ab-977e-73d1580e990d'

# Costs for the decision matrix
COST_SAME_FACULTY = 5
COST_PREV_MATCHED = [2 * i for i in range(MATCH_COOLDOWN, 0, -1)]