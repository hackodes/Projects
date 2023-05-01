#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=salon --tuples-only -c"

echo -e "\nWelcome to the Salon Appointment Scheduler.\nWhat service are you looking to book?\n===="

APPOINTMENT_SCHEDULER_MENU(){

SERVICES_LIST=$($PSQL "SELECT service_id, name FROM services ORDER BY service_id")

echo "$SERVICES_LIST" | while read ID BAR SERVICE
  do
    echo "$ID) $SERVICE"
  done

read SERVICE_ID_SELECTED

SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id = $SERVICE_ID_SELECTED")

if [ -z "$SERVICE_NAME" ]; then
  echo -e "The selected service does not exist.\nWhat service are you looking to book?\n===="
  APPOINTMENT_SCHEDULER_MENU 
else
  echo -e "\nYou have selected: $SERVICE_NAME."
  CUSTOMER_DETAILS_LOOKUP
fi
}

CUSTOMER_DETAILS_LOOKUP(){
  echo -e "To proceed with booking your appointment, can you please provide your phone number?\n===="
  
  read CUSTOMER_PHONE

  CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE'")
  
  if [ -z "$CUSTOMER_NAME" ]; then
    echo -e "\nWe could not find any records with your phone number: $CUSTOMER_PHONE.\nWhat is your name?\n===="
    read CUSTOMER_NAME
    ADD_CUSTOMER=$($PSQL "INSERT INTO customers(phone, name) VALUES('$CUSTOMER_PHONE', '$CUSTOMER_NAME')")
    echo -e "\nThank you for providing your name, $CUSTOMER_NAME.\nYou have been added to our database."  
  
  fi
  SCHEDULE_APPOINTMENT
}

SCHEDULE_APPOINTMENT(){
  echo -e "What time would you like to book the $SERVICE_NAME service, $CUSTOMER_NAME?\n===="
  
  read SERVICE_TIME

  SELECTED_CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE'")
  SCHEDULE_APPOINTMENT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($SELECTED_CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")
  
  if [ -z "$SCHEDULE_APPOINTMENT" ]; then
    echo -e "\nFailed to add a new appointment. Please try again later."
  else
    echo -e "\nI have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME."
  fi
}

APPOINTMENT_SCHEDULER_MENU

