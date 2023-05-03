#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess_game --tuples-only -c"

echo "Enter your username:"

read USERNAME

USERID=$($PSQL "SELECT user_id FROM users WHERE username = '$USERNAME'")

if [[ -z $USERID ]]; then
    INSERT_USERNAME=$($PSQL "INSERT into users (username) values ('$USERNAME')")
    USERID=$($PSQL "SELECT user_id FROM users WHERE username = '$USERNAME'")
    echo "Welcome, $USERNAME! It looks like this is your first time here."
  else
    GAMESPLAYED=$($PSQL "SELECT COUNT(*) FROM games WHERE user_id = '$USERID'")
    BESTGAME=$($PSQL "SELECT MIN(guess_count) FROM games WHERE user_id = '$USERID'")

    echo "Welcome back, $USERNAME! You have played $GAMESPLAYED games, and your best game took $BESTGAME guesses."

fi

SECRET_NUMBER=$(( RANDOM % 1000 + 1 ))

GUESS_COUNT=0

echo "Guess the secret number between 1 and 1000:"

while true; do
    read GUESS

    # Check if the guess is an integer (don't count it as a guess)
    if ! [[ "$GUESS" =~ ^[0-9]+$ ]]; then
        let GUESS_COUNT=GUESS_COUNT+1
        echo "That is not an integer, guess again:"
        continue
    fi

    # Check if the guess is correct then break out of game loop
    if (($GUESS == $SECRET_NUMBER)); then
        let GUESS_COUNT=GUESS_COUNT+1
        break
    fi

    # Give a hint for the next guess
    if (($GUESS > $SECRET_NUMBER)); then
        let GUESS_COUNT=GUESS_COUNT+1
        echo "It's lower than that, guess again:"
    else
        let GUESS_COUNT=GUESS_COUNT+1
        echo "It's higher than that, guess again:"
    fi
done

INSERT_GAME=$($PSQL "INSERT into games (user_id, guess_count) values ('$USERID', $GUESS_COUNT)")
echo "You guessed it in $GUESS_COUNT tries. The secret number was $SECRET_NUMBER. Nice job!"