# This file contains the logic that will be used to generate matches in lambda_handler()

from ortools.sat.python import cp_model
import constants

def generate_matches(users, prev_matches):
    matches = []

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
    
    return matches


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