#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.
TRUNCATE_TABLES=$($PSQL "TRUNCATE TABLE games, teams")

while IFS=',' read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS; do

  # Add teams table data
  # Check if winner team exists in teams table
  if [[ $WINNER != "winner" ]]; then
    WINNER_TEAM_NAME=$($PSQL "SELECT name FROM teams WHERE name='$WINNER'")
    # Insert new team if it doesn't exist
    if [[ -z $WINNER_TEAM_NAME ]]; then
      INSERT_WINNER_TEAM=$($PSQL "INSERT INTO teams (name) VALUES ('$WINNER')")
    fi
  fi

  # Check if opponent team exists in teams table
  if [[ $OPPONENT != "opponent" ]]; then
    OPPONENT_TEAM_NAME=$($PSQL "SELECT name FROM teams WHERE name='$OPPONENT'")

    # Insert new team if it doesn't exist
    if [[ -z $OPPONENT_TEAM_NAME ]]; then
      INSERT_OPPONENT_TEAM=$($PSQL "INSERT INTO teams (name) VALUES ('$OPPONENT')")
    fi
  fi

  # Add games table data
  if [[ $YEAR != "year" ]]; then
    # Get IDs for winner and opponent teams
    TEAM_IDS=$($PSQL "SELECT t1.team_id, t2.team_id FROM teams t1, teams t2 WHERE t1.name='$WINNER' AND t2.name='$OPPONENT'")

    # Extract the team IDs from the result
    WINNER_TEAM_ID=$(echo $TEAM_IDS | cut -d '|' -f 1)
    OPPONENT_TEAM_ID=$(echo $TEAM_IDS | cut -d '|' -f 2)

    # Insert game data
    INSERT_GAME_DATA=$($PSQL "INSERT INTO games (year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES ($YEAR, '$ROUND', $WINNER_TEAM_ID, $OPPONENT_TEAM_ID, $WINNER_GOALS, $OPPONENT_GOALS)")
  fi

done < games.csv